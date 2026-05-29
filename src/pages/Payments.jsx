import useRegistrations from '../hooks/useRegistrations'

export default function Payments() {
  const { registrations } = useRegistrations()
  const paidAmount = registrations.filter(r => r.paymentStatus === 'Paid').reduce((sum, r) => sum + Number(r.amount || 0), 0)
  const pendingAmount = registrations.filter(r => r.paymentStatus === 'Pending').reduce((sum, r) => sum + Number(r.amount || 0), 0)

  return (
    <div>
      <h1 className="text-2xl font-bold">Payments</h1>
      <p className="text-slate-500 mb-6">Track paid and pending workshop payments.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-slate-500">Collected Amount</p>
          <h2 className="text-3xl font-bold">₹{paidAmount}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-slate-500">Pending Amount</p>
          <h2 className="text-3xl font-bold">₹{pendingAmount}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Workshop</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(r => (
              <tr key={r._id} className="border-t">
                <td className="p-4">{r.studentName}</td>
                <td className="p-4">{r.workshopName}</td>
                <td className="p-4">₹{r.amount}</td>
                <td className="p-4">{r.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
