import React from 'react';
import { AlertCircle, Clock, FileText, ArrowRight } from 'lucide-react';

export function PenaltiSaya() {
  // Fungsi hitung poin telat per hari dari jam deadline
  const hitungPenalti = (deadlineString, submitString) => {
    const deadline = new Date(deadlineString);
    const submit = new Date(submitString);
    
    // Jika tidak telat
    if (submit <= deadline) return { lateTime: '-', points: 0 };

    // Selisih waktu dalam milidetik
    const diffMs = submit - deadline;
    
    // Konversi ke hari (1 hari = 24 jam)
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    
    // Poin nambah 1 setiap berganti hari dari jam deadline (dibulatkan ke atas)
    // Contoh: telat 1 menit = 1 poin. Telat 24 jam 1 menit = 2 poin.
    const points = Math.floor(diffDays) + 1;

    // Format keterlambatan untuk tampilan UI
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    
    let lateText = '';
    if (days > 0) lateText += `${days} Hari `;
    if (hours > 0 || days === 0) lateText += `${hours} Jam`;
    if (days === 0 && hours === 0) lateText = '< 1 Jam';

    return { lateTime: lateText, points };
  };

  // Mock data disimulasikan dengan tanggal
  const lateDocumentsRaw = [
    { id: 'JB-2025-00128', name: 'Budi Santoso', type: 'KTP-el', deadline: '2026-05-15T08:00:00', submit: '2026-05-15T09:30:00' }, // Telat hari H (1 poin)
    { id: 'JB-2025-00145', name: 'Ani Yudhoyono', type: 'Kartu Keluarga', deadline: '2026-05-14T08:00:00', submit: '2026-05-15T10:00:00' }, // Telat lusa (2 poin)
    { id: 'JB-2025-00162', name: 'Cahyo Kumolo', type: 'Akta Kelahiran', deadline: '2026-05-10T15:00:00', submit: '2026-05-15T16:00:00' }, // Telat 5 hari (6 poin)
    { id: 'JB-2025-00188', name: 'Dewi Sartika', type: 'KTP-el', deadline: '2026-05-16T08:00:00', submit: '2026-05-16T08:15:00' }, // Telat 15 menit (1 poin)
  ];

  // Mapping data untuk memasukkan hasil perhitungan
  const lateDocuments = lateDocumentsRaw.map(doc => {
    const { lateTime, points } = hitungPenalti(doc.deadline, doc.submit);
    return { ...doc, lateTime, points };
  });

  const totalPoints = lateDocuments.reduce((acc, curr) => acc + curr.points, 0);
  const totalDocs = lateDocuments.length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans">
      
      {/* Page Header Area */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100 text-red-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Laporan Penalti Kinerja</h1>
            <p className="text-xs text-gray-500 mt-1">Pantau performa layanan dan poin pelanggaran SLA Anda.</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-800">Bulan Ini</div>
          <div className="text-xs text-gray-500">Mei 2026</div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <FileText className="w-16 h-16" />
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">Total Berkas Telat</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-4xl font-black text-gray-800">{totalDocs}</h2>
            <span className="text-sm font-medium text-gray-500 mb-1">Berkas</span>
          </div>
          <p className="text-xs text-red-500 font-medium mt-3 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> Melewati batas SLA
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <AlertCircle className="w-16 h-16" />
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">Total Poin Penalti</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-4xl font-black text-red-600">{totalPoints}</h2>
            <span className="text-sm font-medium text-red-400 mb-1">Poin</span>
          </div>
          <p className="text-xs text-gray-500 font-medium mt-3">
            Akumulasi poin bulan ini
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 mb-3 shadow-sm">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-red-700">Status Performa: Perlu Evaluasi</h3>
          <p className="text-xs text-red-600/80 mt-1 px-4 leading-relaxed">
            Anda memiliki {totalPoints} poin penalti. Harap tingkatkan kecepatan pemrosesan berkas untuk menghindari teguran.
          </p>
        </div>

      </div>

      {/* Detail Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-base font-bold text-gray-800">Riwayat Keterlambatan Berkas</h2>
            <p className="text-xs text-gray-500 mt-1">Daftar berkas yang diproses melewati batas waktu SLA.</p>
          </div>
          <button className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
            Unduh Laporan
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">No. Registrasi</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Warga</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Layanan</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Keterlambatan</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Poin</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {lateDocuments.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <span className="text-sm font-bold text-blue-600">{doc.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-gray-800">{doc.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-gray-100 text-gray-600">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm font-bold text-red-500">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      Lewat {doc.lateTime}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2 py-1 rounded border border-red-200 bg-red-50 text-xs font-bold text-red-600">
                      +{doc.points} Poin
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors">
                      Detail <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </td>
                </tr>
              ))}
              {lateDocuments.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500 text-sm font-medium">
                    Tidak ada catatan keterlambatan bulan ini. Kerja bagus!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
