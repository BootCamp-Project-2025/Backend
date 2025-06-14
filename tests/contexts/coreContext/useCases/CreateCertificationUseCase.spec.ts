import "reflect-metadata";
import { CreateCertificationUseCase } from "@/contexts/CoreContext/application/useCases/certifications/CreateCertificationUseCase";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";

describe("CreateCertificationUseCase", () => {
  const mockRepo: jest.Mocked<ICertificationRepository> = {
    create: jest.fn(),
  } as unknown as jest.Mocked<ICertificationRepository>;

  const useCase = new CreateCertificationUseCase(mockRepo);

  it("should call repository.create with the correct arguments", async () => {
    const input = {
      certification: {
        id: "",
        certification: "Test",
        institution: "Org",
        year: 2020,
      },
      freelancerId: "freelancer-1",
    };

    await useCase.execute(input);

    const [[certificationArg, freelancerIdArg]] = mockRepo.create.mock.calls;

    expect(freelancerIdArg).toBe("freelancer-1");
    expect(certificationArg).toMatchObject({
      certification: "Test",
      institution: "Org",
      year: 2020,
    });
  });

  it("should propagate errors from repository", async () => {
    mockRepo.create.mockRejectedValueOnce(new Error("fail"));
    await expect(
      useCase.execute({
        certification: {
          id: "",
          certification: "X",
          institution: "Y",
          year: 2020,
        },
        freelancerId: "id",
      })
    ).rejects.toThrow("fail");
  });
});
