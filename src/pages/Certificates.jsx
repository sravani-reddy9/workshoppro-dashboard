import jsPDF from 'jspdf'
import useRegistrations from '../hooks/useRegistrations'

export default function Certificates() {
  const { registrations } = useRegistrations()

  function generateCertificate(r) {
    const doc = new jsPDF('landscape')
    doc.setFontSize(28)
    doc.text('Certificate of Completion', 90, 50)
    doc.setFontSize(16)
    doc.text('This certificate is proudly presented to', 105, 80)
    doc.setFontSize(24)
    doc.text(r.studentName, 120, 105)
    doc.setFontSize(15)
    doc.text(`For successfully completing the ${r.workshopName} workshop`, 80, 130)
    doc.text(`College: ${r.collegeName}`, 110, 150)
    doc.text(`Date: ${r.workshopDate}`, 120, 170)
    doc.setFontSize(12)
    doc.text('WorkshopPro - IoT Training Management System', 105, 195)
    doc.save(`${r.studentName}-certificate.pdf`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Certificates</h1>
      <p className="text-slate-500 mb-6">Generate student completion certificates as PDF.</p>

      <div className="bg-white rounded-2xl border overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Workshop</th>
              <th className="p-4 text-left">Certificate Status</th>
              <th className="p-4 text-left">Generate</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(r => (
              <tr key={r._id} className="border-t">
                <td className="p-4">{r.studentName}</td>
                <td className="p-4">{r.workshopName}</td>
                <td className="p-4">{r.certificateStatus}</td>
                <td className="p-4">
                  <button onClick={() => generateCertificate(r)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Generate PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
