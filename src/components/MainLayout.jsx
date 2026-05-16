import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FilePlus, FileText, MapPin, History, AlertCircle, 
  Search, Bell, Menu, ChevronRight, ChevronDown, LogOut
} from 'lucide-react';

// Helper component for generic user avatar
function UserAvatarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

export function MainLayout() {
  const location = useLocation();
  
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
          <Link to="/home" className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-colors ${location.pathname === '/home' ? 'bg-[#2563eb] text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Dashboard
          </Link>
          <Link to="/tambah-berkas" className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-colors ${location.pathname === '/tambah-berkas' ? 'bg-[#2563eb] text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <FilePlus className="w-4 h-4 mr-3" />
            Tambah Berkas
          </Link>
          <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-colors">
            <FileText className="w-4 h-4 mr-3" />
            Daftar Berkas
          </a>
          <Link to="/tracking/JB-2025-00128" className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-colors ${location.pathname.startsWith('/tracking') ? 'bg-[#2563eb] text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <MapPin className="w-4 h-4 mr-3" />
            Tracking Berkas
          </Link>
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
          
          <Link to="/login" className="w-full flex items-center px-4 py-2.5 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-10">
          
          {/* Left: Hamburger (Title & Breadcrumbs will be handled in children or passed down) */}
          <div className="flex items-center">
            <button className="p-2 rounded-lg hover:bg-gray-50 border border-gray-200 text-gray-600 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div id="header-portal" className="ml-6">
              {/* Children can portal their title/breadcrumb here, or we let children render their own top area.
                  For simplicity, let's remove title from layout header and let pages render their own title right below header,
                  OR render it conditionally. The mockup shows the header HAS the title.
                  So we will use a global context or simply pass a prop? Wait, React Router Outlet doesn't pass props easily.
                  We can just move the Title to the top of the page component itself, and just leave the hamburger in the Layout Header!
                  Wait, looking at the mockup, the Search and Profile are on the RIGHT. The Hamburger, Title and Breadcrumb are on the LEFT.
                  Let's just keep Search and Profile in Header, and the Title in the page, OR we can just let each page render its own full header.
                  Let's put the Title/Breadcrumb in the layout and use `useLocation` to determine it.
              */}
              {location.pathname === '/home' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#112340]">Dashboard Staff Kecamatan</h2>
                  <div className="flex items-center text-xs text-gray-500 mt-1 font-medium">
                    <span>Dashboard</span>
                    <ChevronRight className="w-3 h-3 mx-1" />
                    <span>Staff Kecamatan</span>
                  </div>
                </div>
              )}
              {location.pathname === '/tambah-berkas' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#112340]">Tambah Berkas Baru</h2>
                  <div className="flex items-center text-xs text-gray-500 mt-1 font-medium">
                    <span>Dashboard</span>
                    <ChevronRight className="w-3 h-3 mx-1" />
                    <span>Tambah Berkas</span>
                  </div>
                </div>
              )}
              {location.pathname.startsWith('/tracking') && (
                <div>
                  <h2 className="text-2xl font-bold text-[#112340]">Tracking Detail Berkas</h2>
                  <div className="flex items-center text-xs text-gray-500 mt-1 font-medium">
                    <span>Dashboard</span>
                    <ChevronRight className="w-3 h-3 mx-1" />
                    <span>Tracking Berkas</span>
                    <ChevronRight className="w-3 h-3 mx-1" />
                    <span>JB-2025-00128</span>
                  </div>
                </div>
              )}
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}
