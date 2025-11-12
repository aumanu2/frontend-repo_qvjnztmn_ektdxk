export default function Hero(){
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Fitness & Workout Planner</h1>
          <p className="mt-4 text-lg text-gray-600">Plan workouts, track meals, and visualize your progress. All offline in your browser with local storage.</p>
          <div className="mt-6 flex gap-3">
            <a href="#create" className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-3 text-white font-semibold shadow hover:bg-emerald-700">Create Plan</a>
            <a href="#learn" className="inline-flex items-center rounded-md border px-5 py-3 text-gray-800 font-semibold hover:bg-gray-50">Learn More</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video w-full rounded-xl border bg-white/70 p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({length:6}).map((_,i)=> (
                <div key={i} className="h-20 rounded-md bg-gradient-to-br from-emerald-200 to-cyan-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
