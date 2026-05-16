import React from 'react';
import { 
  Check, CreditCard, Users, FileText, Upload, Camera, FileCheck
} from 'lucide-react';

export function TambahBerkas() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#112340]">Form Pengajuan Layanan</h2>
          <p className="text-xs text-gray-500 mt-1">Input data pengajuan masyarakat dan mulai tracking berkas.</p>
        </div>
        <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
          Simpan Draft
        </button>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-xs">Pilih<br/>Layanan</p>
          </div>
        </div>
        <div className="h-px bg-gray-200 flex-1 mx-4"></div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            2
          </div>
          <div>
            <p className="font-bold text-gray-800 text-xs">Pilih<br/>Skenario</p>
          </div>
        </div>
        <div className="h-px bg-gray-200 flex-1 mx-4"></div>
        <div className="flex items-center space-x-3 opacity-50">
          <div className="w-8 h-8 rounded-full bg-white border border-gray-300 text-blue-600 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <div>
            <p className="font-bold text-gray-800 text-xs">Data<br/>Pemohon</p>
          </div>
        </div>
        <div className="h-px bg-gray-200 flex-1 mx-4"></div>
        <div className="flex items-center space-x-3 opacity-50">
          <div className="w-8 h-8 rounded-full bg-white border border-gray-300 text-blue-600 flex items-center justify-center font-bold text-xs">
            4
          </div>
          <div>
            <p className="font-bold text-gray-800 text-xs">Checklist<br/>Berkas</p>
          </div>
        </div>
        <div className="h-px bg-gray-200 flex-1 mx-4"></div>
        <div className="flex items-center space-x-3 opacity-50">
          <div className="w-8 h-8 rounded-full bg-white border border-gray-300 text-blue-600 flex items-center justify-center font-bold text-xs">
            5
          </div>
          <div>
            <p className="font-bold text-gray-800 text-xs">Nomor<br/>Registrasi</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column - Form */}
        <div className="flex-1 space-y-6">
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-base font-bold text-gray-800 mb-1">Step 1 — Pilih Jenis Layanan</h3>
            <p className="text-xs text-gray-500 mb-6">Pilih layanan yang diajukan oleh masyarakat.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Selected Card */}
              <div className="border-2 border-blue-500 bg-blue-50 rounded-xl p-5 cursor-pointer relative">
                <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mb-4 shadow-sm border border-blue-100">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">KTP-el</h4>
                <p className="text-[10px] text-gray-500 leading-tight">Perekaman, penggantian, atau cetak ulang KTP elektronik.</p>
              </div>

              {/* Unselected Card 1 */}
              <div className="border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl p-5 cursor-pointer transition-colors">
                <div className="bg-gray-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-gray-100">
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Kartu Keluarga</h4>
                <p className="text-[10px] text-gray-500 leading-tight">Pembuatan, perubahan data, atau cetak ulang KK.</p>
              </div>

              {/* Unselected Card 2 */}
              <div className="border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl p-5 cursor-pointer transition-colors">
                <div className="bg-gray-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-gray-100">
                  <FileText className="w-5 h-5 text-gray-500" />
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Akta Kelahiran</h4>
                <p className="text-[10px] text-gray-500 leading-tight">Penerbitan akta baru, terlambat, atau duplikat.</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-base font-bold text-gray-800 mb-1">Step 2 — Pilih Skenario</h3>
            <p className="text-xs text-gray-500 mb-6">Skenario menyesuaikan kebutuhan layanan.</p>
            
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                KTP Baru
              </button>
              <button className="px-5 py-2.5 bg-blue-600 border border-blue-600 rounded-xl text-sm font-semibold text-white shadow-sm shadow-blue-600/20">
                KTP Rusak
              </button>
              <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Perubahan Data
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-base font-bold text-gray-800 mb-1">Step 3 — Data Pemohon</h3>
            <p className="text-xs text-gray-500 mb-6">Lengkapi data masyarakat yang mengajukan layanan.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nama Lengkap</label>
                <input type="text" defaultValue="Andi Saputra" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">NIK</label>
                <input type="text" defaultValue="3276XXXXXXX0001" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nomor KK</label>
                <input type="text" placeholder="Masukkan nomor KK" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nomor HP</label>
                <input type="text" placeholder="Masukkan nomor HP" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Kecamatan</label>
                <input type="text" defaultValue="Kecamatan Sukamaju" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Kelurahan/Desa</label>
                <input type="text" defaultValue="Kelurahan Melati" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-2">Alamat</label>
                <textarea rows="3" placeholder="Masukkan alamat lengkap" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"></textarea>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-2">Catatan Staff</label>
                <textarea rows="3" placeholder="Tambahkan catatan jika diperlukan" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-base font-bold text-gray-800 mb-1">Step 4 — Checklist Berkas</h3>
            <p className="text-xs text-gray-500 mb-6">Pastikan semua dokumen fisik sudah lengkap sebelum tracking dimulai.</p>
            
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-blue-200 bg-blue-50 rounded-xl cursor-pointer">
                <div className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center mr-3 shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-semibold text-gray-800">Fotokopi Kartu Keluarga</span>
              </label>
              <label className="flex items-center p-4 border border-blue-200 bg-blue-50 rounded-xl cursor-pointer">
                <div className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center mr-3 shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-semibold text-gray-800">Surat Hilang Polisi</span>
              </label>
              <label className="flex items-center p-4 border border-gray-200 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                <div className="w-5 h-5 rounded border-2 border-gray-300 mr-3 shrink-0"></div>
                <span className="text-sm font-medium text-gray-600">Foto tambahan jika diperlukan</span>
              </label>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4">
            <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
              Kembali
            </button>
            <div className="flex space-x-3">
              <button className="px-6 py-3 bg-white border border-blue-200 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm">
                Salin Nomor Registrasi
              </button>
              <button className="px-6 py-3 bg-white border border-blue-200 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm">
                Cetak Bukti Registrasi
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
                Mulai Tracking
              </button>
            </div>
          </div>

        </div>

        {/* Right Column - Summary */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          
          <div className="bg-[#f8fafc] rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#112340] mb-6">Ringkasan Pengajuan</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-500">Layanan</span>
                <span className="font-bold text-gray-800">KTP-el</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-500">Skenario</span>
                <span className="font-bold text-gray-800">KTP Hilang</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-500">Nama</span>
                <span className="font-bold text-gray-800">Andi Saputra</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-500">PIC Awal</span>
                <span className="font-bold text-gray-800">Staff Kecamatan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status Awal</span>
                <span className="font-bold text-gray-800">Berkas Diterima</span>
              </div>
            </div>
          </div>

          <div className="bg-[#112340] rounded-2xl shadow-xl shadow-[#112340]/10 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
            
            <h3 className="text-xs font-medium text-blue-200 mb-2">Step 5 — Nomor Registrasi</h3>
            <p className="text-2xl font-extrabold tracking-tight mb-8">JB-2025-00128</p>
            
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-gray-300">Estimasi Kecamatan</span>
                <span className="font-medium text-white">30 Menit</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-gray-300">Estimasi Dinas</span>
                <span className="font-medium text-white">2 Jam</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Status Awal</span>
                <span className="font-medium text-white">Berkas Diterima</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
