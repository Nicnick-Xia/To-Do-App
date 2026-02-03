'use client';

import { Trash2 } from 'lucide-react';
import styles from './ClearCompleted.module.css';

interface ClearCompletedProps {
  count: number;
  onClear: () => void;
}

export function ClearCompleted({ count, onClear }: ClearCompletedProps) {
  if (count <= 0) return null;

  return (
    <button
      onClick={onClear}
      className={styles.button}
      aria-label={`清除 ${count} 个已完成的任务`}
    >
      <Trash2 size={16} aria-hidden="true" />
      清除已完成 ({count})
    </button>
  );
}
