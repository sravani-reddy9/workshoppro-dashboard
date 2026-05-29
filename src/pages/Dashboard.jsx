import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

import StatCard from '../components/StatCard'
import useRegistrations from '../hooks/useRegistrations'

export default function Dashboard() {
  const { registrations } = useRegistrations()

  const totalStudents = registrations.length

  const paid = registrations.filter(
    (r) => r.paymentStatus === 'Paid'
  ).length

  const pending = registrations.filter(
    (r) => r.paymentStatus === 'Pending'
  ).length

  const certificates = registrations.filter(
    (r) => r.certificateStatus === 'Generated'
  ).length

  const revenue = registrations
    .filter((r) => r.paymentStatus === 'Paid')
    .reduce((sum, r) => sum + Number(r.amount || 0), 0)

  const workshopMap = registrations.reduce((acc, r) => {
    acc[r.workshopName] =
      (acc[r.workshopName] || 0) + 1

    return acc
  }, {})

  const workshopData = Object.entries(
    workshopMap
  ).map(([name, count]) => ({
    name,
    count,
  }))

  const paymentData = [
    {
      name: 'Paid',
      value: paid,
    },
    {
      name: 'Pending',
      value: pending,
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Dashboard
      </h1>

      <p className="text-slate-500 mb-6">
        Business overview of all college workshop
        registrations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          subtitle="Registered students"
        />

        <StatCard
          title="Paid"
          value={paid}
          subtitle="Payment completed"
        />

        <StatCard
          title="Pending"
          value={pending}
          subtitle="Payment pending"
        />

        <StatCard
          title="Certificates"
          value={certificates}
          subtitle="Generated certificates"
        />

        <StatCard
          title="Revenue"
          value={`₹${revenue}`}
          subtitle="Collected amount"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-semibold mb-4 text-slate-800">
            Registrations by Workshop
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={workshopData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-semibold mb-4 text-slate-800">
            Payment Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {paymentData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === 0
                          ? '#2563eb'
                          : '#ef4444'
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}