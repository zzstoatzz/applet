import { render } from 'preact';
import { h } from 'preact';
import { appletContext } from '@web-applets/sdk';
import TodoList from './components/TodoList';
import { AppletState } from './types';

const applet = appletContext.connect();

// Initialize empty state if needed
if (!applet.state) {
  applet.setState({
    todos: [],
    filter: 'all',
    sortBy: 'priority'
  } as AppletState);
}

// Set up action handlers
applet.setActionHandler('add_todo', ({ text, priority = 'medium' }) => {
  const newTodo = {
    id: Date.now().toString(),
    text,
    completed: false,
    priority,
    createdAt: Date.now()
  };
  
  applet.setState({
    ...applet.state,
    todos: [...(applet.state?.todos || []), newTodo]
  });
});

// Render the app
applet.onrender = () => {
  const root = document.getElementById('app');
  if (root) {
    render(<TodoList applet={applet} />, root);
  }
}; 