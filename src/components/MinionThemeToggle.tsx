"use client";
import { useEffect, useState } from "react";
import { useTheme } from 'next-themes'
import styles from './MinionThemeToggle.module.css';

export default function MinionThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
  
  // Only show the toggle after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // During SSR and initial client render, return a placeholder
  if (!mounted) {
    return (
      <div 
        className={styles.toggle}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={styles.toggle}>
      <input 
        type="checkbox" 
        id="themeToggle"
        checked={theme === 'dark'}
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={styles.input}
      />
      <label htmlFor="themeToggle" className={styles.label}>
        <span className={styles.thumb}></span>
      </label>
    </div>
  );
} 