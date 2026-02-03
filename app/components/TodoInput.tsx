'use client';

import { forwardRef, useState, useCallback, useRef } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import styles from './TodoInput.module.css';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export const TodoInput = forwardRef<HTMLInputElement, TodoInputProps>(
  function TodoInput({ onAddTodo }, ref) {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
          onAddTodo(inputValue);
          setInputValue('');
        }
      },
      [inputValue, onAddTodo]
    );

    const isEmpty = !inputValue.trim();

    return (
      <form className={styles.form} role="search" aria-label="添加新任务">
        <div className={`${styles.inputWrapper} ${isFocused ? styles.focused : ''}`}>
          <input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="今天想完成什么？"
            aria-label="新任务内容"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className={styles.input}
          />
          <Plus
            className={`${styles.icon} ${isFocused ? styles.iconFocused : ''}`}
            size={20}
            aria-hidden="true"
          />
          <button
            type="submit"
            disabled={isEmpty}
            aria-label="添加任务"
            aria-disabled={isEmpty}
            className={styles.submitButton}
            data-disabled={isEmpty}
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </form>
    );
  }
);
