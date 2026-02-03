'use client';

import { memo } from 'react';
import { TodoItem } from './TodoItem';
import type { Todo } from '@/app/lib/storage';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// 使用 memo 优化 TodoList
export const TodoList = memo(function TodoList({
  todos,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list} role="list" aria-label="任务列表">
      {todos.map((todo, index) => (
        <li
          key={todo.id}
          className={styles.listItem}
          style={{ '--delay': `${index * 50}ms` } as React.CSSProperties}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
});
