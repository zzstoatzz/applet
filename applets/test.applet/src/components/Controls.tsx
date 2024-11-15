interface ControlsProps {
  filter: string;
  sortBy: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

export default function Controls({ filter, sortBy, onFilterChange, onSortChange }: ControlsProps) {
  return (
    <div class="controls">
      <select 
        value={filter}
        onChange={(e) => onFilterChange((e.target as HTMLSelectElement).value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <select 
        value={sortBy}
        onChange={(e) => onSortChange((e.target as HTMLSelectElement).value)}
      >
        <option value="date">Sort by Date</option>
        <option value="priority">Sort by Priority</option>
        <option value="text">Sort by Text</option>
      </select>
    </div>
  );
} 