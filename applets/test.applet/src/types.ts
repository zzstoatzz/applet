export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface AppletState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  sortBy: 'priority' | 'date' | 'text';
} 