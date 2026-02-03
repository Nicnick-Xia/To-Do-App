// 存储工具函数 - 遵循 Vercel 最佳实践
// bundle-conditional: 仅在客户端加载 storage 相关代码

const STORAGE_KEY = 'todos_data';
const STORAGE_VERSION = '1.0';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface StorageData {
  version: string;
  todos: Todo[];
  lastUpdated: number;
}

// 获取 todos - 客户端安全
export function getTodos(): Todo[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const data: StorageData = JSON.parse(saved);
    
    // 版本检查
    if (data.version !== STORAGE_VERSION) {
      return migrateTodos(data);
    }

    return data.todos || [];
  } catch (error) {
    console.error('[Storage] Failed to load todos:', error);
    return [];
  }
}

// 保存 todos - 客户端安全
export function saveTodos(todos: Todo[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StorageData = {
      version: STORAGE_VERSION,
      todos,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('[Storage] Failed to save todos:', error);
  }
}

// 生成唯一 ID - 性能优化
let idCounter = 0;
export function generateId(): string {
  // 结合时间和计数器，避免 Math.random 开销
  return `${Date.now().toString(36)}_${(++idCounter).toString(36)}`;
}

// 数据迁移
function migrateTodos(data: StorageData): Todo[] {
  console.log('[Storage] Migrating todos from version:', data.version);
  // 当前版本无需迁移
  return data.todos || [];
}

// 清空存储
export function clearTodos(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
}
