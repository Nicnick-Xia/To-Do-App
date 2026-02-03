'use client';

import { memo } from 'react';
import { Heart } from 'lucide-react';
import styles from './Stats.module.css';

interface StatsProps {
  stats: {
    pending: number;
    completed: number;
    progress: number;
    total: number;
  };
}

// 使用 memo 优化统计组件，避免不必要的重新渲染
export const Stats = memo(function Stats({ stats }: StatsProps) {
  const { pending, completed, progress, total } = stats;

  return (
    <section
      className={styles.container}
      role="region"
      aria-label="任务统计"
    >
      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <div className={styles.count}>{pending}</div>
          <div className={styles.label}>待完成任务</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.completedWrapper}>
            <Heart
              className={styles.heartIcon}
              size={20}
              aria-hidden="true"
            />
            <span className={styles.completedText}>{completed} 已完成</span>
          </div>
        </div>
      </div>

      {/* 进度条 - 遵循可访问性指南 */}
      {total > 0 && (
        <div
          className={styles.progressContainer}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="任务完成进度"
        >
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.progressLabel}>
            <span>进度</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}
    </section>
  );
});
