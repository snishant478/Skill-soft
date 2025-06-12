import React from "react";
import { Search, Filter } from "lucide-react";

const FilterPanel = ({
  allTags,
  selectedTags,
  onTagToggle,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="filter-panel">
      <div className="search-section">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="sort-section">
        <label htmlFor="sort-select" className="sort-label">
          <Filter size={16} />
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="title">Title A-Z</option>
          <option value="favorites">Favorites First</option>
          <option value="level">Difficulty Level</option>
        </select>
      </div>

      <div className="tags-section">
        <h3 className="tags-title">Filter by Tags</h3>
        <div className="tags-grid">
          {allTags.map((tag) => (
            <label key={tag} className="tag-checkbox">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => onTagToggle(tag)}
              />
              <span className="checkmark"></span>
              <span className="tag-label">{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
