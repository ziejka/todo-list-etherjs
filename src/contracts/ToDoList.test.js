import { expect, describe, beforeEach, it } from "chai"
import { ethers } from "hardhat"

describe("ToDoList", () => {
  let toDoList
  beforeEach(async () => {
    const contract = await ethers.getContractFactory("ToDoList")
    toDoList = await contract.deploy()
    await toDoList.deployed()
  })

  it("should add a new ToDoList", async () => {
    await toDoList.add("Buy milk")
    const task = (await toDoList.retrieve())[0]
    expect(task.content).to.equal("Buy milk")
    expect(task.completed).to.equal(false)
  })

  it("should complete task completion", async () => {
    await toDoList.add("Buy milk")
    await toDoList.complete(0)
    const task = (await toDoList.retrieve())[0]
    expect(task.completed).to.equal(true)
  })

  it("should emit TaskCreated event", async () => {
    await expect(toDoList.add("Buy milk"))
      .to.emit(toDoList, "TaskCreated", false)
      .withArgs(0, "Buy milk", false)
  })

  it("should emit TaskCompleted event", async () => {
    await toDoList.add("Buy milk")
    await expect(toDoList.complete(0))
      .to.emit(toDoList, "TaskCompleted", true)
      .withArgs(0, "Buy milk", true)
  })

  it("should remove a ToDoList", async () => {
    await toDoList.add("Buy milk")
    await toDoList.remove(0)
    const task = (await toDoList.retrieve())[0]
    expect(task.content).to.equal("")
    expect(task.completed).to.equal(false)
  })
})
