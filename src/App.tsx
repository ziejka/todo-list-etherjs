import React from "react"
import { AddTodo } from "./AddTodo"
import { TodoItem } from "./ToDoItem"
import { useToDoStore } from "./hooks/toDoStore"

function App() {
  const { network, toDoList } = useToDoStore()
  const tasksSortedByCompletion = React.useMemo(
    () => toDoList.sort((_, b) => (b.completed ? -1 : 1)),
    [toDoList]
  )

  return (
    <div className="mx-auto bg-zinc-900 text-zinc-100 h-screen p-10">
      <h1 className="text-center text-3xl font-bold">ToDo List</h1>
      <h2 className="text-center text-xl font-semibold">
        Connected to: {network?.name}
      </h2>
      <div className="flex flex-col gap-2 w-fit mx-auto mt-5">
        {tasksSortedByCompletion.map((task, i) => (
          <TodoItem key={i} task={task} />
        ))}
      </div>
      <AddTodo />
    </div>
  )
}

export default App
