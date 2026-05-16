import React from 'react';
import { 
  LayoutDashboard, FilePlus, FileText, MapPin, History, AlertCircle, 
  Search, Bell, Plus, Menu, ChevronRight, ChevronDown, MoreHorizontal,
  Clock, CheckCircle, Clock3, AlertTriangle, Info, LogOut, TrendingUp,
  FileBadge2
} from 'lucide-react';

export function Home() {
  return (
    <div className="flex h-screen bg-[#f4f7fb] font-sans text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#112340] text-white flex flex-col shrink-0 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 border-[30px] border-white/5 rounded-full pointer-events-none"></div>

        {/* Logo Area */}
        <div className="p-6 relative z-10 mb-2 mt-2">
          <h1 className="font-bold text-2xl leading-tight tracking-tight">JejakBerkas</h1>
          <p className="text-[11px] text-gray-400 font-medium tracking-wider mt-0.5">Portal Layanan Publik Nasional</p>
          <FileText className="absolute right-6 top-6 w-12 h-12 text-white/5 pointer-events-none" strokeWidth={1} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 z-10 overflow-y-auto mt-4">
          <a href="#" className="flex items-center px-4 py-3 bg-[#2563eb] rounded-xl text-white font-medium text-sm transition-colors shadow-md">
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-colors">
            <FilePlus className="w-4 h-4 mr-3" />
            Tambah Berkas
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-colors">
            <FileText className="w-4 h-4 mr-3" />
            Daftar Berkas
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-colors">
            <MapPin className="w-4 h-4 mr-3" />
            Tracking Berkas
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-colors">
            <History className="w-4 h-4 mr-3" />
            Riwayat
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-colors mt-2">
            <AlertCircle className="w-4 h-4 mr-3" />
            Penalti Saya
          </a>
        </nav>

        {/* User Profile Card */}
        <div className="p-4 z-10 mt-auto">
          <div className="bg-[#1e3250] rounded-2xl p-4 mb-3 flex items-center space-x-3 shadow-lg border border-white/5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#112340] font-bold shrink-0">
              <UserAvatarIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Siti Nurhaliza</p>
              <p className="text-[11px] text-gray-400 truncate mb-1">Staff Kecamatan</p>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 shadow-[0_0_5px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[10px] text-green-400">Online</span>
              </div>
            </div>
          </div>
          
          <button className="w-full flex items-center px-4 py-2.5 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-10">
          
          {/* Left: Title & Breadcrumb */}
          <div className="flex items-center">
            <button className="mr-6 p-2 rounded-lg hover:bg-gray-50 border border-gray-200 text-gray-600 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#112340]">Dashboard Staff Kecamatan</h2>
              <div className="flex items-center text-xs text-gray-500 mt-1 font-medium">
                <span>Dashboard</span>
                <ChevronRight className="w-3 h-3 mx-1" />
                <span>Staff Kecamatan</span>
              </div>
            </div>
          </div>
          
          {/* Right: Actions */}
          <div className="flex items-center space-x-5">
            
            <div className="flex items-center w-64 bg-[#f8fafc] border border-gray-200 rounded-full px-4 py-2 focus-within:border-blue-400 focus-within:bg-white transition-all shadow-sm">
              <input 
                type="text" 
                placeholder="Cari nomor registrasi / nama warga..." 
                className="bg-transparent border-none outline-none text-xs w-full text-gray-700 placeholder-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 ml-2" />
            </div>
            
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors border border-gray-200 shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center border border-white">5</span>
            </button>
            
            <div className="flex items-center p-1.5 pr-4 border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 font-semibold text-sm">
                SN
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 leading-tight">Siti Nurhaliza</p>
                <p className="text-[10px] text-gray-500 font-medium">Staff Kecamatan</p>
              </div>
              <ChevronDown className="w-4 h-4 ml-3 text-gray-400" />
            </div>
            
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-8">
          
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
      <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
        Lihat Detail
      </button>

      <button className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="w-5 h-5"/>
      </button>
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
      <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
        Lihat Detail
      </button>

      <button className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="w-5 h-5"/>
      </button>
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
      <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
        Lihat Detail
      </button>

      <button className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="w-5 h-5"/>
      </button>
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
      <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
        Lihat Detail
      </button>

      <button className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="w-5 h-5"/>
      </button>
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
      <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
        Lihat Detail
      </button>

      <button className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="w-5 h-5"/>
      </button>
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
          
        </main>
      </div>
    </div>
  );
}

// Helper component for generic user avatar
function UserAvatarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
