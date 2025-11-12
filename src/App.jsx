import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorkoutPlanner from './components/WorkoutPlanner'
import MealPlanner from './components/MealPlanner'
import ProgressTracker from './components/ProgressTracker'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navbar />
      <Hero />

      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-12" id="learn">
        <div className="rounded-xl border bg-white/70 p-6">
          <h3 className="text-xl font-semibold">How it works</h3>
          <p className="mt-2 text-gray-600">Plan your workouts and meals and track your progress — all stored locally in your browser so it works offline and requires no sign-in.</p>
          <ul className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
            <li className="rounded-lg border p-4 bg-white">Create detailed workout plans for each day with sets and reps.</li>
            <li className="rounded-lg border p-4 bg-white">Build meal plans and calculate total calories automatically.</li>
            <li className="rounded-lg border p-4 bg-white">Log your weight and notes, and visualize trends over time.</li>
          </ul>
        </div>
      </div>

      <WorkoutPlanner />
      <MealPlanner />
      <ProgressTracker />
    </div>
  )
}

export default App
