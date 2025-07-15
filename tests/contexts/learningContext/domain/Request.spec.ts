import { Request } from "@/contexts/LearningContext/domain/aggregates/Request";
import { RequestTitle } from "@/contexts/LearningContext/domain/valueObjects/RequestTitle";
import { RequestDescription } from "@/contexts/LearningContext/domain/valueObjects/RequestDescription";
import { RequestStatus } from "@/contexts/LearningContext/domain/valueObjects/RequestStatus";
import { RequestStatusEnum } from "@/contexts/LearningContext/domain/valueObjects/RequestStatus";
import { RequestLanguage } from "@/contexts/LearningContext/domain/valueObjects/RequestLanguage";
import { RequestCategory } from "@/contexts/LearningContext/domain/valueObjects/RequestCategory";
import { RequestSubcategory } from "@/contexts/LearningContext/domain/valueObjects/RequestSubCategory";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { RequestEstimation } from "@/contexts/LearningContext/domain/valueObjects/RequestEstimation";
import { RequestEdited } from "@/contexts/LearningContext/domain/valueObjects/RequestEdited";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";
import { Description } from "@/contexts/CoreContext/domain/valueObjects/Content";
import {
  ProposalStatus,
  ProposalStatusEnum,
} from "@/contexts/CoreContext/domain/valueObjects/ProposalStatus";
import { CreationDate } from "@/contexts/CoreContext/domain/valueObjects/CreationDate";

export function makeMockProposal(overrides = {}) {
  return Proposal.create(
    {
      content: Description.create(
        "I can teach you React with the complete formation that you need for this request"
      ),
      status: ProposalStatus.create(ProposalStatusEnum.PENDING),
      creationDate: CreationDate.create(new Date()),
      userId: UserId.create(new UniqueEntityID()),
      ...overrides,
    },
    new UniqueEntityID()
  );
}

describe("Request Aggregate", () => {
  const title = RequestTitle.create("React Mentorship");
  const description = RequestDescription.create(
    "I need help learning React with atomic design and all the hooks this framework provide us."
  );
  const status = RequestStatus.create(RequestStatusEnum.PENDING);
  const language = RequestLanguage.create("EN");
  const category = RequestCategory.create("Programming");
  const subcategory = RequestSubcategory.create("Frontend");
  const userId = UserId.create(new UniqueEntityID());
  const estimation = RequestEstimation.create(5);
  const edited = RequestEdited.create(false);

  const request = Request.create({
    title,
    description,
    status,
    language,
    category,
    subcategory,
    userId,
    estimation,
    edited,
    proposals: [],
  });

  it("should create a valid request", () => {
    expect(request.getTitle().value).toBe("React Mentorship");
    expect(request.isValid()).toBe(true);
  });

  it("should add a proposal when status is pending", () => {
    const proposal = makeMockProposal();
    request.addProposal(proposal);
    expect(request.getProposals()).toContain(proposal);
  });

  it("should throw when adding a proposal if status is not pending", () => {
    request.setStatus(RequestStatus.create(RequestStatusEnum.AVAILABLE));
    const proposal = makeMockProposal();
    expect(() => request.addProposal(proposal)).toThrow();
  });

  it("should accept a proposal and reject the rest", () => {
    const proposal1 = makeMockProposal();
    const proposal2 = makeMockProposal();
    request.setStatus(RequestStatus.create(RequestStatusEnum.PENDING));
    request.addProposal(proposal1);
    request.addProposal(proposal2);

    request.acceptProposal(proposal1.id);

    expect(proposal1.status.isAccepted()).toBe(true);
    expect(proposal2.status.isRejected()).toBe(true);
    expect(request.getStatus().value).toBe(RequestStatusEnum.ACCEPTED);
  });

  it("should cancel a pending request", () => {
    const cancelRequest = Request.create({
      title,
      description,
      status: RequestStatus.create(RequestStatusEnum.PENDING),
      language,
      category,
      subcategory,
      userId,
      estimation,
      edited,
      proposals: [],
    });

    cancelRequest.cancel();
    expect(cancelRequest.getStatus().value).toBe(RequestStatusEnum.REJECTED);
  });

  it("should not cancel a non-pending request", () => {
    request.setStatus(RequestStatus.create(RequestStatusEnum.ACCEPTED));
    expect(() => request.cancel()).toThrow();
  });
});
