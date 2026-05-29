import useRegistrations from '../hooks/useRegistrations'

export default function Trainers() {
  const { registrations } = useRegistrations()

  return (
    <div>
      <h1 className="text-2xl font-bold">Trainer Allocation</h1>
      <p className="text-slate-500 mb-6">Check which trainer is assigned to each workshop.</p>

      <div className="bg-white rounded-2xl border overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Workshop</th>
              <th className="p-4 text-left">Trainer</th>
              <th className="p-4 text-left">College</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(r => (
              <tr key={r._id} className="border-t">
                <td className="p-4">{r.workshopName}</td>
                <td className="p-4">{r.trainerName}</td>
                <td className="p-4">{r.collegeName}</td>
                <td className="p-4">{r.workshopDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
