import { useEffect, useState } from 'preact/hooks';
import { Todo, AppletState } from '../types';
import TodoItem from './TodoItem';
import Controls from './Controls';
import { AppletContext } from '@web-applets/sdk';

interface TodoListProps {
  applet: AppletContext;
}

export default function TodoList({ applet }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'date' | 'text'>('priority');

  useEffect(() => {
    // Sync with applet state
    const state = applet.state || { todos: [], filter: 'all', sortBy: 'priority' };
    setTodos(state.todos);
    setFilter(state.filter);
    setSortBy(state.sortBy);
  }, [applet.state]);

  const sortTodos = (todos: Todo[]) => {
    return [...todos].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'date':
          return b.createdAt - a.createdAt;
        case 'text':
          return a.text.localeCompare(b.text);
        default:
          return 0;
      }
    });
  };

  const filterTodos = (todos: Todo[]) => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredAndSortedTodos = sortTodos(filterTodos(todos));

  return (
    <div>
      <Controls 
        filter={filter} 
        sortBy={sortBy}
        onFilterChange={(newFilter) => {
          applet.setState({ ...applet.state, filter: newFilter });
        }}
        onSortChange={(newSort) => {
          applet.setState({ ...applet.state, sortBy: newSort });
        }}
      />
      <div class="todo-list">
        {filteredAndSortedTodos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={() => {
              const updatedTodos = todos.map(t => 
                t.id === todo.id ? { ...t, completed: !t.completed } : t
              );
              applet.setState({ ...applet.state, todos: updatedTodos });
            }}
            onPriorityChange={(priority) => {
              const updatedTodos = todos.map(t => 
                t.id === todo.id ? { ...t, priority } : t
              );
              applet.setState({ ...applet.state, todos: updatedTodos });
            }}
            onDelete={() => {
              const updatedTodos = todos.filter(t => t.id !== todo.id);
              applet.setState({ ...applet.state, todos: updatedTodos });
            }}
          />
        ))}
      </div>
    </div>
  );
} 