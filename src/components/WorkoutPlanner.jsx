import { useState } from 'react'
import { Plus, Trash2, Dumbbell } from 'lucide-react'
import { useLocalStorage } from './useLocalStorage'

const defaultExercises = [
  'Push Ups','Squats','Lunges','Plank','Crunches','Burpees','Bench Press','Deadlift','Pull Ups','Bicep Curls'
]

function DayPlan({ day, plan, onChange, onRemove }){
  const [exercise, setExercise] = useState('')
  const [reps, setReps] = useState('10')
  const [sets, setSets] = useState('3')

  const addItem = () => {
    if(!exercise) return
    const next = [...(plan.items||[]), { id: crypto.randomUUID(), exercise, reps, sets }]
    onChange({ ...plan, items: next })
    setExercise('')
  }

  const removeItem = (id) => {
    const next = (plan.items||[]).filter(i => i.id !== id)
    onChange({ ...plan, items: next })
  }

  return (
    <div className="rounded-lg border p-4 bg-white/70">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{day}</h4>
        <button onClick={onRemove} className="text-red-600 hover:text-red-700"><Trash2 size={18} /></button>
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input list="exercises" value={exercise} onChange={e=>setExercise(e.target.value)} placeholder="Exercise" className="rounded-md border px-3 py-2" />
        <input value={reps} onChange={e=>setReps(e.target.value)} placeholder="Reps" className="rounded-md border px-3 py-2" />
        <input value={sets} onChange={e=>setSets(e.target.value)} placeholder="Sets" className="rounded-md border px-3 py-2" />
        <button onClick={addItem} className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-white font-semibold hover:bg-emerald-700"><Plus size={16}/> Add</button>
      </div>

      <datalist id="exercises">
        {defaultExercises.map(e => <option key={e} value={e} />)}
      </datalist>

      <ul className="mt-4 space-y-2">
        {(plan.items||[]).map(item => (
          <li key={item.id} className="flex items-center justify-between rounded-md border px-3 py-2 bg-white">
            <div className="flex items-center gap-3">
              <Dumbbell size={18} className="text-emerald-600" />
              <span className="font-medium">{item.exercise}</span>
              <span className="text-sm text-gray-500">{item.sets} sets x {item.reps} reps</span>
            </div>
            <button onClick={()=>removeItem(item.id)} className="text-gray-500 hover:text-red-600"><Trash2 size={18}/></button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function WorkoutPlanner(){
  const [plans, setPlans] = useLocalStorage('fitplan_workouts', [])
  const [title, setTitle] = useState('My Plan')
  const [days, setDays] = useState([
    { id: crypto.randomUUID(), day: 'Monday', items: [] },
  ])

  const addDay = () => setDays(d => [...d, { id: crypto.randomUUID(), day: `Day ${d.length+1}`, items: [] }])
  const removeDay = (id) => setDays(d => d.filter(x => x.id !== id))

  const savePlan = () => {
    const plan = { id: crypto.randomUUID(), title, days, createdAt: new Date().toISOString() }
    setPlans([plan, ...plans])
  }

  const deletePlan = (id) => setPlans(plans.filter(p=>p.id!==id))

  const updateDay = (id, next) => setDays(days.map(d => d.id===id ? next : d))

  return (
    <section id="create" className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Create Workout Plan</h2>
        <button onClick={savePlan} className="rounded-md bg-emerald-600 px-4 py-2 text-white font-semibold hover:bg-emerald-700">Save Plan</button>
      </div>

      <div className="mt-4 grid gap-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} className="rounded-md border px-3 py-2" placeholder="Plan Title" />

        <div className="grid md:grid-cols-2 gap-4">
          {days.map(d => (
            <DayPlan key={d.id} day={d.day} plan={d} onChange={next=>updateDay(d.id, next)} onRemove={()=>removeDay(d.id)} />
          ))}
          <button onClick={addDay} className="rounded-md border px-4 py-3 text-gray-700 hover:bg-gray-50 inline-flex items-center justify-center gap-2"><Plus size={16}/> Add Day</button>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold">Saved Plans</h3>
        <div className="mt-3 grid md:grid-cols-2 gap-4">
          {plans.length === 0 && (
            <p className="text-gray-600">No saved plans yet.</p>
          )}
          {plans.map(p => (
            <div key={p.id} className="rounded-lg border p-4 bg-white/70">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={()=>deletePlan(p.id)} className="text-red-600 hover:text-red-700"><Trash2 size={18}/></button>
              </div>
              <ul className="mt-3 space-y-2">
                {p.days.map((d,i) => (
                  <li key={i} className="text-sm text-gray-700">
                    <span className="font-medium">{d.day}:</span> {(d.items||[]).length} items
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
