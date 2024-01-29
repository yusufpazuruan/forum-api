const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddThreadUseCase = require("../AddThreadUseCase");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");

describe("AddThreadUseCase", () => {
  it("should orchestrating the add thread action correctly", async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const nockReturnAddedThread = new AddedThread({
      id: "thread-123",
      title: "title 01",
      owner: "owner 01",
    });

    mockThreadRepository.addThread = jest.fn(() =>
      Promise.resolve(nockReturnAddedThread)
    );

    const useCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const useCasePayload = {
      title: "title 01",
      body: "body",
      owner: "owner 01",
    };
    const expectedAddedThread = new AddedThread({
      id: "thread-123",
      title: "title 01",
      owner: "owner 01",
    });

    // Action
    const addedThread = await useCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository).lastCalledWith(useCasePayload);
  });
});
