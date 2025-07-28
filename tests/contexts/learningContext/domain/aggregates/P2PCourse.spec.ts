import {
  P2PCourse,
  PrimitiveP2PCourseProps,
} from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import { FilePost } from "@/contexts/LearningContext/domain/entities/FilePost";
import LiveSession from "@/contexts/LearningContext/domain/entities/LiveSession";
import { Post } from "@/contexts/LearningContext/domain/entities/Posts";
import ChatId from "@/contexts/LearningContext/domain/valueObjects/ChatId";
import { P2PCourseName } from "@/contexts/LearningContext/domain/valueObjects/P2PCourseName";
import P2PCourseStatus from "@/contexts/LearningContext/domain/valueObjects/P2PCourseStatus";
import P2PRemainingSessions from "@/contexts/LearningContext/domain/valueObjects/P2PRemainingSessions";
import UserId from "@/contexts/LearningContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

const emptyCourse: PrimitiveP2PCourseProps = {
  studentId: "testId",
  teacherId: "testId",
  name: "testId",
  remainingSession: 10,
  status: "ACTIVE",
  posts: [],
  files: [],
  sessions: [],
  chatId: "testId",
};

describe("P2PCourse aggregate", () => {
  it("Exists", () => {
    expect(P2PCourse).toBeDefined();
  });
  it("Creates from primitives correctly", () => {
    expect(P2PCourse.createFromPrimitive(emptyCourse)).toBeInstanceOf(
      P2PCourse
    );
  });
  it("Creates from value objects correctly", () => {
    expect(
      P2PCourse.create({
        studentId: UserId.create({ userId: "studentId" }),
        teacherId: UserId.create({ userId: "testId" }),
        name: P2PCourseName.create({ name: "courseName" }),
        remainingSessions: P2PRemainingSessions.create({
          remainingSessions: 0,
        }),
        status: P2PCourseStatus.create({ status: "ACTIVE" }),
        posts: [],
        files: [],
        sessions: [],
        chatId: ChatId.create({ chatId: "testId" }),
      })
    ).toBeInstanceOf(P2PCourse);
  });
  it("Cancels correctly", () => {
    const p2pCourse = P2PCourse.createFromPrimitive(emptyCourse);
    p2pCourse.cancelCourse();
    expect(p2pCourse.status.value).toBe("CANCELED");
  });
  it("Complete a session successfully", () => {
    const p2pCourse = P2PCourse.createFromPrimitive(emptyCourse);
    const session = LiveSession.createFromPrimitive(
      {
        url: "https://trello.com/b/Chdxe29W/bcltdefs08",
        dateOfTheSession: new Date(),
        creationDate: new Date(),
        status: "PENDING",
      },
      "TestSessionId"
    );
    p2pCourse.addSession(session);
    p2pCourse.completeSession(new UniqueEntityID("TestSessionId"));
    expect(p2pCourse.sessions[0].status.value).toBe("COMPLETED");
    expect(p2pCourse.remainingSessions.value).toBe(9);
  });
  it("Canceles a session successfully", () => {
    const p2pCourse = P2PCourse.createFromPrimitive(emptyCourse);
    const session = LiveSession.createFromPrimitive(
      {
        url: "https://trello.com/b/Chdxe29W/bcltdefs08",
        dateOfTheSession: new Date(),
        creationDate: new Date(),
        status: "PENDING",
      },
      "TestSessionId"
    );
    p2pCourse.addSession(session);
    p2pCourse.cancelSession(new UniqueEntityID("TestSessionId"));
    expect(p2pCourse.sessions[0].status.value).toBe("CANCELED");
  });

  it("Deletes a session successfully", () => {
    const p2pCourse = P2PCourse.createFromPrimitive(emptyCourse);
    const session = LiveSession.createFromPrimitive(
      {
        url: "https://trello.com/b/Chdxe29W/bcltdefs08",
        dateOfTheSession: new Date(),
        creationDate: new Date(),
        status: "PENDING",
      },
      "TestSessionId"
    );
    p2pCourse.addSession(session);
    p2pCourse.deleteSession(new UniqueEntityID("TestSessionId"));
    expect(p2pCourse.sessions.length).toBe(0);
  });
  it("Add a post successfully", () => {
    const p2pCourse = P2PCourse.createFromPrimitive(emptyCourse);
    const post = Post.createFromPrimitive(
      {
        title: "Title example",
        description: "test description",
        creationDate: new Date(),
      },
      "testId"
    );
    p2pCourse.addPost(post);
    expect(p2pCourse.posts[0]).toMatchObject(post);
  });
  it("Deletes a post successfully", () => {
    const p2pCourse = P2PCourse.createFromPrimitive(emptyCourse);
    const post = Post.createFromPrimitive(
      {
        title: "Title example",
        description: "test description",
        creationDate: new Date(),
      },
      "testId"
    );
    p2pCourse.addPost(post);
    p2pCourse.deletePost(new UniqueEntityID("testId"));
    expect(p2pCourse.posts.length).toBe(0);
  });
  it("Add a file post successfully", () => {
    const p2pCourse = P2PCourse.createFromPrimitive(emptyCourse);
    const filePost = FilePost.createFromPrimitive(
      {
        url: "https://trello.com/b/Chdxe29W/bcltdefs08",
        creationDate: new Date(),
      },
      "testId"
    );
    p2pCourse.addFilePost(filePost);
    expect(p2pCourse.files[0]).toMatchObject(filePost);
  });
  it("Deletes a file post successfully", () => {
    const p2pCourse = P2PCourse.createFromPrimitive(emptyCourse);
    const filePost = FilePost.createFromPrimitive(
      {
        url: "https://trello.com/b/Chdxe29W/bcltdefs08",
        creationDate: new Date(),
      },
      "testId"
    );
    p2pCourse.addFilePost(filePost);
    p2pCourse.deleteFilePost(new UniqueEntityID("testId"));
    expect(p2pCourse.files.length).toBe(0);
  });
});
