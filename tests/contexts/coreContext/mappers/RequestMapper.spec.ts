import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Request } from "../../../../src/contexts/CoreContext/domain/aggregates/Request";
import { RequestCategory } from "@/contexts/CoreContext/domain/valueObjects/request/RequestCategory";
import { RequestDescription } from "@/contexts/CoreContext/domain/valueObjects/request/RequestDescription";
import { RequestEdited } from "@/contexts/CoreContext/domain/valueObjects/request/RequestEdited";
import { RequestEstimation } from "@/contexts/CoreContext/domain/valueObjects/request/RequestEstimation";
import { RequestSubcategory } from "@/contexts/CoreContext/domain/valueObjects/request/RequestSubCategory";
import { RequestTitle } from "@/contexts/CoreContext/domain/valueObjects/request/RequestTitle";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import RequestMapper from "@/contexts/CoreContext/mappers/RequestMapper";
import { RequestLanguage } from "@/contexts/CoreContext/domain/valueObjects/request/RequestLanguage";
import { RequestStatus } from "@/contexts/CoreContext/domain/valueObjects/request/RequestStatus";


describe('domainToIndex', () => {
  it('should map Request domain object to RequestIndex', () => {
    const requestId = new UniqueEntityID('request-123');
    const userId = new UniqueEntityID('user-456');

    const request = Request.create({
      title: RequestTitle.create('Test Request'),
      description: RequestDescription.create('Test Description'),
      language: RequestLanguage.create('English'),
      category: RequestCategory.create('Development'),
      subcategory: RequestSubcategory.create('Backend'),
      status: RequestStatus.create('PENDING'),
      userId: UserId.create(userId),
      estimation: RequestEstimation.create(5),
      edited: RequestEdited.create(false),
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-02'),
      proposals: [],
    }, requestId);

    const result = RequestMapper.domainToIndex(request);

    expect(result).toEqual({
      id: 'request-123',
      userId: 'user-456',
      title: 'Test Request',
      description: 'Test Description',
      language: 'english',
      category: 'development',
      subCategory: 'backend',
      createdAt: new Date('2023-01-01'),
    });
  });

  it('should convert language, category, and subCategory to lowercase', () => {
    const requestId = new UniqueEntityID('request-123');
    const userId = new UniqueEntityID('user-456');

    const request = Request.create({
      title: RequestTitle.create('Test Request'),
      description: RequestDescription.create('Test Description'),
      language: RequestLanguage.create('SPANISH'),
      category: RequestCategory.create('DESIGN'),
      subcategory: RequestSubcategory.create('FRONTEND'),
      status: RequestStatus.create('PENDING'),
      userId: UserId.create(userId),
      estimation: RequestEstimation.create(3),
      edited: RequestEdited.create(true),
      createdAt: new Date('2023-03-15'),
      updatedAt: new Date('2023-03-16'),
      proposals: [],
    }, requestId);

    const result = RequestMapper.domainToIndex(request);

    expect(result.language).toBe('spanish');
    expect(result.category).toBe('design');
    expect(result.subCategory).toBe('frontend');
  });
});