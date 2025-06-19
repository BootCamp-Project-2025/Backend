import "reflect-metadata";
import { CreateCertificationUseCase } from "@/contexts/CoreContext/application/useCases/certifications/CreateCertificationUseCase";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";

describe("CreateCertificationUseCase", () => {
  const mockCertificationRepo: jest.Mocked<ICertificationRepository> = {
    create: jest.fn(),
  } as any;

  const mockAdd = jest.fn();

  const mockFreelancer = {
    certifications: {
      add: mockAdd,
    },
  };

  const mockFreelancerRepo: jest.Mocked<IFreelancerRepository> = {
    getById: jest.fn().mockResolvedValue(mockFreelancer),
  } as any;

  const useCase = new CreateCertificationUseCase(
    mockCertificationRepo,
    mockFreelancerRepo
  );

  it("should call repository.create with the correct arguments and add to freelancer", async () => {
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

    const calledCertification = mockAdd.mock.calls[0][0];
    expect(mockAdd).toHaveBeenCalled();
    expect(calledCertification).toBeInstanceOf(Certification);
    expect(calledCertification.certification).toBe("Test");
    expect(calledCertification.institution).toBe("Org");
    expect(calledCertification.year).toBe(2020);
    expect(mockCertificationRepo.create).toHaveBeenCalledWith(
      calledCertification,
      "freelancer-1"
    );
  });

  it("should propagate errors from certificationRepository", async () => {
    mockCertificationRepo.create.mockRejectedValueOnce(new Error("fail"));

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
