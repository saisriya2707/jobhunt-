import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import StarRating from '../components/StarRating';
import './JobDetailPage.css';

const STATUS = { LOADING: 'loading', SUCCESS: 'success', FAILURE: 'failure' };

export default function JobDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    setStatus(STATUS.LOADING);
    fetch(`/jobs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { setData(d); setStatus(STATUS.SUCCESS); })
      .catch(() => setStatus(STATUS.FAILURE));
  }, [id, token]);

  if (status === STATUS.LOADING) {
    return (
      <div className="detail-page">
        <Header />
        <div className="loader-container"><div className="loader" /></div>
      </div>
    );
  }

  if (status === STATUS.FAILURE) {
    return (
      <div className="detail-page">
        <Header />
        <div className="failure-container">
          <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure" />
          <h2>Oops! Something went wrong</h2>
          <p>We couldn't load this job. Please try again.</p>
          <button className="retry-btn" onClick={() => setStatus(STATUS.LOADING)}>Retry</button>
        </div>
      </div>
    );
  }

  const { job_details: job, similar_jobs: similar } = data;

  return (
    <div className="detail-page">
      <Header />
      <div className="detail-layout">

        {/* Main content */}
        <div className="detail-main">
          {/* Job header card */}
          <div className="detail-card">
            <div className="detail-header">
              <img src={job.companyLogoUrl} alt={job.companyName} className="detail-logo" />
              <div>
                <h1 className="detail-title">{job.title}</h1>
                <div className="detail-rating-row">
                  <StarRating rating={job.rating} />
                  <span className="detail-rating-num">{job.rating}.0</span>
                </div>
              </div>
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-btn"
                title={`Apply on ${job.companyName} careers page`}
              >
                Apply Now <i className="fas fa-external-link-alt" />
              </a>
            </div>

            <div className="detail-meta-row">
              <span className="detail-meta-item"><i className="fas fa-map-marker-alt" /> {job.location}</span>
              <span className="detail-meta-item"><i className="fas fa-briefcase" /> {job.employmentType}</span>
              <span className="detail-meta-salary"><i className="fas fa-rupee-sign" /> {job.packagePerAnnum}</span>
            </div>
          </div>

          {/* Description */}
          <div className="detail-card">
            <div className="detail-section-header">
              <h2>Description</h2>
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-link"
              >
                Visit {job.companyName} Careers <i className="fas fa-external-link-alt" />
              </a>
            </div>
            <p className="detail-description">{job.jobDescription}</p>
          </div>

          {/* Skills */}
          <div className="detail-card">
            <h2 className="detail-section-title">Skills</h2>
            <div className="skills-grid">
              {job.skills.map(skill => (
                <div key={skill.name} className="skill-chip">
                  <img src={skill.imageUrl} alt={skill.name} className="skill-img" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Life at company */}
          <div className="detail-card life-card">
            <h2 className="detail-section-title">Life at {job.companyName}</h2>
            <div className="life-content">
              <p className="life-text">{job.lifeAtCompany.description}</p>
              <img src={job.lifeAtCompany.imageUrl} alt="Life at company" className="life-img" />
            </div>
          </div>
        </div>

        {/* Similar jobs sidebar */}
        <aside className="similar-sidebar">
          <h2 className="similar-title">Similar Jobs</h2>
          <div className="similar-list">
            {similar.map(s => (
              <Link to={`/jobs/${s.id}`} key={s.id} className="similar-card">
                <div className="similar-top">
                  <img src={s.companyLogoUrl} alt={s.companyName} className="similar-logo" />
                  <div>
                    <h3 className="similar-job-title">{s.title}</h3>
                    <div className="similar-rating">
                      <StarRating rating={s.rating} />
                    </div>
                  </div>
                </div>
                <div className="similar-meta">
                  <span><i className="fas fa-map-marker-alt" /> {s.location}</span>
                  <span><i className="fas fa-briefcase" /> {s.employmentType}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
