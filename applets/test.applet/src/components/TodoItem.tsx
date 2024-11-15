import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onPriorityChange: (priority: string) => void;
  onDelete: () => void;
}

export default function TodoItem({ todo, onToggle, onPriorityChange, onDelete }: TodoItemProps) {
  return (
    <div class={`todo-item priority-${todo.priority}${todo.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <span>{todo.text}</span>
      <select
        value={todo.priority}
        onChange={(e) => onPriorityChange((e.target as HTMLSelectElement).value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={onDelete}>×</button>
    </div>
  );
} 