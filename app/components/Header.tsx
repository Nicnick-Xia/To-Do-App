'use client';

import { Zap } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = 'Tasks', subtitle = '专注当下，稳步前行' }: HeaderProps) {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.logoWrapper}>
        <div className={styles.logo} aria-hidden="true">
          <Zap size={24} />
        </div>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
}
