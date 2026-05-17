import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, CheckCircle, AlertTriangle, Clock, Search, MoreHorizontal } from 'lucide-react';

export function Notifikasi() {
  const location = useLocation();
  const [role, setRole] = useState('staff_kecamatan');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setRole(JSON.parse(savedUser).role);
    } else {
      const sessionRole = sessionStorage.getItem('mockRole') || "kecamatan";
      const mockRoleRaw = location.state?.mockRole || sessionRole;
      const lowerRole = mockRoleRaw.toLowerCase();
      if (lowerRole.includes('camat')) setRole('camat');
      else if (lowerRole.includes('kepala dinas')) setRole('kepala_dinas');
      else if (lowerRole.includes('dinas')) setRole('staff_dinas');
      else if (lowerRole.includes('organisasi')) setRole('bidang_organisasi');
      else setRole('staff_kecamatan');
    }
  }, [location.state]);

  const getNotificationsByRole = () => {
    if (role === 'camat') {
      return [
        { id: 1, type: 'warning', title: 'Persetujuan Diperlukan', message: 'Ada 5 berkas pengajuan Kartu Keluarga baru yang menunggu tanda tangan elektronik Anda.', time: '10 Menit yang lalu', read: false },
        { id: 2, type: 'info', title: 'Jadwal Rapat', message: 'Rapat koordinasi bersama Kepala Desa se-Kecamatan pukul 14:00 WIB.', time: '1 Jam yang lalu', read: false },
        { id: 3, type: 'danger', title: 'Peringatan SLA Kecamatan', message: 'Kecamatan Anda telah melewati rata-rata SLA minggu ini. Mohon berikan teguran pada staff terkait.', time: 'Kemarin', read: true }
      ];
    }
    if (role === 'kepala_dinas') {
      return [
        { id: 1, type: 'danger', title: 'Laporan SLA Harian', message: 'Terdapat 3 staff di bawah dinas Anda yang hari ini mendapatkan penalti akibat keterlambatan SLA.', time: '30 Menit yang lalu', read: false },
        { id: 2, type: 'success', title: 'Laporan Selesai', message: 'Rekapitulasi pencetakan e-KTP bulan ini telah berhasil digenerate.', time: '2 Jam yang lalu', read: false },
        { id: 3, type: 'warning', title: 'Approval Diperlukan', message: 'Dibutuhkan persetujuan Anda untuk pembatalan berkas JB-2025-00102.', time: 'Kemarin', read: true }
      ];
    }
    if (role === 'bidang_organisasi') {
      return [
        { id: 1, type: 'info', title: 'Evaluasi Kinerja Bulanan', message: 'Laporan evaluasi kinerja Kecamatan Kuranji bulan ini siap untuk direview dan dipublikasikan.', time: '10 Menit yang lalu', read: false },
        { id: 2, type: 'warning', title: 'Anomali Data SLA', message: 'Sistem mendeteksi lonjakan keterlambatan SLA di Dinas Dukcapil pada hari Senin kemarin.', time: '3 Jam yang lalu', read: false },
        { id: 3, type: 'success', title: 'Pemeliharaan Selesai', message: 'Update algoritma perhitungan poin penalti SLA telah berhasil diimplementasikan.', time: '2 Hari yang lalu', read: true }
      ];
    }
    // Default / Staff
    return [
      { id: 1, type: 'warning', title: 'Peringatan SLA: Berkas JB-2025-00128', message: 'Berkas KTP atas nama Budi Santoso akan melewati batas SLA dalam 15 menit. Segera proses!', time: '10 Menit yang lalu', read: false },
      { id: 2, type: 'success', title: 'Berkas Selesai Diproses', message: 'Berkas Kartu Keluarga atas nama Siti Aminah telah selesai dicetak dan siap diambil.', time: '1 Jam yang lalu', read: false },
      { id: 3, type: 'info', title: 'Pembaruan Sistem', message: 'Jadwal maintenance server rutin akan dilakukan pada Sabtu, 20 Mei 2026 pukul 00:00 - 02:00 WIB.', time: 'Kemarin', read: true },
      { id: 4, type: 'danger', title: 'Penalti SLA Diberikan', message: 'Anda menerima 1 poin penalti karena terlambat memproses berkas JB-2025-00099 (Akta Kelahiran).', time: '2 Hari yang lalu', read: true }
    ];
  };

  const [searchTerm, setSearchTerm] = useState('');
  const notifications = getNotificationsByRole();
  const filteredNotifs = notifications.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type) => {
    switch(type) {
      case 'warning': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'danger': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'warning': return 'bg-orange-50 border-orange-100';
      case 'success': return 'bg-green-50 border-green-100';
      case 'danger': return 'bg-red-50 border-red-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Bell className="w-6 h-6 mr-3 text-blue-600" />
            Pusat Notifikasi
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-9">Kelola dan pantau semua pemberitahuan sistem Anda.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari notifikasi..." 
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
            />
          </div>
          <button className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap">
            Tandai Semua Dibaca
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filteredNotifs.length > 0 ? filteredNotifs.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-5 flex items-start gap-4 transition-colors hover:bg-gray-50 ${!notif.read ? 'bg-blue-50/20' : 'bg-white'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${getBgColor(notif.type)}`}>
                {getIcon(notif.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-bold truncate ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap shrink-0">{notif.time}</span>
                </div>
                <p className={`text-sm mt-1 leading-relaxed ${!notif.read ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                  {notif.message}
                </p>
                
                {!notif.read && (
                  <div className="mt-3">
                    <button className="text-xs font-bold text-blue-600 hover:underline">Tandai Dibaca</button>
                  </div>
                )}
              </div>
              
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          )) : (
            <div className="p-10 text-center text-gray-500 text-sm">
              Tidak ada notifikasi yang sesuai pencarian.
            </div>
          )}
        </div>
        
        {filteredNotifs.length > 0 && (
          <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
            <button className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
