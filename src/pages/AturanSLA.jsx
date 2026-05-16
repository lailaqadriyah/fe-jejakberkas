import React from 'react';
import { ShieldCheck, Clock, AlertCircle, Info, ChevronRight } from 'lucide-react';

export function AturanSLA() {
  const slaRules = [
    { service: 'KTP-el (Baru/Perekaman)', time: '24 Jam', penalty: '1 Poin / Hari Keterlambatan', dept: 'Kecamatan & Dinas' },
    { service: 'KTP-el (Rusak/Hilang)', time: '12 Jam', penalty: '1 Poin / Hari Keterlambatan', dept: 'Kecamatan & Dinas' },
    { service: 'Kartu Keluarga (Baru)', time: '48 Jam', penalty: '2 Poin / Hari Keterlambatan', dept: 'Kecamatan & Dinas' },
    { service: 'Kartu Keluarga (Perubahan Data)', time: '24 Jam', penalty: '1 Poin / Hari Keterlambatan', dept: 'Kecamatan & Dinas' },
    { service: 'Akta Kelahiran (Baru)', time: '48 Jam', penalty: '2 Poin / Hari Keterlambatan', dept: 'Kecamatan & Dinas' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#112340] to-[#1e3a5f] rounded-2xl p-8 shadow-md text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/90 border border-white/20 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              SOP Pelayanan Publik
            </div>
            <h1 className="text-3xl font-bold mb-2">Aturan Service Level Agreement (SLA)</h1>
            <p className="text-white/80 max-w-2xl text-sm leading-relaxed">
              Dokumen ini menguraikan batas waktu standar pemrosesan berkas kependudukan 
              dan sanksi keterlambatan yang berlaku untuk seluruh staf demi menjaga kualitas pelayanan.
            </p>
          </div>
          <div className="hidden md:block opacity-20">
            <Clock className="w-24 h-24" />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <h3 className="text-sm font-bold text-blue-900">Pentingnya Mematuhi SLA</h3>
          <p className="text-xs text-blue-800 mt-1 leading-relaxed">
            SLA (Service Level Agreement) adalah komitmen waktu layanan yang diberikan kepada masyarakat. 
            Pelanggaran batas waktu SLA akan berdampak pada <strong>akumulasi poin penalti</strong> yang dapat memengaruhi 
            evaluasi kinerja bulanan unit kerja dan individu.
          </p>
        </div>
      </div>

      {/* SLA Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Standar Waktu Pemrosesan</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Jenis Layanan</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Batas Waktu (SLA)</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Sanksi Keterlambatan</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Unit Terlibat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {slaRules.map((rule, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-sm font-bold text-gray-800">{rule.service}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm font-bold text-blue-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {rule.time}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm font-semibold text-red-500">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {rule.penalty}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-gray-100 text-gray-600">
                      {rule.dept}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-100 pb-3">Sistem Perhitungan Penalti</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
              <span>Waktu dihitung mulai dari berkas diterima (tervalidasi) hingga proses selesai di setiap tahapan.</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
              <span>Jika melewati batas waktu, poin penalti akan bertambah setiap kelipatan 24 jam keterlambatan.</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
              <span>Poin akan diakumulasikan dan dievaluasi setiap akhir bulan oleh Bidang Organisasi.</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-100 pb-3">Konsekuensi Poin</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs font-bold mr-3 shrink-0">1</span>
              <span><strong>Teguran Lisan:</strong> Akumulasi lebih dari 10 Poin dalam satu bulan.</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 shrink-0">2</span>
              <span><strong>Surat Peringatan (SP):</strong> Akumulasi lebih dari 25 Poin dalam satu bulan.</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 shrink-0">3</span>
              <span><strong>Evaluasi Jabatan:</strong> SP 3 berturut-turut atau lebih dari 50 poin.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
