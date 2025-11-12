import { Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-gradient-to-tr from-emerald-500 to-cyan-500" />
            <span className="font-bold text-gray-800">FitPlan</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" className={({isActive}) => `hover:text-emerald-600 ${isActive ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}>Dashboard</NavLink>
            <NavLink to="/workouts" className={({isActive}) => `hover:text-emerald-600 ${isActive ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}>Workouts</NavLink>
            <NavLink to="/meal-planner" className={({isActive}) => `hover:text-emerald-600 ${isActive ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}>Meals</NavLink>
            <NavLink to="/progress" className={({isActive}) => `hover:text-emerald-600 ${isActive ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}>Progress</NavLink>
          </nav>

          <button className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border text-gray-700">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
