import { useState } from 'react';

const App = () => {
  const [restaurantId, setRestaurantId] = useState('');
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMenu = async (e) => {
    e.preventDefault();
    if (!restaurantId.trim()) {
      setError('Please enter a restaurant ID');
      return;
    }

    setLoading(true);
    setError('');
    setMenu([]);

    try {
      const response = await fetch(`http://localhost:80/v1/customer/menu/${restaurantId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/js on',
        },
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to fetch menu');
      }

      const data = await response.json();
      setMenu(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const groupedMenu = menu.reduce((acc, item) => {
    const key = item.categoryId || 'Others';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const sortedCategoryIds = Object.keys(groupedMenu).sort();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-white/5 bg-slate-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Epicuria Menu Explorer</h1>
            <p className="text-sm text-slate-400">View live menu items for any restaurant by ID.</p>
          </div>

          <form onSubmit={fetchMenu} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:min-w-[380px]">
            <input
              type="text"
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
              placeholder="Enter restaurantId"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm outline-none ring-0 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-sm hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Fetching…' : 'Fetch Menu'}
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 space-y-4">
        {error && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && menu.length === 0 && (
          <div className="mt-10 flex flex-col items-center text-center gap-3 text-slate-400">
            <div className="h-20 w-20 rounded-full border border-dashed border-slate-700 flex items-center justify-center text-3xl">
              🍽️
            </div>
            <div>
              <p className="text-base font-medium text-slate-200">Start by entering a restaurant ID</p>
              <p className="text-sm">You&apos;ll see menu items grouped by category here.</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-10 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
          </div>
        )}

        {!loading && menu.length > 0 && (
          <section className="space-y-6 mt-2">
            {sortedCategoryIds.map((categoryId) => {
              const items = groupedMenu[categoryId] || [];
              return (
                <div key={categoryId} className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-lg font-semibold text-slate-100">
                      Category {categoryId}
                    </h2>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      {items.length} item{items.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items
                      .slice()
                      .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
                      .map((item) => (
                        <article
                          key={item._id}
                          className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 shadow-sm hover:border-emerald-400/60 hover:shadow-emerald-500/10 transition flex flex-col"
                        >
                          {item.imageUrl ? (
                            <div className="h-32 w-full overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              />
                            </div>
                          ) : (
                            <div className="h-10" />
                          )}

                          <div className="flex-1 p-4 space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-sm font-semibold text-slate-50 line-clamp-2">
                                {item.name || 'Untitled Item'}
                              </h3>
                              <div className="flex items-center gap-1 text-xs">
                                {item.isVegetarian ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300 border border-emerald-500/40">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    Veg
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-red-200 border border-red-500/40">
                                    <span className="h-2 w-2 rounded-full bg-red-400" />
                                    Non-Veg
                                  </span>
                                )}
                              </div>
                            </div>

                            {item.description && (
                              <p className="text-xs text-slate-400 line-clamp-3">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="border-t border-slate-800 bg-slate-900/80 px-4 py-3 flex items-center justify-between text-xs">
                            <div className="font-semibold text-emerald-300">
                              {item.currency || 'INR'} {Number(item.price || 0).toFixed(2)}
                            </div>
                            <div>
                              {item.availability ? (
                                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300 border border-emerald-500/40">
                                  Available
                                </span>
                              ) : (
                                <span className="rounded-full bg-slate-700/60 px-2 py-0.5 text-slate-300 border border-slate-600">
                                  Unavailable
                                </span>
                              )}
                            </div>
                          </div>
                        </article>
                      ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/90 text-xs text-slate-500 mt-4">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>Powered by Epicuria</p>
          <p className="text-[11px]">Menu data fetched from /v1/restaurant/menu</p>
        </div>
      </footer>
    </div>
  );
};

export default App;