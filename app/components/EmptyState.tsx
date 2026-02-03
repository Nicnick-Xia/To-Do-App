'use client';

import { Sparkles } from 'lucide-react';
import styles from './EmptyState.module.css';

export function EmptyState() {
  return (
    <div
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-label="空任务列表"
    >
      <div className={styles.emoji} aria-hidden="true">
        ✨
      </div>
      <h2 className={styles.title}>开始你的旅程</h2>
      <p className={styles.description}>
        添加第一个任务，开启美好的一天
      </p>
      <div className={styles.stars} aria-label="鼓励">
        <Sparkles size={20} className={styles.star} style={{ '--delay': '0ms' } as React.CSSProperties} />
        <Sparkles size={20} className={styles.star} style={{ '--delay': '100ms' } as React.CSSProperties} />
        <Sparkles size={20} className={styles.star} style={{ '--delay': '200ms' } as React.CSSProperties} />
      </div>
    </div>
  );
}
