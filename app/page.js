'use client'

import { useState, useEffect } from 'react'
import { Trash2, Check, Plus, Calendar, Sparkles } from 'lucide-react'

export default function Home() {
  const [todos, setTodos] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [inputValue, setInputValue] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (trimmed) {
      const newTodo = {
        id: Date.now(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTodos([newTodo, ...todos])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const pendingCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md mx-auto">
        {/* Header Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 mb-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-1 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
                Todo
              </h1>
              <p className="text-gray-400">每天都是新的开始</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{pendingCount}</div>
              <div className="text-sm text-gray-400">待完成</div>
            </div>
          </div>

          {/* Progress bar */}
          {todos.length > 0 && (
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${todos.length > 0 ? (completedCount / todos.length) * 100 : 0}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Add Todo */}
        <form onSubmit={addTodo} className="relative mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="添加新的任务..."
            className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all pr-14"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="text-xl font-semibold text-white mb-2">暂无待办事项</h3>
              <p className="text-gray-400">添加一个新任务开始美好的一天吧！</p>
            </div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className={`group bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 ${
                  todo.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      todo.completed
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent'
                        : 'border-gray-500 hover:border-purple-400'
                    }`}
                  >
                    {todo.completed && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <span className={`flex-1 text-white transition-all duration-300 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="w-full mt-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            清除已完成 ({completedCount})
          </button>
        )}

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              {pendingCount} 待完成
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              {completedCount} 已完成
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
