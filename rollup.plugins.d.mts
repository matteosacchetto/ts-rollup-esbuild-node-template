import type { Plugin } from 'rollup';

export type WatcherOptions = {
  files: string[];
};

/**
 * Watch additional files
 */
export function watcher(options: WatcherOptions): Plugin;
