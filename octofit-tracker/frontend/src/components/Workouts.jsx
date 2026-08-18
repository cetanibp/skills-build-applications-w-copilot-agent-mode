import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('workouts'), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeRecords(payload));
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchWorkouts();

    return () => controller.abort();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Workouts</h2>

        {loading && <p className="text-muted mb-0">Loading workouts...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && workouts.length === 0 && (
          <p className="text-muted mb-0">No workouts scheduled yet.</p>
        )}

        {!loading && !error && workouts.length > 0 && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div key={workout.id || workout._id} className="col-md-6 col-xl-4">
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h3 className="h5 mb-0">{workout.title}</h3>
                    <span className="badge text-bg-warning text-dark">{workout.difficulty}</span>
                  </div>
                  <p className="text-muted mb-2 text-capitalize">{workout.category}</p>
                  <p className="small mb-2">{workout.description}</p>
                  <p className="mb-0 fw-semibold">{workout.durationMinutes} minutes</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
