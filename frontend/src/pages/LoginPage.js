import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../api';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const fillDemoCredentials = () => {
    setUsername('rahul');
    setPassword('rahul@2021');
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!username.trim()) { setError('Please enter your username'); return; }
    if (!password) { setError('Please enter your password'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error_msg || 'Login failed'); return; }
      login(data.jwt_token, data.name);
      navigate('/');
    } catch {
      setError('Network error. Is the backend running?');
    } finally { setLoading(false); }
  };

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-logo">
            <i className="fas fa-briefcase" />
          </div>
          <h1>Job<span>Hunt</span></h1>
        </div>
        <h2 className="login-headline">Find your next<br />dream tech role</h2>
        <p className="login-subtext">
          Thousands of opportunities at top tech companies across India.
          Your next chapter starts here.
        </p>
        <div className="login-stats">
          <div className="stat"><span className="stat-num">1,200+</span><span className="stat-label">Open Roles</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">340+</span><span className="stat-label">Companies</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">92%</span><span className="stat-label">Placement</span></div>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue your job search</p>
          </div>

          {error && (
            <div className="form-error" role="alert">
              <i className="fas fa-exclamation-circle" /> {error}
            </div>
          )}

          <div className="form-field">
            <label htmlFor="username">Username</label>
            <div className="input-wrap">
              <i className="fas fa-user input-icon" />
              <input
                id="username" type="text" placeholder="Enter username"
                value={username} onChange={e => { setUsername(e.target.value); setError(''); }}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <i className="fas fa-lock input-icon" />
              <input
                id="password" type={showPass ? 'text' : 'password'} placeholder="Enter password"
                value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
                autoComplete="current-password"
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)} aria-label="Toggle password">
                <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? <><span className="btn-spinner" /> Signing in…</> : 'Sign In'}
          </button>

          <button type="button" className="demo-hint-btn" onClick={fillDemoCredentials}>
            <i className="fas fa-magic" /> Use demo credentials <span className="demo-hint-detail">(rahul / rahul@2021)</span>
          </button>
        </form>
      </div>
    </div>
  );
}
