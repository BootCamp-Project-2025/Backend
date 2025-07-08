import 'reflect-metadata';
import { CourseController } from '@/contexts/LearningContext/presentation/http/controllers/CourseController';
import { ResponseService } from '@/contexts/Shared/application/services/ResponseService';
import { ApiError } from '@/contexts/Shared/infrastructure/errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

jest.mock('@/contexts/Shared/application/services/ResponseService', () => ({
  ResponseService: {
    send: jest.fn(),
  },
}));

describe('CourseController', () => {
  const mockEnrollInCourse = jest.fn();
  const mockService = {
    enrollInCourse: mockEnrollInCourse,
  };

  const controller = new CourseController({} as never, mockService);

  let req: Request;
  let res: Response;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {
        courseId: 'course-1',
      },
      user: {
        id: 'user-1',
      },
      body: {
        userId: 'user-1',
      },
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  it('should enroll user in course and send success response', async () => {

    await controller.enrollInCourse(req, res);

    expect(mockEnrollInCourse).toHaveBeenCalledWith('course-1', 'user-1');
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.NO_CONTENT,
        message: 'Success',
      })
    );
  });

  it('should throw ApiError if enrollInCourse throws a generic error', async () => {
    mockEnrollInCourse.mockRejectedValue(new Error('fail'));



    await expect(controller.enrollInCourse(req, res)).rejects.toThrow(ApiError);
  });

  it('should rethrow ApiError if enrollInCourse throws ApiError', async () => {
    const apiError = new ApiError(StatusCodes.BAD_REQUEST, 'Already enrolled');
    mockEnrollInCourse.mockRejectedValue(apiError);



    await expect(controller.enrollInCourse(req, res)).rejects.toThrow(apiError);
  });
});
