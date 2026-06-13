import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../api';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import './JobsPage.css';

const EMPLOYMENT_TYPES = ['Full Time', 'Part Time', 'Freelance', 'Internship'];
const SALARY_RANGES = [
  { label: '10 LPA & above', value: '10' },
  { label: '20 LPA & above', value: '20' },
  { label: '30 LPA & above', value: '30' },
];
const STATUS = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', FAILURE: 'failure' };

export default function JobsPage() {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState('');
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);

  const fetchJobs = useCallback(async (search, types, salary) => {
    setStatus(STATUS.LOADING);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (types.length) params.set('employment_type', types.join(','));
    if (salary) params.set('minimum_package', salary);
    try {
      const res = await fetch(`${API_BASE_URL}/jobs?${params}`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setJobs(data.jobs);
      setStatus(STATUS.SUCCESS);
    } catch {
      setStatus(STATUS.FAILURE);
    }
  }, [token]);

  // Initial load (use URL search param)
  useEffect(() => { const init = searchParams.get('search') || ''; setSearchInput(init); fetchJobs(init, [], ''); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleTypeToggle = type => {
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updated);
    fetchJobs(searchInput, updated, selectedSalary);
  };

  const handleSalaryChange = val => {
    const updated = selectedSalary === val ? '' : val;
    setSelectedSalary(updated);
    fetchJobs(searchInput, selectedTypes, updated);
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearchParams(searchInput ? { search: searchInput } : {});
    fetchJobs(searchInput, selectedTypes, selectedSalary);
  };

  const clearFilters = () => {
    setSelectedTypes([]); setSelectedSalary(''); setSearchInput('');
    setSearchParams({});
    fetchJobs('', [], '');
  };

  const hasFilters = selectedTypes.length > 0 || selectedSalary || searchInput;

  return (
    <div className="jobs-page">
      <Header />
      <div className="jobs-layout">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Employment Type</h3>
            <div className="filter-list">
              {EMPLOYMENT_TYPES.map(type => (
                <label key={type} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                  />
                  <span className="checkmark" />
                  <span className="filter-label">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sidebar-divider" />

          <div className="sidebar-section">
            <h3 className="sidebar-title">Salary Range</h3>
            <div className="filter-list">
              {SALARY_RANGES.map(({ label, value }) => (
                <label key={value} className="filter-item">
                  <input
                    type="radio"
                    name="salary"
                    checked={selectedSalary === value}
                    onChange={() => handleSalaryChange(value)}
                  />
                  <span className="checkmark radio" />
                  <span className="filter-label">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {hasFilters && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              <i className="fas fa-times" /> Clear Filters
            </button>
          )}
        </aside>

        {/* Main */}
        <main className="jobs-main">
          {/* Search bar */}
          <form className="jobs-search-bar" onSubmit={handleSearch}>
            <div className="jobs-search-wrap">
              <i className="fas fa-search" />
              <input
                type="text"
                placeholder="Search by role, company or location…"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
            </div>
            <button type="submit" className="jobs-search-btn">
              <i className="fas fa-search" />
            </button>
          </form>

          {/* Results */}
          {status === STATUS.LOADING && (
            <div className="loader-container">
              <div className="loader" />
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Finding the best roles for you…</p>
            </div>
          )}

          {status === STATUS.FAILURE && (
            <div className="failure-container">
              <h2>Oops! Something went wrong</h2>
              <p>We couldn't load the jobs. Please try again.</p>
              <button className="retry-btn" onClick={() => fetchJobs(searchInput, selectedTypes, selectedSalary)}>
                Retry
              </button>
            </div>
          )}

          {status === STATUS.SUCCESS && jobs.length === 0 && (
            <div className="failure-container">
              <h2>No Jobs Found</h2>
              <p>Try adjusting your search or filters to find more opportunities.</p>
              <button className="retry-btn" onClick={clearFilters}>Clear Filters</button>
            </div>
          )}

          {status === STATUS.SUCCESS && jobs.length > 0 && (
            <>
              <div className="jobs-results-header">
                <p className="results-count"><span>{jobs.length}</span> jobs found</p>
                {hasFilters && <span className="filter-active-badge"><i className="fas fa-filter" /> Filters active</span>}
              </div>
              <div className="jobs-list">
                {jobs.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
