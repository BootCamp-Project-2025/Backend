import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";
import { RequestTitle } from "@/contexts/CoreContext/domain/valueObjects/request/RequestTitle";
import { RequestDescription } from "@/contexts/CoreContext/domain/valueObjects/request/RequestDescription";
import { RequestStatus } from "@/contexts/CoreContext/domain/valueObjects/request/RequestStatus";
import { RequestStatusEnum } from "@/contexts/CoreContext/domain/valueObjects/request/RequestStatus";
import { RequestLanguage } from "@/contexts/CoreContext/domain/valueObjects/request/RequestLanguage";
import { RequestCategory } from "@/contexts/CoreContext/domain/valueObjects/request/RequestCategory";
import { RequestSubcategory } from "@/contexts/CoreContext/domain/valueObjects/request/RequestSubCategory";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { RequestEstimation } from "@/contexts/CoreContext/domain/valueObjects/request/RequestEstimation";
import { RequestEdited } from "@/contexts/CoreContext/domain/valueObjects/request/RequestEdited";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";
import { Content } from "@/contexts/CoreContext/domain/valueObjects/Content";
import {
  ProposalStatus,
  ProposalStatusEnum,
} from "@/contexts/CoreContext/domain/valueObjects/ProposalStatus";
import { CreationDate } from "@/contexts/CoreContext/domain/valueObjects/CreationDate";

export function makeMockProposal(overrides = {}) {
  return Proposal.create(
    {
      description:
        "I can teach you React with the complete formation that you need for this request",
      status: ProposalStatus.create(ProposalStatusEnum.NEW),
      createdAt: new Date(),
      sessions: [],
      requestId: new UniqueEntityID(),
      userId: new UniqueEntityID(),
      chatId: new UniqueEntityID(),
      ...overrides,
    },
    new UniqueEntityID()
  );
}

