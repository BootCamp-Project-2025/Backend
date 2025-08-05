import "reflect-metadata";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import { Post } from "@/contexts/LearningContext/domain/entities/Posts";
import EditPostUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/EditPostUseCase";

describe("AddPostUseCase component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const postRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  it("Creates correctly", () => {
    const useCase = new EditPostUseCase(postRepositoryMock);
    expect(useCase).toBeInstanceOf(EditPostUseCase);
  });

  it("Edits a new post correctly", () => {
    const useCase = new EditPostUseCase(postRepositoryMock);
    const post = Post.createFromPrimitive(
      {
        title: "New test title",
        description: "Test description",
        creationDate: new Date(),
      },
      "TestPostId"
    );

    const p2pCourse = P2PCourse.createFromPrimitive({
      studentId: "studentId",
      teacherId: "teacherId",
      chatId: "chatId",
      name: "Test Name",
      remainingSession: 5,
      status: "ACTIVE",
      posts: [
        {
          id: "TestPostId",
          title: "Test title old",
          description: "Test description",
          creationDate: new Date(),
        },
      ],
      files: [],
      sessions: [],
    });
    postRepositoryMock.update.mockResolvedValue(post);
    expect(useCase.execute({ p2pCourse, post })).resolves.toBe(post);
    expect(postRepositoryMock.update).toHaveBeenCalledWith("TestPostId", post);
    expect(p2pCourse.posts[0]).toBe(post);
  });
});
