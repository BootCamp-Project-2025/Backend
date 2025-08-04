import "reflect-metadata";
import { ElasticSearchService } from "@/contexts/CoreContext/application/services/ElasticSearchService";
import { RequestDto } from "@/contexts/CoreContext/domain/interfaces/dtos/RequestDto";
import { SearchQueryDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/SearchQueryDto";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { Client } from "@elastic/elasticsearch";

describe('ElasticSearchService', () => {
  let service: ElasticSearchService;
  let mockEsClient: jest.Mocked<Client>;

  beforeEach(() => {
    mockEsClient = {
      search: jest.fn(),
      index: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new ElasticSearchService();
    service.esClient = mockEsClient;
  });

  describe('search', () => {
    it('should call elasticsearch search with provided params', async () => {
      const searchParams: SearchQueryDto = {
        index: 'test-index',
        query: { bool: { must: [{ match_all: {} }] } }
      };
      const expectedResponse = { hits: { hits: [] } };
      mockEsClient.search.mockResolvedValue(expectedResponse as any);

      const result = await service.search(searchParams);

      expect(mockEsClient.search).toHaveBeenCalledWith(searchParams);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('indexResource', () => {
    it('should index a CourseDTO resource', async () => {
      const courseDto: CourseDTO = {
        id: 'course-123',
        title: 'Test Course',
        description: 'Test Description'
      } as unknown as CourseDTO;

      await service.indexResource('courses', courseDto);

      expect(mockEsClient.index).toHaveBeenCalledWith({
        index: 'courses',
        document: courseDto,
        id: 'course-123'
      });
    });

    it('should index a RequestDto resource', async () => {
      const requestDto: RequestDto = {
        id: 'request-456',
        title: 'Test Request'
      } as unknown as RequestDto;

      await service.indexResource('requests', requestDto);

      expect(mockEsClient.index).toHaveBeenCalledWith({
        index: 'requests',
        document: requestDto,
        id: 'request-456'
      });
    });
  });

  describe('removeResource', () => {
    it('should delete a resource by id', async () => {
      const resourceId = 'resource-789';
      const resourceIndex = 'test-index';

      await service.removeResource(resourceIndex, resourceId);

      expect(mockEsClient.delete).toHaveBeenCalledWith({
        index: resourceIndex,
        id: resourceId
      });
    });
  });
});