describe("Request Aggregate", () => {
  const title = RequestTitle.create("React Mentorship");
  const description = RequestDescription.create("Help with React.");
  const status = RequestStatus.create(RequestStatusEnum.PENDING);
  const language = RequestLanguage.create("EN");
  const category = RequestCategory.create("Programming");
  const subcategory = RequestSubcategory.create("Frontend");
  const userId = UserId.create(new UniqueEntityID());
  const estimation = RequestEstimation.create(5);
  const edited = RequestEdited.create(false);
  let createdAt: Date;
  let updatedAt: Date;
  let request: Request;

  beforeEach(() => {
    createdAt = new Date();
    updatedAt = new Date();

    request = Request.create({
      title,
      description,
      status,
      language,
      category,
      subcategory,
      userId,
      estimation,
      edited,
      createdAt,
      updatedAt,
      proposals: [],
    });
  });

  it("should create a valid request", () => {
    expect(request.isValid()).toBe(true);
    expect(request.getStatus().value).toBe(RequestStatusEnum.PENDING);
  });

  it("should expose all value objects via getters", () => {
    expect(request.getTitle().value).toBe("React Mentorship");
    expect(request.getDescription().value).toBe("Help with React.");
    expect(request.getLanguage().value).toBe("EN");
    expect(request.getCategory().value).toBe("Programming");
    expect(request.getSubcategory().value).toBe("Frontend");
    expect(request.getEstimation().value).toBe(5);
    expect(request.getEdited().value).toBe(false);
    expect(request.getUserId().getValue().toString()).toBe(
      userId.getValue().toString()
    );
  });

  it("should set new title and description", () => {
    const newTitle = RequestTitle.create("Advanced React");
    const newDescription = RequestDescription.create(
      "Hooks, Context, and more"
    );

    request.setTitle(newTitle);
    request.setDescription(newDescription);

    expect(request.getTitle().value).toBe("Advanced React");
    expect(request.getDescription().value).toBe("Hooks, Context, and more");
  });

  it("should update timestamp on title change", async () => {
    const oldUpdatedAt = request.getUpdatedAt();
    await new Promise((res) => setTimeout(res, 2));
    request.setTitle(RequestTitle.create("New Title"));
    expect(request.getUpdatedAt().getTime()).toBeGreaterThan(
      oldUpdatedAt.getTime()
    );
  });

  it("should requestEdited and mark edited as true", () => {
    expect(request.getEdited().value).toBe(false);
    request.requestEdited();
    expect(request.getEdited().value).toBe(true);
  });

  it("should throw when creating a request with empty title and description", () => {
    expect(() => {
      Request.create({
        title: RequestTitle.create(""),
        description: RequestDescription.create(""),
        status,
        language,
        category,
        subcategory,
        userId: UserId.create(new UniqueEntityID("")),
        estimation,
        edited,
        createdAt,
        updatedAt,
        proposals: [],
      });
    }).toThrow("Title cannot be empty");
  });

  it("should add a proposal when status is pending", () => {
    const proposal = makeMockProposal();
    request.addProposal(proposal);
    expect(request.getProposals()).toContain(proposal);
  });

  it("should throw when adding a proposal if status is not pending", () => {
    request.setStatus(RequestStatus.create(RequestStatusEnum.AVAILABLE));
    const proposal = makeMockProposal();
    expect(() => request.addProposal(proposal)).toThrow(
      "It can't be possible to add proposals without PENDING status"
    );
  });

  it("should accept a proposal and reject the rest", () => {
    const p1 = makeMockProposal();
    const p2 = makeMockProposal();

    request.setStatus(RequestStatus.create(RequestStatusEnum.PENDING));
    request.addProposal(p1);
    request.addProposal(p2);

    request.acceptProposal(p1.id);

    expect(p1.status.isAccepted()).toBe(true);
    expect(p2.status.isRejected()).toBe(true);
    expect(request.getStatus().value).toBe(RequestStatusEnum.ACCEPTED);
  });

  it("should throw when accepting non-existent proposal", () => {
    const fakeId = new UniqueEntityID();
    expect(() => request.acceptProposal(fakeId)).toThrow(
      "Proposal doesn't find"
    );
  });

  it("should reject remaining proposals", () => {
    const p1 = makeMockProposal();
    const p2 = makeMockProposal();
    const p3 = makeMockProposal({
      status: ProposalStatus.create(ProposalStatusEnum.REJECTED),
    });

    request.setStatus(RequestStatus.create(RequestStatusEnum.PENDING));
    request.addProposal(p1);
    request.addProposal(p2);
    request.addProposal(p3);

    request.rejectRemainingProposals(p1.id);

    expect(p1.status.isSent()).toBe(false); // not modified
    expect(p2.status.isRejected()).toBe(true);
    expect(p3.status.isRejected()).toBe(true); // stays rejected
  });

  it("should accept a request directly", () => {
    request.setStatus(RequestStatus.create(RequestStatusEnum.PENDING));
    request.accept();
    expect(request.getStatus().value).toBe(RequestStatusEnum.ACCEPTED);
  });

  it("should throw if accepting a non-pending request", () => {
    request.setStatus(RequestStatus.create(RequestStatusEnum.AVAILABLE));
    expect(() => request.accept()).toThrow(
      "Only pending requests can be accepted"
    );
  });

  it("should cancel a pending request without accepted proposals", () => {
    const cancelReq = Request.create({
      title,
      description,
      status: RequestStatus.create(RequestStatusEnum.PENDING),
      language,
      category,
      subcategory,
      userId,
      estimation,
      edited,
      createdAt,
      updatedAt,
      proposals: [makeMockProposal()],
    });
    cancelReq.cancel();
    expect(cancelReq.getStatus().value).toBe(RequestStatusEnum.CANCELED);
  });

  it("should throw when canceling a request with accepted proposal", () => {
    const acceptedProposal = makeMockProposal({
      status: ProposalStatus.create(ProposalStatusEnum.ACCEPTED),
    });
    request.setStatus(RequestStatus.create(RequestStatusEnum.PENDING));
    request.addProposal(acceptedProposal);

    expect(() => request.cancel()).toThrow(
      "Cannot cancel a request with an accepted proposal"
    );
  });

  it("should throw when canceling a non-pending request", () => {
    request.setStatus(RequestStatus.create(RequestStatusEnum.ACCEPTED));
    expect(() => request.cancel()).toThrow(
      "Only a pending requests can be cancelled"
    );
  });

  it("should create from primitives using createFromObject", () => {
    const id = new UniqueEntityID();
    const obj = {
      id: id.toString(),
      title: "React Mentorship",
      description: "Help with React.",
      language: "EN",
      category: "Programming",
      subcategory: "Frontend",
      status: RequestStatusEnum.PENDING,
      userId: userId.getValue().toString(),
      estimation: 5,
      edited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      proposals: [],
    };

    const created = Request.createFromObject(obj, id);
    expect(created.getTitle().value).toBe("React Mentorship");
    expect(created.getUserId().getValue().toString()).toBe(
      userId.getValue().toString()
    );
  });
});
