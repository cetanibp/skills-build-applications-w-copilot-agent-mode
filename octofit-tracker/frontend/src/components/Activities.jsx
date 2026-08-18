import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

// Codespaces endpoint example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('activities'), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeRecords(payload));
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchActivities();

    return () => controller.abort();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 mb-0">Activities</h2>
          <span className="badge text-bg-primary rounded-pill">{activities.length}</span>
        </div>

        {loading && <p className="text-muted mb-0">Loading activities...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && activities.length === 0 && (
          <p className="text-muted mb-0">No activities found.</p>
        )}

        {!loading && !error && activities.length > 0 && (
          <div className="list-group list-group-flush">
            {activities.map((activity) => (
              <div key={activity.id || activity._id} className="list-group-item px-0">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <h3 className="h5 mb-1 text-capitalize">{activity.type}</h3>
                    <p className="mb-1 text-muted">User: {activity.userId}</p>
                  </div>
                  <span className="badge text-bg-light text-dark">{activity.durationMinutes} min</span>
                </div>
                <div className="row mt-2 g-2 small text-muted">
                  <div className="col-md-4">Calories: {activity.caloriesBurned}</div>
                  <div className="col-md-4">Distance: {activity.distanceMiles ?? '—'} mi</div>
                  <div className="col-md-4">Notes: {activity.notes || '—'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
