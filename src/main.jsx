import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import Workouts from './pages/Workouts'
import MealPlanner from './pages/MealPlanner'
import Progress from './pages/Progress'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
