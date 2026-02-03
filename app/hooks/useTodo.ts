'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Todo } from '@/app/lib/storage';
import { getTodos, saveTodos, generateId } from '@/app/lib/storage';

interface UseTodoReturn {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  stats: {
    total: number;
    pending: number;
    completed: number;
    progress: number;
  };
  isInitialized: boolean;
}

export function useTodo(): UseTodoReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const initializedRef = useRef(false);

  // rerender-memo-with-default-value: 初始化时读取一次
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const saved = getTodos();
    setTodos(saved);
    setIsInitialized(true);
  }, []);

  // 持久化到 localStorage
  useEffect(() => {
    if (!isInitialized) return;
    saveTodos(todos);
  }, [todos, isInitialized]);

  // 添加 todo - rerender-functional-setstate: 使用函数式更新
  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: generateId(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  // 切换完成状态
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // 删除 todo
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // 清除已完成的任务
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  // 统计信息 - rerender-memo: 使用 useMemo 优化计算
  const stats = useMemo(() => {
    const total = todos.length;
    const pending = todos.filter((todo) => !todo.completed).length;
    const completed = todos.filter((todo) => todo.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, pending, completed, progress };
  }, [todos]);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
    isInitialized,
  };
}
