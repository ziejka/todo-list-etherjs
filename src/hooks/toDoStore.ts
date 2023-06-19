import { ethers } from "ethers"
import { create } from "zustand"
import TodoMeta from "../contracts/artifacts/ToDoList_metadata.json"

export interface TaskType {
  id: bigint
  content: string
  completed: boolean
}

type State = {
  toDoList: TaskType[]
  network: ethers.Network | null
  add: (content: string) => Promise<void>
  complete: (id: bigint) => Promise<void>
  remove: (id: bigint) => Promise<void>
}

declare global {
  interface Window {
    ethereum: ethers.Eip1193Provider
  }
}

export const useToDoStore = create<State>((set) => {
  let contract: ethers.Contract
  let provider: ethers.BrowserProvider
  let signer: ethers.Signer

  async function connect() {
    provider = new ethers.BrowserProvider(window.ethereum)
    const network = await provider.getNetwork()
    set({ network })
    signer = await provider.getSigner()
    initContract(signer)
    subscribeToEvents()
    retrieveToDoList()
  }

  function retrieveTasksStruct(response: ethers.Result): TaskType[] {
    return response
      .map((task) => ({
        id: task[0],
        content: task[1],
        completed: task[2],
      }))
      .filter((task) => task.content !== "")
  }

  async function initContract(signer: ethers.Signer) {
    if (!signer) return

    contract = new ethers.Contract(
      import.meta.env.VITE_TODO_LIST_CONTRACT_ADDRESS as string,
      TodoMeta.output.abi,
      signer
    )
  }

  async function subscribeToEvents() {
    if (!contract) return
    contract.on("TaskCreated", retrieveToDoList)
    contract.on("TaskCompleted", retrieveToDoList)
  }

  async function retrieveToDoList() {
    if (!contract) return
    try {
      const result = await contract.retrieve()
      console.log(result)

      const toDoList = retrieveTasksStruct(result)
      set({ toDoList })
    } catch (error) {
      console.log(error)
    }
  }

  async function add(content: string) {
    if (!contract) return
    try {
      await contract.add(content)
    } catch (error) {
      console.log(error)
    }
  }

  async function remove(id: bigint) {
    if (!contract) return
    try {
      // testing transaction object
      const tx = await contract.remove(id)
      await tx.wait()
      retrieveToDoList()
    } catch (error) {
      console.log(error)
    }
  }

  async function complete(id: bigint) {
    if (!contract) return
    try {
      await contract.complete(id)
    } catch (error) {
      console.log(error)
    }
  }

  connect()

  return {
    toDoList: [],
    network: null,
    add,
    complete,
    remove,
  }
})
