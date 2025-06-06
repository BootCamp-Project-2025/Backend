import { Client } from "@/contexts/CoreContext/domain_temp/entities_temp/Client";
import { UserId } from "@/contexts/CoreContext/domain_temp/valueObjects_temp/UserId";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";

describe("Client Entity", () => {
  it("should create a valid Client with userId", () => {
    const userId = UserId.create(new UniqueEntityID());

    const client = Client.create({ userId });

    expect(client).toBeDefined();
    expect(client.userId.equals(userId)).toBe(true);
    expect(client.clientId).toBeInstanceOf(UniqueEntityID);
  });

  it("should throw an error if userId is missing", () => {
    // @ts-expect-error purposely passing invalid props
    expect(() => Client.create({})).toThrow("User ID is required.");
  });
});
