import Navbar from '../components/Navbar'
import WorkoutPlanner from '../components/WorkoutPlanner'

export default function Workouts(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navbar />
      <WorkoutPlanner />
    </div>
  )
}
