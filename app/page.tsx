'use client';

import { useTodo } from '@/app/hooks/useTodo';
import {
  Header,
  TodoInput,
  Stats,
  TodoList,
  EmptyState,
  ClearCompleted,
  Footer,
} from '@/app/components';
import styles from './page.module.css';

export default function Home() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
    isInitialized,
  } = useTodo();

  // 如果还没有从 localStorage 加载完成，显示加载状态
  if (!isInitialized) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <span className={styles.loadingText}>加载中...</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 背景动画 */}
      <Background />

      <main className={styles.main}>
        <Header />
        <Stats stats={stats} />
        <TodoInput onAddTodo={addTodo} />

        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
            <ClearCompleted
              count={stats.completed}
              onClear={clearCompleted}
            />
          </>
        )}

        <Footer stats={stats} />
      </main>
    </div>
  );
}

function Background() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.gradientWrapper}>
        <div className={styles.gradient1} />
        <div className={styles.gradient2} />
      </div>
      <div className={styles.floatingElement1} />
      <div className={styles.floatingElement2} />
      <div className={styles.floatingElement3} />
    </div>
  );
}
