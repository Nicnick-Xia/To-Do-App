'use client';

import { Calendar } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterProps {
  stats: {
    pending: number;
    completed: number;
    total: number;
  };
}

export function Footer({ stats }: FooterProps) {
  const { pending, completed, total } = stats;
  const date = new Date();

  return (
    <footer className={styles.footer} role="contentinfo">
      {total > 0 && (
        <div className={styles.stats} aria-label="任务统计摘要">
          <div className={styles.statItem}>
            <span className={styles.dot} style={{ background: 'oklch(0.7 0.2 280)' }} />
            <span>{pending} 待完成</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.dot} style={{ background: 'oklch(0.7 0.25 320)' }} />
            <span>{completed} 已完成</span>
          </div>
        </div>
      )}

      <div
        className={styles.date}
        role="time"
        aria-label={`当前日期: ${date.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}`}
      >
        <Calendar size={16} aria-hidden="true" />
        <time dateTime={date.toISOString()}>
          {date.toLocaleDateString('zh-CN', {
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </time>
      </div>
    </footer>
  );
}
