import Navbar from '../components/Navbar'
import ProgressTracker from '../components/ProgressTracker'

export default function Progress(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navbar />
      <ProgressTracker />
    </div>
  )
}
