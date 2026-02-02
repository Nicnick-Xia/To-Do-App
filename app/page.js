'use client'

import { useState, useEffect } from 'react'
import { Check, Trash2, Plus, Calendar, Zap, Heart, Star, ArrowRight } from 'lucide-react'

export default function Home() {
  const [todos, setTodos] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [hoveredTodo, setHoveredTodo] = useState(null)

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
  const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden font-sans">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[spin_20s_linear_infinite]">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-cyan-600/20 to-blue-600/20 rounded-full blur-[100px]"></div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="fixed top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse delay-300"></div>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Tasks
            </h1>
          </div>
          <p className="text-gray-400">专注当下，稳步前行</p>
        </div>

        {/* Stats Card */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 mb-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-bold text-white">{pendingCount}</div>
              <div className="text-gray-400 text-sm">待完成任务</div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
              <span className="text-gray-400">{completedCount} 已完成</span>
            </div>
          </div>
          {/* Progress */}
          {todos.length > 0 && (
            <div className="relative">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>进度</span>
                <span>{progress}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Add Input */}
        <form onSubmit={addTodo} className="relative mb-8">
          <div
            className={`relative transition-all duration-300 ${
              isFocused ? 'transform scale-[1.02]' : ''
            }`}
          >
            <input
              type="text"
              value={inputValue}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="今天想完成什么？"
              className="w-full px-6 py-5 pl-14 bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/12 transition-all text-lg"
            />
            <Plus className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 ${isFocused ? 'text-violet-400 scale-110' : ''}`} />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 text-center">
              <div className="text-7xl mb-6 animate-bounce">✨</div>
              <h3 className="text-2xl font-semibold text-white mb-3">开始你的旅程</h3>
              <p className="text-gray-400 text-lg">添加第一个任务，开启美好的一天</p>
              <div className="flex justify-center gap-2 mt-6">
                <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
                <Star className="w-5 h-5 text-yellow-500 animate-pulse delay-100" />
                <Star className="w-5 h-5 text-yellow-500 animate-pulse delay-200" />
              </div>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                onMouseEnter={() => setHoveredTodo(todo.id)}
                onMouseLeave={() => setHoveredTodo(null)}
                className={`group relative bg-white/5 backdrop-blur-2xl rounded-2xl p-5 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10 ${
                  todo.completed ? 'opacity-50' : ''
                } ${hoveredTodo === todo.id ? 'transform translate-x-2' : ''}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`relative flex-shrink-0 w-7 h-7 rounded-xl border-2 transition-all duration-300 flex items-center justify-center overflow-hidden ${
                      todo.completed
                        ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 border-transparent shadow-lg shadow-purple-500/30'
                        : 'border-gray-600 hover:border-violet-400'
                    }`}
                  >
                    {todo.completed && (
                      <Check className="w-4 h-4 text-white animate-[bounce_0.3s_ease-out]" />
                    )}
                  </button>
                  <span className={`flex-1 text-lg transition-all duration-300 ${
                    'line-through text-gray-500' : 'text-white'
                  }`}>
                    {todo.text}
                  </span>
                  <button
                    onClick={() => todo.completed ? deleteTodo(todo.id)}
                    className={`opacity-0 group-hover:opacity-100 p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 ${
                      hoveredTodo === todo.id ? 'animate-[bounce_0.3s_ease-out]' : ''
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {/* Animated line indicator */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-r-full transition-all duration-300 ${
                  todo.completed ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
            ))
          )}
        </div>

        {/* Clear Completed */}
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="w-full mt-8 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Trash2 className="w-4 h-4 group-hover:animate-pulse" />
            清除已完成 ({completedCount})
          </button>
        )}

        {/* Footer Stats */}
        {todos.length > 0 && (
          <div className="mt-8 flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-2 h-2 rounded-full bg-violet-500"></div>
              <span>{pendingCount} 待完成</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-2 h-2 rounded-full bg-fuchsia-500"></div>
              <span>{completedCount} 已完成</span>
            </div>
          </div>
        )}

        {/* Date */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
          </div>
        </div>
      </div>
    </div>
  )
}
