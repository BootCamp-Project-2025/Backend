import { RequestEdited } from "@/contexts/LearningContext/domain/valueObjects/RequestEdited";

describe("RequestEdited", () => {
  it("should create a value with false initially", () => {
    const edited = RequestEdited.initial();
    expect(edited.value).toBe(false);
  });

  it("should allow creating a value with true", () => {
    const edited = RequestEdited.create(true);
    expect(edited.value).toBe(true);
  });

  it("should allow setting edited to true", () => {
    const edited = RequestEdited.initial().setEdited();
    expect(edited.value).toBe(true);
  });
});
