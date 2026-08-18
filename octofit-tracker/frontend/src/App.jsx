import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { shouldShowCodespaceWarning } from './utils/api';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const showCodespaceWarning = shouldShowCodespaceWarning();

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/">
            OctoFit Tracker
          </a>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link rounded px-3 py-2 ${isActive ? 'bg-white text-primary' : 'text-white-50'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {showCodespaceWarning && (
        <div className="container mt-3">
          <div className="alert alert-warning mb-0" role="alert">
            VITE_CODESPACE_NAME must be defined in .env.local before loading the API, for example:
            {' '}<strong>VITE_CODESPACE_NAME=my-codespace</strong>
          </div>
        </div>
      )}

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

function Overview() {
  return (
    <>
      <header className="mb-4">
        <p className="text-uppercase text-primary fw-semibold mb-2">School fitness tracker</p>
        <h1 className="display-5 fw-bold mb-3">Stay active, build teams, and compete with purpose.</h1>
        <p className="lead text-secondary mb-0">
          Track workouts, monitor leaderboard standing, and keep each student motivated across the school year.
        </p>
      </header>

      <div className="row g-3">
        <div className="col-md-6 col-xl-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4">Activities</h2>
              <p className="text-muted">Recent movement and performance events tracked by the app.</p>
              <NavLink className="btn btn-outline-primary" to="/activities">Open activities</NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4">Leaderboard</h2>
              <p className="text-muted">See who is leading the school challenge this week.</p>
              <NavLink className="btn btn-outline-primary" to="/leaderboard">View leaderboard</NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4">Teams</h2>
              <p className="text-muted">Track the groups competing for the biggest total score.</p>
              <NavLink className="btn btn-outline-primary" to="/teams">Explore teams</NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4">Users</h2>
              <p className="text-muted">Review participants, badges, and points across the app.</p>
              <NavLink className="btn btn-outline-primary" to="/users">Browse users</NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4">Workouts</h2>
              <p className="text-muted">Keep students engaged with personalized training ideas.</p>
              <NavLink className="btn btn-outline-primary" to="/workouts">See workouts</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
