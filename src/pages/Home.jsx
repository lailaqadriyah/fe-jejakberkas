import React from 'react';
import { 
  FileBadge2, TrendingUp, LayoutDashboard, Clock, AlertTriangle, 
  ChevronRight, ChevronDown, Plus, MoreHorizontal
} from 'lucide-react';

export function Home() {
  return (
    <>
      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="bg-blue-50 p-4 rounded-xl">
              <FileBadge2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Total Berkas Hari Ini</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">28</h3>
              <div className="flex flex-col items-end">
                <TrendingUp className="w-4 h-4 text-blue-600 mb-1" />
                <span className="text-[10px] text-gray-400">Berkas masuk hari ini</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="bg-emerald-50 p-4 rounded-xl">
              <LayoutDashboard className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Sedang Diproses</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">14</h3>
              <div className="flex flex-col items-end">
                <TrendingUp className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[10px] text-gray-400">Berkas dalam proses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="bg-orange-50 p-4 rounded-xl">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Menunggu TTD Camat</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">7</h3>
              <div className="flex flex-col items-end">
                <TrendingUp className="w-4 h-4 text-orange-500 mb-1" />
                <span className="text-[10px] text-gray-400">Menunggu persetujuan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="bg-red-50 p-4 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Terlambat</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">3</h3>
              <div className="flex flex-col items-end">
                <TrendingUp className="w-4 h-4 text-red-600 mb-1" />
                <span className="text-[10px] text-gray-400">Berkas melewati SLA</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Alert Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0 shadow-sm text-white font-bold">
            i
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-bold text-[#112340]">Perhatian!</span> Pastikan setiap berkas diproses sesuai SLA untuk menghindari penalti poin pelanggaran.
          </p>
        </div>
        <button className="flex items-center text-sm font-semibold text-blue-600 bg-white border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
          Lihat Aturan SLA <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        
        {/* Table Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-end">
          <div>
            <h3 className="text-lg font-bold text-[#112340]">Berkas Terbaru</h3>
            <p className="text-xs text-gray-500 mt-1">Daftar berkas yang sedang Anda tangani</p>
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-medium hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm cursor-pointer">
                <option>Semua Status</option>
                <option>Verifikasi Dokumen</option>
                <option>Menunggu TTD Camat</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
            </div>
            <button className="bg-[#112340] hover:bg-[#1e3250] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center shadow-sm transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Berkas Baru
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[13px] font-semibold text-gray-700 bg-white border-b-2 border-gray-100">
              <tr>
                <th className="px-6 py-4">No. Registrasi</th>
                <th className="px-6 py-4">Nama Warga</th>
                <th className="px-6 py-4">Layanan</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">PIC Saat Ini</th>
                <th className="px-6 py-4">SLA</th>
                <th className="px-6 py-4 text-center">Estimasi Selesai</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              
              {/* Row 1 */}
              <tr className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-semibold text-blue-600">JB-2025-00128</td>
                <td className="px-6 py-4 text-gray-800 font-medium">Andi Saputra</td>
                <td className="px-6 py-4 text-gray-600">KTP Hilang</td>
                <td className="px-6 py-4">
                  <span className="flex w-[170px] justify-start text-left px-3 py-1.5 rounded text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                    Verifikasi Dokumen
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">Staff Kecamatan</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-blue-600 font-medium">
                    <Clock className="w-4 h-4 mr-1.5" />
                    1j 20m tersisa
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">14:30</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">Lihat Detail</button>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5"/></button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-semibold text-blue-600">JB-2025-00129</td>
                <td className="px-6 py-4 text-gray-800 font-medium">Siti Aminah</td>
                <td className="px-6 py-4 text-gray-600">Kartu Keluarga Baru</td>
                <td className="px-6 py-4">
                  <span className="flex w-[170px] justify-start text-left px-3 py-1.5 rounded text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-200">
                    Menunggu TTD Camat
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">Camat</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-orange-500 font-medium">
                    <Clock className="w-4 h-4 mr-1.5" />
                    45m tersisa
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">13:55</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">Lihat Detail</button>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5"/></button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-semibold text-blue-600">JB-2025-00130</td>
                <td className="px-6 py-4 text-gray-800 font-medium">Budi Rahman</td>
                <td className="px-6 py-4 text-gray-600">Akta Kelahiran Baru</td>
                <td className="px-6 py-4">
                  <span className="flex w-[170px] justify-start text-left px-3 py-1.5 rounded text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
                    Terlambat
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">Staff Kecamatan</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-red-600 font-bold">
                    <AlertTriangle className="w-4 h-4 mr-1.5" />
                    Lewat 35m
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">12:00</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">Lihat Detail</button>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5"/></button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-semibold text-blue-600">JB-2025-00131</td>
                <td className="px-6 py-4 text-gray-800 font-medium">Dewi Lestari</td>
                <td className="px-6 py-4 text-gray-600">KTP Baru</td>
                <td className="px-6 py-4">
                  <span className="flex w-[170px] justify-start text-left px-3 py-1.5 rounded text-xs font-semibold bg-green-50 text-green-600 border border-green-200">
                    Berkas Diterima
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">Staff Kecamatan</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-blue-600 font-medium">
                    <Clock className="w-4 h-4 mr-1.5" />
                    2j 10m tersisa
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">15:20</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">Lihat Detail</button>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5"/></button>
                  </div>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-semibold text-blue-600">JB-2025-00132</td>
                <td className="px-6 py-4 text-gray-800 font-medium">Rudi Hartono</td>
                <td className="px-6 py-4 text-gray-600">Kartu Keluarga Hilang/Rusak</td>
                <td className="px-6 py-4">
                  <span className="flex w-[170px] justify-start text-left px-3 py-1.5 rounded text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                    Verifikasi Dokumen
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">Staff Kecamatan</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-blue-600 font-medium">
                    <Clock className="w-4 h-4 mr-1.5" />
                    1j 5m tersisa
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">14:15</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">Lihat Detail</button>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5"/></button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">Menampilkan 1 - 5 dari 28 data</span>
          <div className="flex items-center space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#112340] text-white font-medium text-xs">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-medium text-xs transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-medium text-xs transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-medium text-xs transition-colors">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-medium text-xs transition-colors">5</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
