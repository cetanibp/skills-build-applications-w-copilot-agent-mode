import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('teams'), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeRecords(payload));
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTeams();

    return () => controller.abort();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Teams</h2>

        {loading && <p className="text-muted mb-0">Loading teams...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && teams.length === 0 && (
          <p className="text-muted mb-0">No teams available yet.</p>
        )}

        {!loading && !error && teams.length > 0 && (
          <div className="row g-3">
            {teams.map((team) => (
              <div key={team.id || team._id} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h5 mb-0">{team.name}</h3>
                    <span className="badge text-bg-success">{team.points} pts</span>
                  </div>
                  <p className="text-muted mb-2">Members: {Array.isArray(team.members) ? team.members.length : 0}</p>
                  <ul className="list-unstyled mb-0 small">
                    {Array.isArray(team.members) && team.members.length > 0 ? (
                      team.members.map((member) => <li key={member}>• {member}</li>)
                    ) : (
                      <li className="text-muted">No members assigned.</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
