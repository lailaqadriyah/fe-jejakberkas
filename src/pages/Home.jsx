import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileBadge2, TrendingUp, LayoutDashboard, Clock, AlertTriangle, 
  ChevronRight, ChevronDown, Plus, MoreHorizontal
} from 'lucide-react';

const API = 'http://localhost:3000/api';

export function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [berkas, setBerkas] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/berkas/stats`);
      const json = await res.json();
      if (json.success) setStats(json.data);
    } catch (err) {
      console.error('Gagal fetch stats:', err);
    }
  };

  const fetchBerkas = async (p = 1, status = '') => {
    setLoading(true);
    try {
      let url = `${API}/berkas?page=${p}&limit=5`;
      if (status) url += `&status=${status}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setBerkas(json.data);
        setTotal(json.total);
        setPage(json.page);
      }
    } catch (err) {
      console.error('Gagal fetch berkas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchBerkas(1, filterStatus);
  }, []);

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setFilterStatus(val);
    fetchBerkas(1, val);
  };

  const totalPages = Math.ceil(total / 5);

  const formatSisaWaktu = (data) => {
    if (!data?.kalkulasi_sla?.sisa_waktu_menit && !data?.estimasi_ml_kecamatan) return '-';
    const menit = data.kalkulasi_sla?.sisa_waktu_menit ?? data.estimasi_ml_kecamatan?.predicted_minutes ?? 0;
    if (menit <= 0) return 'Lewat';
    if (menit < 60) return `${menit}m tersisa`;
    return `${Math.floor(menit / 60)}j ${menit % 60}m tersisa`;
  };

  const getSlaColor = (data) => {
    const menit = data.kalkulasi_sla?.sisa_waktu_menit;
    if (menit === undefined || menit === null) return 'text-blue-600';
    if (menit <= 0) return 'text-red-600';
    if (menit <= 15) return 'text-orange-500';
    return 'text-blue-600';
  };

  const getStatusBadge = (posisi) => {
    const map = {
      'VERIFIKASI_BERKAS_KECAMATAN': { label: 'Verifikasi Dokumen', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
      'PEMBUATAN_SURAT_PENGANTAR': { label: 'Buat Surat Pengantar', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
      'MENUNGGU_TTD_CAMAT': { label: 'Menunggu TTD Camat', cls: 'bg-orange-50 text-orange-600 border-orange-200' },
      'SELESAI_KECAMATAN': { label: 'Selesai Kecamatan', cls: 'bg-green-50 text-green-600 border-green-200' },
      'ANTREAN_LOKET_DINAS': { label: 'Antrean Loket Dinas', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
      'VERIFIKASI_BERKAS_DINAS': { label: 'Verifikasi Berkas Dinas', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
      'VERIFIKASI_SIAK': { label: 'Verifikasi Database', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
      'PROSES_CETAK': { label: 'Proses Cetak', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
      'VALIDASI_PEJABAT': { label: 'Approval Kepala Dinas', cls: 'bg-purple-50 text-purple-600 border-purple-200' },
      'DOKUMEN_SELESAI': { label: 'Dokumen Selesai', cls: 'bg-green-50 text-green-600 border-green-200' },
      'SIAP_DIAMBIL_DI_KECAMATAN': { label: 'Siap Diambil', cls: 'bg-green-50 text-green-600 border-green-200' },
    };
    const m = map[posisi] || { label: posisi?.replace(/_/g, ' '), cls: 'bg-gray-50 text-gray-600 border-gray-200' };
    return m;
  };

  const getLayananName = (id) => {
    const map = { 1: 'KTP', 2: 'KK', 3: 'Akta' };
    return map[id] || 'Layanan';
  };

  const getEstTime = (data) => {
    try {
      if (data.kalkulasi_sla?.estimasi_selesai) {
        return new Date(data.kalkulasi_sla.estimasi_selesai).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    } catch {}
    return '-';
  };

  return (
    <>
      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="bg-blue-50 p-4 rounded-xl">
              <FileBadge2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Total Berkas Hari Ini</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">{stats?.total_berkas ?? '-'}</h3>
              <div className="flex flex-col items-end">
                <TrendingUp className="w-4 h-4 text-blue-600 mb-1" />
                <span className="text-[10px] text-gray-400">Berkas masuk hari ini</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="bg-emerald-50 p-4 rounded-xl">
              <LayoutDashboard className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Sedang Diproses</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">{stats?.sedang_diproses ?? '-'}</h3>
              <div className="flex flex-col items-end">
                <TrendingUp className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[10px] text-gray-400">Berkas dalam proses</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="bg-orange-50 p-4 rounded-xl">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Menunggu TTD Camat</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">{stats?.menunggu_ttd ?? '-'}</h3>
              <div className="flex flex-col items-end">
                <TrendingUp className="w-4 h-4 text-orange-500 mb-1" />
                <span className="text-[10px] text-gray-400">Menunggu persetujuan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="bg-red-50 p-4 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Terlambat</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">{stats?.detail_status?.TERLAMBAT ?? 0}</h3>
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
          <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0 shadow-sm text-white font-bold">i</div>
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
        <div className="p-6 border-b border-gray-100 flex justify-between items-end">
          <div>
            <h3 className="text-lg font-bold text-[#112340]">Berkas Terbaru</h3>
            <p className="text-xs text-gray-500 mt-1">Daftar berkas yang sedang Anda tangani</p>
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-medium hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm cursor-pointer"
              >
                <option value="">Semua Status</option>
                <option value="VERIFIKASI_BERKAS_KECAMATAN">Verifikasi Dokumen</option>
                <option value="MENUNGGU_TTD_CAMAT">Menunggu TTD Camat</option>
                <option value="SELESAI_KECAMATAN">Selesai Kecamatan</option>
                <option value="SIAP_DIAMBIL_DI_KECAMATAN">Siap Diambil</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
            </div>
            <button
              onClick={() => navigate('/tambah-berkas')}
              className="bg-[#112340] hover:bg-[#1e3250] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Berkas Baru
            </button>
          </div>
        </div>

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
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">Memuat data...</td>
                </tr>
              ) : berkas.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">Belum ada berkas.</td>
                </tr>
              ) : (
                berkas.map((item, i) => {
                  const badge = getStatusBadge(item.posisi_berkas);
                  return (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-semibold text-blue-600">{item.no_registrasi}</td>
                      <td className="px-6 py-4 text-gray-800 font-medium">{item.nama_warga}</td>
                      <td className="px-6 py-4 text-gray-600">{getLayananName(item.layanan)}</td>
                      <td className="px-6 py-4">
                        <span className={`flex w-[170px] justify-start text-left px-3 py-1.5 rounded text-xs font-semibold border ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">{item.penanggung_jawab_id || '-'}</td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center font-medium ${getSlaColor(item)}`}>
                          <Clock className="w-4 h-4 mr-1.5" />
                          {formatSisaWaktu(item)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">{getEstTime(item)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => navigate(`/tracking/${item.no_registrasi}`)}
                            className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            Lihat Detail
                          </button>
                          <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">
            Menampilkan {berkas.length > 0 ? `${(page - 1) * 5 + 1} - ${Math.min(page * 5, total)}` : '0'} dari {total} data
          </span>
          <div className="flex items-center space-x-1">
            <button
              disabled={page <= 1}
              onClick={() => fetchBerkas(page - 1, filterStatus)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => fetchBerkas(p, filterStatus)}
                className={`w-8 h-8 flex items-center justify-center rounded font-medium text-xs transition-colors ${p === page ? 'bg-[#112340] text-white' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page >= totalPages}
              onClick={() => fetchBerkas(page + 1, filterStatus)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
