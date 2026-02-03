'use client';

import { memo } from 'react';
import { Check, Trash2 } from 'lucide-react';
import styles from './TodoItem.module.css';
import type { Todo } from '@/app/lib/storage';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// 使用 memo 优化 TodoItem，避免整个列表重新渲染
export const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={`${styles.item} ${todo.completed ? styles.completed : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="listitem"
      aria-label={todo.text}
    >
      <div className={styles.content}>
        <button
          onClick={() => onToggle(todo.id)}
          className={`${styles.checkbox} ${todo.completed ? styles.checkboxChecked : ''}`}
          aria-label={todo.completed ? '标记为未完成' : '标记为已完成'}
          aria-pressed={todo.completed}
        >
          {todo.completed && (
            <Check size={16} aria-hidden="true" />
          )}
        </button>

        <span className={styles.text}>{todo.text}</span>

        <button
          onClick={() => onDelete(todo.id)}
          className={styles.deleteButton}
          aria-label={`删除任务: ${todo.text}`}
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>

      {/* 左侧指示器 */}
      <div
        className={`${styles.indicator} ${todo.completed ? styles.indicatorVisible : ''}`}
        aria-hidden="true"
      />
    </li>
  );
});

import { useState } from 'react';
