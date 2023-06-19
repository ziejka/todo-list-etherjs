import React from "react"
import { TaskType, useToDoStore } from "./hooks/toDoStore"

type PropsType = {
  task: TaskType
}
export const TodoItem: React.FC<PropsType> = ({ task }) => {
  const { complete, remove } = useToDoStore()

  const onComplete: React.ReactEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    complete(task.id)
  }

  const onRemove: React.ReactEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    remove(task.id)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={onRemove}
        className="px-4 py-2 text-zinc-100 flex cursor-pointer rounded-full transition-all bg-zinc-700 items-center hover:bg-zinc-800"
      >
        🗑
      </button>
      <div
        className={`px-4 py-2 flex cursor-pointer rounded-full transition-all bg-zinc-700 items-center ${
          task.completed ? "opacity-60 line-through" : " hover:bg-zinc-800"
        }`}
        onClick={onComplete}
      >
        <input
          className="mr-2 appearance-none 
        relative
        bg-zinc-700
        border-2 border-zinc-500
        h-5 w-5
        transition-all
        rounded inline-flex text-center justify-center items-center
        checked:bg-zinc-600 
        checked:after:border-b-[3px] 
        checked:after:border-white
        checked:after:border-r-[3px]
        checked:after:rotate-45
        checked:after:rounded-sm
        after:h-3 after:w-2
        after:absolute
        after:text-white"
          id="checkbox"
          type="checkbox"
          checked={task.completed}
          readOnly
        />
        <p>{task.content}</p>
      </div>
    </div>
  )
}
