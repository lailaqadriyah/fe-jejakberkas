import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Mail, Briefcase, MapPin, Shield, Camera, Key, Smartphone } from 'lucide-react';

export function Profil() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Dummy data fallback based on router state or sessionStorage
      const sessionRole = sessionStorage.getItem('mockRole') || "kecamatan";
      const mockRoleRaw = location.state?.mockRole || sessionRole;
      let mockName = location.state?.mockName;

      if (!mockName) {
        if (sessionRole.includes('camat')) mockName = 'Drs. Ahmad Fauzi';
        else if (sessionRole.includes('kepala-dinas')) mockName = 'Dr. Hendra Wijaya';
        else if (sessionRole.includes('dinas')) mockName = 'Rina Pramesti';
        else if (sessionRole.includes('biro')) mockName = 'Maya Anggraini';
        else mockName = 'Siti Nurhaliza';
      }
      
      let mappedRole = "staff_kecamatan";
      let unitKerja = "kuranji";
      let idStaf = "STAFF_KEC_02";

      const lowerRole = mockRoleRaw.toLowerCase();
      if (lowerRole.includes('camat')) {
        mappedRole = "camat";
        idStaf = "CAMAT_01";
      } else if (lowerRole.includes('kepala dinas')) {
        mappedRole = "kepala_dinas";
        unitKerja = "";
        idStaf = "KADIS_01";
      } else if (lowerRole.includes('dinas')) {
        mappedRole = "staff_dinas";
        unitKerja = "";
        idStaf = "STAFF_DIS_05";
      } else if (lowerRole.includes('organisasi')) {
        mappedRole = "bidang_organisasi";
        unitKerja = "";
        idStaf = "ORG_01";
      }

      setUser({
        nama_lengkap: mockName,
        id_staf: idStaf,
        role: mappedRole,
        id_kecamatan: unitKerja,
      });
    }
  }, [location.state]);

  if (!user) return <div className="p-8 text-center text-gray-500">Memuat profil...</div>;

  const formatRole = (role) => {
    if (!role) return '-';
    return role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header Profile Cover */}
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative">
        <div className="h-32 bg-gradient-to-r from-[#112340] to-[#1e3a5f]"></div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-end -mt-12 relative">
              <div className="w-28 h-28 bg-white p-1 rounded-2xl shadow-md border border-gray-100 relative">
                <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-4xl font-bold">
                  {user.nama_lengkap?.substring(0, 2).toUpperCase() || 'US'}
                </div>
                <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 text-gray-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="ml-5 pb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.nama_lengkap}</h1>
                <p className="text-sm font-medium text-blue-600 mt-1">{formatRole(user.role)}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 pb-2">
              <button className="px-5 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                Ubah Password
              </button>
              <button className="px-5 py-2 bg-[#2563eb] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-blue-700 transition-colors">
                Simpan Profil
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col - Personal Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Informasi Pribadi</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" defaultValue={user.nama_lengkap} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">ID Pegawai (NIP)</label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" defaultValue={user.id_staf} readOnly className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Email (Opsional)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="email" placeholder="contoh@dukcapil.go.id" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">No. Telepon</label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="0812xxxxxxxx" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Keamanan Akun</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 text-gray-600 shadow-sm">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Autentikasi Dua Langkah (2FA)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Amankan akun Anda dengan verifikasi ekstra.</p>
                </div>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">Aktifkan</button>
            </div>
          </div>
        </div>

        {/* Right Col - Role Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold text-gray-800 mb-4">Detail Instansi</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Jabatan</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{formatRole(user.role)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Unit Kerja</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {user.role === 'bidang_organisasi' 
                      ? 'Biro Organisasi Sekretariat Daerah' 
                      : user.id_kecamatan 
                        ? `Kecamatan ${user.id_kecamatan.charAt(0).toUpperCase() + user.id_kecamatan.slice(1)}` 
                        : 'Dinas Kependudukan dan Pencatatan Sipil'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status Akun</p>
                  <p className="text-sm font-semibold text-green-600 mt-0.5">Aktif Terverifikasi</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
