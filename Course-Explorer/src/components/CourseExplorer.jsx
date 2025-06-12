import React, { useState, useMemo } from "react";
import initialCourses from "../mockData.js";
import CourseCard from "./CourseCard.jsx";
import FilterPanel from "./FilterPannel.jsx";

const CourseExplorer = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    courses.forEach((course) => {
      course.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [courses]);

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => course.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "favorites":
          if (a.favorite && !b.favorite) return -1;
          if (!a.favorite && b.favorite) return 1;
          return a.title.localeCompare(b.title);
        case "level": {
          const levelOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return levelOrder[a.level] - levelOrder[b.level];
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [courses, selectedTags, searchTerm, sortBy]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleToggleFavorite = (courseId) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, favorite: !course.favorite }
          : course
      )
    );
  };

  return (
    <div className="course-explorer">
      <header className="explorer-header">
        <h1 className="main-title">Course Explorer</h1>
        <p className="main-subtitle">
          Discover and learn new skills with our comprehensive course library
        </p>
        <div className="stats">
          <span className="stat">
            {filteredAndSortedCourses.length} courses found
          </span>
          <span className="stat">
            {courses.filter((c) => c.favorite).length} favorites
          </span>
        </div>
      </header>

      <div className="explorer-content">
        <aside className="sidebar">
          <FilterPanel
            allTags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </aside>

        <main className="courses-main">
          {filteredAndSortedCourses.length > 0 ? (
            <div className="courses-grid">
              {filteredAndSortedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseExplorer;
