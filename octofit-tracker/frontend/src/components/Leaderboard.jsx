import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

// Codespaces endpoint example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('leaderboard'), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeRecords(payload));
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchLeaderboard();

    return () => controller.abort();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Leaderboard</h2>

        {loading && <p className="text-muted mb-0">Loading leaderboard...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && entries.length === 0 && (
          <p className="text-muted mb-0">No leaderboard results available.</p>
        )}

        {!loading && !error && entries.length > 0 && (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th className="text-end">Points</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id || entry.userId || `${entry.rank}-${entry.name}`}>
                    <td>#{entry.rank}</td>
                    <td>{entry.name}</td>
                    <td>{entry.team}</td>
                    <td className="text-end fw-semibold">{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
