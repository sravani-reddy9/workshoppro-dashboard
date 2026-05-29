import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

const initial = {
  studentName: '',
  email: '',
  phone: '',
  collegeName: '',
  workshopName: 'IoT with ESP32',
  workshopDate: '',
  paymentStatus: 'Pending',
  amount: 799,
  trainerName: 'Not Assigned',
  certificateStatus: 'Not Generated',
}

export default function AddRegistration() {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function submit(e) {
    e.preventDefault()
    setSaving(true)

    try {
      await api.post('/registrations', form)
      alert('Registration saved to MongoDB successfully')
      navigate('/app/registrations')
    } catch (error) {
      console.error(error)
      alert('Failed to save registration')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">Add Workshop Registration</h1>
      <p className="text-slate-500 mb-6">Add student and workshop details.</p>

      <form
        onSubmit={submit}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          required
          name="studentName"
          placeholder="Student Name"
          className="border rounded-xl px-4 py-3"
          value={form.studentName}
          onChange={change}
        />

        <input
          required
          name="email"
          placeholder="Email"
          className="border rounded-xl px-4 py-3"
          value={form.email}
          onChange={change}
        />

        <input
          required
          name="phone"
          placeholder="Phone"
          className="border rounded-xl px-4 py-3"
          value={form.phone}
          onChange={change}
        />

        <input
          required
          name="collegeName"
          placeholder="College Name"
          className="border rounded-xl px-4 py-3"
          value={form.collegeName}
          onChange={change}
        />

        <select
          name="workshopName"
          className="border rounded-xl px-4 py-3"
          value={form.workshopName}
          onChange={change}
        >
          <option>IoT with ESP32</option>
          <option>Embedded Systems</option>
          <option>PCB Design Basics</option>
          <option>Robotics Workshop</option>
          <option>Smart Home Automation</option>
        </select>

        <input
          required
          type="date"
          name="workshopDate"
          className="border rounded-xl px-4 py-3"
          value={form.workshopDate}
          onChange={change}
        />

        <select
          name="paymentStatus"
          className="border rounded-xl px-4 py-3"
          value={form.paymentStatus}
          onChange={change}
        >
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          className="border rounded-xl px-4 py-3"
          value={form.amount}
          onChange={change}
        />

        <input
          name="trainerName"
          placeholder="Trainer Name"
          className="border rounded-xl px-4 py-3"
          value={form.trainerName}
          onChange={change}
        />

        <select
          name="certificateStatus"
          className="border rounded-xl px-4 py-3"
          value={form.certificateStatus}
          onChange={change}
        >
          <option>Not Generated</option>
          <option>Generated</option>
        </select>

        <button
          disabled={saving}
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Registration'}
        </button>
      </form>
    </div>
  )
}