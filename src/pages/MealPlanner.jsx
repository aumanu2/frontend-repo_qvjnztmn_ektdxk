import Navbar from '../components/Navbar'
import MealPlannerComp from '../components/MealPlanner'

export default function MealPlanner(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navbar />
      <MealPlannerComp />
    </div>
  )
}
