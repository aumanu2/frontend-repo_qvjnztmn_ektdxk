import { useLocalStorage } from './useLocalStorage'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

export default function ProgressTracker(){
  const [entries, setEntries] = useLocalStorage('fitplan_progress', [])
  const [weight, setWeight] = useState('')
  const [note, setNote] = useState('')

  const addEntry = () => {
    if(!weight) return
    const e = { id: crypto.randomUUID(), date: new Date().toISOString().slice(0,10), weight: parseFloat(weight), note }
    setEntries([ ...entries, e ])
    setWeight('')
    setNote('')
  }
  const deleteEntry = (id) => setEntries(entries.filter(e=>e.id!==id))

  const labels = entries.map(e => e.date)
  const data = {
    labels,
    datasets: [
      {
        label: 'Weight (kg)',
        data: entries.map(e => e.weight),
        borderColor: 'rgb(16 185 129)',
        backgroundColor: 'rgba(16,185,129,0.15)',
        tension: 0.35,
        fill: true,
      }
    ]
  }
  const options = { responsive: true, plugins: { legend: { display: true } } }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-bold">Progress Tracker</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-4 bg-white/70">
          <div className="grid gap-2">
            <input value={weight} onChange={e=>setWeight(e.target.value)} placeholder="Weight (kg)" className="rounded-md border px-3 py-2" />
            <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Note (optional)" className="rounded-md border px-3 py-2" />
            <button onClick={addEntry} className="rounded-md bg-emerald-600 px-4 py-2 text-white font-semibold hover:bg-emerald-700">Add Entry</button>
          </div>

          <ul className="mt-4 space-y-2">
            {entries.map(e => (
              <li key={e.id} className="flex items-center justify-between rounded-md border px-3 py-2 bg-white">
                <div className="text-sm">
                  <div className="font-medium">{e.date}</div>
                  <div className="text-gray-600">{e.weight} kg {e.note && `· ${e.note}`}</div>
                </div>
                <button onClick={()=>deleteEntry(e.id)} className="text-gray-500 hover:text-red-600">Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border p-4 bg-white">
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  )
}
