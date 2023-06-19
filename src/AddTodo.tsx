import React from "react"
import { useToDoStore } from "./hooks/toDoStore"

export const AddTodo: React.FC = () => {
  const { add } = useToDoStore()
  const [task, setTask] = React.useState<string>("")

  const addTask: React.ReactEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    add(task)
    setTask("")
  }

  return (
    <div className="flex gap-2 w-fit mx-auto mt-5">
      <input
        type="text"
        onChange={(e) => setTask(e.target.value)}
        className="px-4 py-2 flex cursor-pointer rounded-full transition-all bg-zinc-700 items-center hover:bg-zinc-800"
        value={task}
      />
      <button
        onClick={addTask}
        className="px-4 py-2 flex cursor-pointer rounded-full transition-all bg-zinc-700 items-center hover:bg-zinc-800"
      >
        Add task
      </button>
    </div>
  )
}
