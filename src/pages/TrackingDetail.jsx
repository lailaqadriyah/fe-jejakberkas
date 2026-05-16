import React from 'react';
import { 
  Check
} from 'lucide-react';

export function TrackingDetail() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#112340]">JB-2025-00128</h2>
            <p className="text-xs text-gray-500 mt-1">Detail tracking pengajuan layanan masyarakat</p>
          </div>
          <button className="px-4 py-2 border border-blue-200 text-blue-600 rounded-xl text-xs font-bold bg-white">
            Verifikasi Dokumen
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">Nama Warga</p>
            <p className="text-sm font-bold text-gray-800">Andi Saputra</p>
          </div>
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">Layanan</p>
            <p className="text-sm font-bold text-gray-800">KTP Rusak</p>
          </div>
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">PIC Saat Ini</p>
            <p className="text-sm font-bold text-gray-800">Staff Kecamatan</p>
          </div>
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">Estimasi Selesai</p>
            <p className="text-sm font-bold text-gray-800">14:30</p>
          </div>
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">SLA</p>
            <p className="text-sm font-bold text-blue-600">1 jam 20 menit tersisa</p>
          </div>
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">Status Saat Ini</p>
            <p className="text-sm font-bold text-gray-800">Verifikasi Dokumen</p>
          </div>
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">Nomor HP</p>
            <p className="text-sm font-bold text-gray-800">0812-XXXX-7788</p>
          </div>
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">Kecamatan</p>
            <p className="text-sm font-bold text-gray-800">Kuranji</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          
          {/* Status Utama */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#112340] mb-1">Status Utama</h3>
            <p className="text-xs text-gray-500 mb-6">Ringkasan posisi berkas dan risiko penalti.</p>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 mb-1">Status</p>
                <p className="text-xs font-bold text-gray-800">Verifikasi Dokumen</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 mb-1">Progress</p>
                <p className="text-xs font-bold text-gray-800">2 dari 11 tahap</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 mb-1">PIC</p>
                <p className="text-xs font-bold text-gray-800">Staff Kecamatan</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 mb-1">Penalty Risk</p>
                <p className="text-xs font-bold text-green-500">Aman</p>
              </div>
            </div>

            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[18%] rounded-full"></div>
            </div>
          </div>

          {/* Timeline Progress */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-sm font-bold text-[#112340] mb-1">Timeline Progress</h3>
            <p className="text-xs text-gray-500 mb-8">Pantau setiap tahapan pelayanan dari kecamatan hingga selesai.</p>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              
              {/* Step 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Check className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Berkas Diterima</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Berkas fisik diterima dan nomor registrasi dibuat.</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-2 py-1 border border-green-200 text-green-600 bg-green-50 rounded-lg text-[10px] font-bold">Completed</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ring-4 ring-blue-50">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border-2 border-blue-100 p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Verifikasi Dokumen</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Staff Kecamatan memeriksa kelengkapan dokumen.</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-2 py-1 border border-blue-200 text-blue-600 bg-blue-50 rounded-lg text-[10px] font-bold">In Progress</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-500 border border-orange-200 font-bold text-sm shadow-sm shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-gray-100 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Menunggu TTD Camat</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Berkas akan diteruskan ke Camat untuk validasi akhir.</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-2 py-1 border border-orange-200 text-orange-500 bg-orange-50 rounded-lg text-[10px] font-bold">Waiting</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-60">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 border border-gray-200 font-bold text-sm shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  4
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-gray-100 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-bold text-gray-600 text-sm">Validasi Kecamatan Selesai</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Surat pengantar telah ditandatangani oleh Camat.</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold">Not Started</span>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-60">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 border border-gray-200 font-bold text-sm shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  5
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-gray-100 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-bold text-gray-600 text-sm">Menunggu Dibawa ke Dinas</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Masyarakat membawa surat pengantar ke Dinas.</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold">Not Started</span>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-60">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 border border-gray-200 font-bold text-sm shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  6
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-gray-100 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-bold text-gray-600 text-sm">Berkas Diterima Dinas</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Staff Dinas mengkonfirmasi berkas diterima.</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold">Not Started</span>
                  </div>
                </div>
              </div>

              {/* More steps truncated for brevity, mock visual pattern */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-60">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 border border-gray-200 font-bold text-sm shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  7
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-gray-100 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-bold text-gray-600 text-sm">Verifikasi Database</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Data diperiksa pada sistem database kependudukan.</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold">Not Started</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-60">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 border border-gray-200 font-bold text-sm shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  11
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-gray-100 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-bold text-gray-600 text-sm">Siap Diambil di Kecamatan</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Dokumen siap diambil oleh masyarakat.</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold">Not Started</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky bottom-6">
            <h3 className="text-sm font-bold text-[#112340] mb-1">Aksi Staff Kecamatan</h3>
            <p className="text-xs text-gray-500 mb-4">Gunakan tombol aksi sesuai kondisi proses berkas saat ini.</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">
                Next Step
              </button>
              <button className="px-6 py-2.5 border border-blue-300 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors bg-white">
                Tambah Catatan
              </button>
              <button className="px-6 py-2.5 border border-red-300 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors bg-white">
                Tandai Bermasalah
              </button>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          
          {/* Activity Log */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#112340] mb-6">Activity Log</h3>
            <div className="space-y-4">
              <div className="flex">
                <span className="text-xs font-bold text-blue-600 w-12 shrink-0">09:00</span>
                <p className="text-xs text-gray-700 leading-tight">Berkas didaftarkan oleh Staff Kecamatan.</p>
              </div>
              <div className="flex">
                <span className="text-xs font-bold text-blue-600 w-12 shrink-0">09:05</span>
                <p className="text-xs text-gray-700 leading-tight">Nomor registrasi JB-2025-00128 dibuat.</p>
              </div>
              <div className="flex">
                <span className="text-xs font-bold text-blue-600 w-12 shrink-0">09:15</span>
                <p className="text-xs text-gray-700 leading-tight">Berkas masuk tahap Verifikasi Dokumen.</p>
              </div>
              <div className="flex">
                <span className="text-xs font-bold text-blue-600 w-12 shrink-0">09:30</span>
                <p className="text-xs text-gray-700 leading-tight">Checklist dokumen lengkap.</p>
              </div>
            </div>
          </div>

          {/* Document Checklist */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#112340] mb-4">Document Checklist</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border border-gray-100 p-3 rounded-xl bg-gray-50/50">
                <span className="text-xs text-gray-700 font-medium">Fotokopi KK</span>
                <span className="text-[10px] font-bold text-green-600">Lengkap</span>
              </div>
              <div className="flex justify-between items-center border border-gray-100 p-3 rounded-xl bg-gray-50/50">
                <span className="text-xs text-gray-700 font-medium">Surat Hilang Polisi</span>
                <span className="text-[10px] font-bold text-green-600">Lengkap</span>
              </div>
              <div className="flex justify-between items-center border border-gray-100 p-3 rounded-xl bg-gray-50/50">
                <span className="text-xs text-gray-700 font-medium">Formulir Permohonan</span>
                <span className="text-[10px] font-bold text-green-600">Lengkap</span>
              </div>
            </div>
          </div>

          {/* Approval History */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#112340] mb-4">Approval History</h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-gray-600">Staff Kecamatan</span>
                <span className="font-bold text-gray-800">Diproses</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-gray-600">Camat</span>
                <span className="font-bold text-gray-400">Belum TTD</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-gray-600">Staff Dinas</span>
                <span className="font-bold text-gray-400">Belum Mulai</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Kepala Dinas</span>
                <span className="font-bold text-gray-400">Belum Mulai</span>
              </div>
            </div>
          </div>

          {/* Catatan SLA */}
          <div className="bg-[#f8fafc] rounded-2xl border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-800 mb-2">Catatan SLA:</h3>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Jika proses verifikasi tidak selesai sebelum estimasi, penalti akan diberikan kepada Staff Kecamatan. Jika sudah masuk tahap TTD, penalti menjadi tanggung jawab Camat.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
