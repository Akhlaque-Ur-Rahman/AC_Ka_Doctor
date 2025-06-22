'use client'

import { useEffect, useState } from 'react'
import {
  ListTodo,
  Plus,
  Trash2,
  SquarePen,
  Check,
} from 'lucide-react'

type Task = {
  id: string
  text: string
  isEditing?: boolean
}

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('ac-tasks')
    if (stored) setTasks(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('ac-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!input.trim()) return
    setTasks([{ id: Date.now().toString(), text: input }, ...tasks])
    setInput('')
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const startEdit = (id: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, isEditing: true } : task
    ))
  }

  const saveEdit = (id: string, newText: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { id, text: newText, isEditing: false } : task
    ))
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-sm">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <ListTodo className="w-5 h-5 text-blue-600" />
        To-do List
      </h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          className="flex-1 border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-gray-50 p-2 rounded border text-sm"
            >
              {task.isEditing ? (
                <input
                  type="text"
                  defaultValue={task.text}
                  onBlur={(e) => saveEdit(task.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter')
                      saveEdit(task.id, (e.target as HTMLInputElement).value)
                  }}
                  autoFocus
                  className="flex-1 border px-2 py-1 rounded text-sm mr-2"
                />
              ) : (
                <span className="flex-1 text-gray-800 mr-2 truncate">
                  {task.text}
                </span>
              )}

              <div className="flex gap-2">
                {task.isEditing ? (
                  <button
                    onClick={() => {
                      const inputEl = document.querySelector<HTMLInputElement>(
                        `input[value="${task.text}"]`
                      )
                      if (inputEl) saveEdit(task.id, inputEl.value)
                    }}
                    className="text-green-600 hover:text-green-800"
                    aria-label="Save task"
                  >
                    <Check size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(task.id)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Edit task"
                  >
                    <SquarePen size={18} />
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
