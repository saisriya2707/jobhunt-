import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../api';
import Header from '../components/Header';
import './HomePage.css';

export default function HomePage() {
  const { token, userName } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setProfile)
      .catch(() => {});
  }, [token]);

  const handleSearch = e => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(searchInput.trim())}`);
  };

  const firstName = userName.split(' ')[0];

  return (
    <div className="home-page">
      <Header />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-text">
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                <span>1,200+ active roles</span>
              </div>
              <h1 className="hero-heading">
                Hey {firstName}, find jobs<br />
                that <span className="gradient-text">match your skills</span>
              </h1>
              <p className="hero-sub">
                Discover opportunities at top tech companies. Filter by role, location, and salary — all in one place.
              </p>
              <form className="hero-search" onSubmit={handleSearch}>
                <div className="search-input-wrap">
                  <i className="fas fa-search search-icon" />
                  <input
                    type="text"
                    placeholder="Search role, company, or location…"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    aria-label="Search jobs"
                  />
                </div>
                <button type="submit" className="search-btn">
                  <i className="fas fa-search" /> Search Jobs
                </button>
              </form>
              <div className="popular-tags">
                <span>Popular:</span>
                {['Frontend', 'Backend', 'Machine Learning', 'DevOps', 'iOS', 'Data Scientist', 'AI'].map(tag => (
                  <button key={tag} className="tag-pill"
                    onClick={() => navigate(`/jobs?search=${encodeURIComponent(tag)}`)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile card */}
            {profile && (
              <div className="profile-card">
                <img src={profile.profileImageUrl} alt={profile.name} className="profile-avatar" />
                <h3 className="profile-name">{profile.name}</h3>
                <p className="profile-bio">{profile.shortBio}</p>
                <button className="browse-btn" onClick={() => navigate('/jobs')}>
                  Browse All Jobs <i className="fas fa-arrow-right" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Category cards */}
        <section className="categories-section">
          <div className="section-inner">
            <h2 className="section-title">Explore by category</h2>
            <div className="categories-grid">
              {[
                { icon: 'fa-code', label: 'Engineering', count: 480, color: '#00c9a7' },
                { icon: 'fa-database', label: 'Data Science', count: 220, color: '#a371f7' },
                { icon: 'fa-brain', label: 'AI / ML', count: 180, color: '#e3b341' },
                { icon: 'fa-server', label: 'DevOps', count: 95, color: '#f85149' },
                { icon: 'fa-mobile-alt', label: 'Mobile', count: 140, color: '#39d353' },
                { icon: 'fa-table', label: 'Database', count: 60, color: '#58a6ff' },
              ].map(cat => (
                <button key={cat.label} className="cat-card"
                  onClick={() => navigate(`/jobs?search=${encodeURIComponent(cat.label)}`)}>
                  <span className="cat-icon" style={{ background: `${cat.color}18`, color: cat.color }}>
                    <i className={`fas ${cat.icon}`} />
                  </span>
                  <span className="cat-label">{cat.label}</span>
                  <span className="cat-count">{cat.count} jobs</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
