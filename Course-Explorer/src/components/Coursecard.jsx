import React from "react";
import "../App.css";
import { Heart, Clock, BookOpen } from "lucide-react";

const CourseCard = ({ course, onToggleFavorite }) => {
  const handlefavoriteClick = (e) => {
    e.preventDefault();
    onToggleFavorite(course.id);
  };
  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "level-Beginner";
      case "Intermediate":
        return "level-Intermediate";
      case "Advanced":
        return "level-Advanced";
      default:
        return "level-default";
    }
  };
  return (
    <div className="course-card">
      <div className="course-card-header">
        <div className="course-level">
          <span className={`level-badge ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        <button
          className={`favorite-btn ${course.favorite ? "favorited" : ""}`}
          onClick={handlefavoriteClick}
          aria-label={
            course.favorite ? "Remove from favorites" : "Add to favpoutites"
          }
        >
          <Heart size={20} fill={course.favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <h3 className="" course-title>
        {course.title}
      </h3>
      <p className="course-description">course description</p>
      <div className="course-meta">
        <div className="course-duration">
          <Clock size={16} />
          <span> {course.duration}</span>
        </div>
        <div className="course-lessons">
          <BookOpen size={16} />
          <span>{Math.floor(Math.random() * 20 + 10)} lessons</span>
        </div>
      </div>
      <div className="course-tags">
        {course.tags.map((tag, idx) => {
          <span key={idx} className="tag">
            {tag}
          </span>;
        })}
      </div>
    </div>
  );
};
export default CourseCard;
