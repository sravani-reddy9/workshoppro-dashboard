export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
      <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
    </div>
  )
}
