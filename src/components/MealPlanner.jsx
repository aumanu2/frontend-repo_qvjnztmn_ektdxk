import { useState } from 'react'
import { Plus, Trash2, Apple } from 'lucide-react'
import { useLocalStorage } from './useLocalStorage'

const mealTypes = ['Breakfast','Lunch','Dinner','Snack']

function Meal({ meal, onChange, onRemove }){
  return (
    <div className="rounded-lg border p-4 bg-white">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{meal.type}</h4>
        <button onClick={onRemove} className="text-red-600 hover:text-red-700"><Trash2 size={18}/></button>
      </div>
      <input value={meal.name} onChange={e=>onChange({...meal, name:e.target.value})} placeholder="Meal name" className="mt-3 w-full rounded-md border px-3 py-2" />
      <input value={meal.calories} onChange={e=>onChange({...meal, calories:e.target.value})} placeholder="Calories" className="mt-2 w-full rounded-md border px-3 py-2" />
    </div>
  )
}

export default function MealPlanner(){
  const [plans, setPlans] = useLocalStorage('fitplan_meals', [])
  const [title, setTitle] = useState('Meal Plan')
  const [meals, setMeals] = useState([
    { id: crypto.randomUUID(), type: 'Breakfast', name: '', calories: '' },
  ])

  const addMeal = () => setMeals(m => [...m, { id: crypto.randomUUID(), type: mealTypes[m.length % mealTypes.length], name:'', calories:'' }])
  const removeMeal = (id) => setMeals(m => m.filter(x => x.id !== id))
  const updateMeal = (id, next) => setMeals(meals.map(m => m.id===id ? next : m))

  const totalCals = meals.reduce((sum, m)=> sum + (parseInt(m.calories||0) || 0), 0)

  const savePlan = () => {
    const plan = { id: crypto.randomUUID(), title, meals, totalCals, createdAt: new Date().toISOString() }
    setPlans([plan, ...plans])
  }
  const deletePlan = (id) => setPlans(plans.filter(p=>p.id!==id))

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Meal Planner</h2>
        <button onClick={savePlan} className="rounded-md bg-emerald-600 px-4 py-2 text-white font-semibold hover:bg-emerald-700">Save Meal Plan</button>
      </div>

      <div className="mt-4 grid gap-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} className="rounded-md border px-3 py-2" placeholder="Plan Title" />

        <div className="grid md:grid-cols-2 gap-4">
          {meals.map(m => (
            <div key={m.id} className="space-y-2">
              <select value={m.type} onChange={e=>updateMeal(m.id, {...m, type:e.target.value})} className="rounded-md border px-3 py-2 w-full">
                {mealTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <Meal meal={m} onChange={next=>updateMeal(m.id, next)} onRemove={()=>removeMeal(m.id)} />
            </div>
          ))}
          <button onClick={addMeal} className="rounded-md border px-4 py-3 text-gray-700 hover:bg-gray-50 inline-flex items-center justify-center gap-2"><Plus size={16}/> Add Meal</button>
        </div>
      </div>

      <div className="mt-6 text-right text-sm text-gray-600">Total Calories: <span className="font-semibold">{totalCals}</span></div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold">Saved Meal Plans</h3>
        <div className="mt-3 grid md:grid-cols-2 gap-4">
          {plans.length === 0 && <p className="text-gray-600">No saved meal plans.</p>}
          {plans.map(p => (
            <div key={p.id} className="rounded-lg border p-4 bg-white/70">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={()=>deletePlan(p.id)} className="text-red-600 hover:text-red-700"><Trash2 size={18}/></button>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {p.meals.map((m,i)=>(
                  <li key={i}><span className="font-medium">{m.type}:</span> {m.name||'—'} ({m.calories||0} kcal)</li>
                ))}
              </ul>
              <div className="mt-2 text-right text-sm">Total: <span className="font-semibold">{p.totalCals}</span> kcal</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
