import { useState } from 'react'
import { api } from '../api'
import useRegistrations from '../hooks/useRegistrations'

export default function Registrations() {
  const { registrations, setRegistrations, loading } = useRegistrations()
  const [search, setSearch] = useState('')

  const filtered = registrations.filter(r =>
    `${r.studentName} ${r.collegeName} ${r.workshopName}`.toLowerCase().includes(search.toLowerCase())
  )

  async function deleteRegistration(id) {
    if (!confirm('Delete this registration?')) return
    try {
      await api.delete(`/registrations/${id}`)
    } catch {}
    const updated = registrations.filter(r => r._id !== id)
    setRegistrations(updated)
    localStorage.setItem('workshoppro_registrations', JSON.stringify(updated))
  }

  function updateStatus(id, field, value) {
    const updated = registrations.map(r => r._id === id ? { ...r, [field]: value } : r)
    setRegistrations(updated)
    localStorage.setItem('workshoppro_registrations', JSON.stringify(updated))
    api.put(`/registrations/${id}`, updated.find(r => r._id === id)).catch(() => {})
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold">Workshop Registrations</h1>
          <p className="text-slate-500">Track students, colleges, workshops, and status.</p>
        </div>
        <input
          className="border rounded-xl px-4 py-3 w-full md:w-80"
          placeholder="Search student, college, workshop..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">College</th>
              <th className="p-4 text-left">Workshop</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Trainer</th>
              <th className="p-4 text-left">Certificate</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r._id} className="border-t">
                <td className="p-4">
                  <div className="font-semibold">{r.studentName}</div>
                  <div className="text-slate-500">{r.email}</div>
                </td>
                <td className="p-4">{r.collegeName}</td>
                <td className="p-4">{r.workshopName}</td>
                <td className="p-4">
                  <select className="border rounded-lg px-2 py-1" value={r.paymentStatus} onChange={e => updateStatus(r._id, 'paymentStatus', e.target.value)}>
                    <option>Paid</option>
                    <option>Pending</option>
                  </select>
                </td>
                <td className="p-4">
                  <input className="border rounded-lg px-2 py-1 w-36" value={r.trainerName} onChange={e => updateStatus(r._id, 'trainerName', e.target.value)} />
                </td>
                <td className="p-4">
                  <select className="border rounded-lg px-2 py-1" value={r.certificateStatus} onChange={e => updateStatus(r._id, 'certificateStatus', e.target.value)}>
                    <option>Generated</option>
                    <option>Not Generated</option>
                  </select>
                </td>
                <td className="p-4">
                  <button onClick={() => deleteRegistration(r._id)} className="text-red-600 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
