import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import './JobCard.css';

export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="job-card" aria-label={`${job.title} at ${job.companyName}`}>
      <div className="jc-top">
        <img src={job.companyLogoUrl} alt={job.companyName} className="jc-logo" />
        <div className="jc-title-group">
          <h3 className="jc-title">{job.title}</h3>
          <div className="jc-rating">
            <StarRating rating={job.rating} />
            <span className="jc-rating-num">{job.rating}.0</span>
          </div>
        </div>
      </div>

      <p className="jc-description">{job.jobDescription}</p>

      <div className="jc-meta">
        <span className="jc-badge location">
          <i className="fas fa-map-marker-alt" /> {job.location}
        </span>
        <span className="jc-badge type">
          <i className="fas fa-briefcase" /> {job.employmentType}
        </span>
        <span className="jc-package">
          <i className="fas fa-rupee-sign" /> {job.packagePerAnnum}
        </span>
      </div>

      <div className="jc-arrow">
        View Details <i className="fas fa-arrow-right" />
      </div>
    </Link>
  );
}
