import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

// Codespaces endpoint example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('users'), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeRecords(payload));
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Users</h2>

        {loading && <p className="text-muted mb-0">Loading users...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && users.length === 0 && (
          <p className="text-muted mb-0">No users found.</p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="row g-3">
            {users.map((user) => (
              <div key={user.id || user._id} className="col-md-6 col-xl-4">
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h5 mb-0">{user.name}</h3>
                    <span className="badge text-bg-primary">{user.badge}</span>
                  </div>
                  <p className="mb-1 text-muted">{user.email}</p>
                  <p className="mb-0 fw-semibold">{user.points} points</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Users;
