import 'reflect-metadata';
import { CourseController } from '@/contexts/LearningContext/presentation/http/controllers/CourseController';
import { ResponseService } from '@/contexts/Shared/application/services/ResponseService';
import { ApiError } from '@/contexts/Shared/infrastructure/errors/ApiError';
import { StatusCodes } from 'http-status-codes';

jest.mock('@/contexts/Shared/application/services/ResponseService', () => ({
  ResponseService: {
    send: jest.fn(),
  },
}));

describe('CourseController', () => {
  const mockService = {
    enrollInCourse: jest.fn(),
  };

  const controller = new CourseController({} as any, mockService as any);
  const res = {} as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should enroll user in course and send success response', async () => {
    const req = {
      params: { courseId: 'course-1' },
      body: { userId: 'user-1' },
    } as any;

    await controller.enrollInCourse(req, res);

    expect(mockService.enrollInCourse).toHaveBeenCalledWith('course-1', 'user-1');
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.NO_CONTENT,
        message: 'Success',
      })
    );
  });

  it('should throw ApiError if enrollInCourse throws a generic error', async () => {
    mockService.enrollInCourse.mockRejectedValue(new Error('fail'));

    const req = {
      params: { courseId: 'course-1' },
      body: { userId: 'user-1' },
    } as any;

    await expect(controller.enrollInCourse(req, res)).rejects.toThrow(ApiError);
  });

  it('should rethrow ApiError if enrollInCourse throws ApiError', async () => {
    const apiError = new ApiError(StatusCodes.BAD_REQUEST, 'Already enrolled');
    mockService.enrollInCourse.mockRejectedValue(apiError);

    const req = {
      params: { courseId: 'course-1' },
      body: { userId: 'user-1' },
    } as any;

    await expect(controller.enrollInCourse(req, res)).rejects.toThrow(apiError);
  });
});
