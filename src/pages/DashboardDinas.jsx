import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API = 'http://localhost:3000/api';

export function DashboardDinas() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [berkasDinas, setBerkasDinas] = useState([]);
  const [inputNoReg, setInputNoReg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, dinasRes] = await Promise.all([
        fetch(`${API}/berkas/stats`),
        fetch(`${API}/berkas?tahapan=DINAS`),
      ]);
      const statsJson = await statsRes.json();
      const dinasJson = await dinasRes.json();
      if (statsJson.success) setStats(statsJson.data);
      if (dinasJson.success) setBerkasDinas(dinasJson.data);
    } catch (err) {
      console.error('Gagal fetch data dinas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const konfirmasiBerkasDiterima = async () => {
    if (!inputNoReg.trim()) {
      Swal.fire({ icon: "warning", title: "Input Kosong", text: "Masukkan nomor registrasi!", confirmButtonColor: "#112340" });
      return;
    }
    try {
      const res = await fetch(`${API}/update-status/${inputNoReg.trim()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          posisi_berkas_baru: 'VERIFIKASI_BERKAS_DINAS',
          penanggung_jawab_baru_id: 'STAFF_DINAS',
          tahapan_baru: 'DINAS',
          keterangan_log: 'Berkas diterima di Dinas dan mulai proses verifikasi.',
        }),
      });
      const json = await res.json();
      if (json.success) {
        Swal.fire({ icon: "success", title: "Berhasil!", text: `Berkas ${inputNoReg.trim()} berhasil dikonfirmasi!`, confirmButtonColor: "#112340" }).then(() => { setInputNoReg(''); fetchData(); });
      } else {
        Swal.fire({ icon: "error", title: "Gagal", text: json.message, confirmButtonColor: "#112340" }).then(() => setInputNoReg(''));
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Koneksi Gagal", text: "Tidak dapat terhubung ke server.", confirmButtonColor: "#112340" });
    }
  };

  const nextStep = async (noReg) => {
    try {
      const order = [
        'VERIFIKASI_BERKAS_KECAMATAN', 'PEMBUATAN_SURAT_PENGANTAR', 'MENUNGGU_TTD_CAMAT',
        'SELESAI_KECAMATAN', 'ANTREAN_LOKET_DINAS', 'VERIFIKASI_BERKAS_DINAS',
        'VERIFIKASI_SIAK', 'PROSES_CETAK', 'VALIDASI_PEJABAT',
        'DOKUMEN_SELESAI', 'SIAP_DIAMBIL_DI_KECAMATAN',
      ];
      const berkas = berkasDinas.find(b => b.no_registrasi === noReg);
      if (!berkas) return;
      const currentIdx = order.indexOf(berkas.posisi_berkas);
      if (currentIdx === -1 || currentIdx >= order.length - 1) {
        Swal.fire({ icon: "warning", title: "Tahap Akhir", text: "Berkas sudah di tahap akhir.", confirmButtonColor: "#112340" });
        return;
      }
      const nextPos = order[currentIdx + 1];
      const nextTahapan = nextPos === 'ANTREAN_LOKET_DINAS' || nextPos.startsWith('VERIFIKASI') || nextPos === 'PROSES_CETAK' || nextPos === 'VALIDASI_PEJABAT' || nextPos === 'DOKUMEN_SELESAI' || nextPos === 'SIAP_DIAMBIL_DI_KECAMATAN' ? 'DINAS' : 'KECAMATAN';

      const res = await fetch(`${API}/update-status/${noReg}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          posisi_berkas_baru: nextPos,
          penanggung_jawab_baru_id: 'STAFF_DINAS',
          tahapan_baru: nextTahapan,
          keterangan_log: `Berkas lanjut ke tahap: ${nextPos}`,
        }),
      });
      const json = await res.json();
      if (json.success) {
        Swal.fire({ icon: "success", title: "Berhasil!", text: `Berkas ${noReg} maju ke tahap ${nextPos}!`, confirmButtonColor: "#112340" }).then(() => fetchData());
      } else {
        Swal.fire({ icon: "error", title: "Gagal", text: json.message, confirmButtonColor: "#112340" });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Koneksi Gagal", text: "Tidak dapat terhubung ke server.", confirmButtonColor: "#112340" });
    }
  };

  if (loading) {
    return <div style={{ padding: 40, fontFamily: 'sans-serif', fontSize: 14, color: '#6b7280' }}>Memuat data dashboard Dinas...</div>;
  }

  const getStatusStyle = (posisi) => {
    const map = {
      'VERIFIKASI_BERKAS_DINAS': ['Verifikasi Database', '#2563eb', '#eff6ff', '#bfdbfe'],
      'VERIFIKASI_SIAK': ['Verifikasi Database', '#2563eb', '#eff6ff', '#bfdbfe'],
      'ANTREAN_LOKET_DINAS': ['Antrean Loket', '#f97316', '#fff7ed', '#fed7aa'],
      'PROSES_CETAK': ['Proses Cetak', '#16a34a', '#f0fdf4', '#bbf7d0'],
      'VALIDASI_PEJABAT': ['Approval Kepala Dinas', '#f97316', '#fff7ed', '#fed7aa'],
      'DOKUMEN_SELESAI': ['Dokumen Selesai', '#16a34a', '#f0fdf4', '#bbf7d0'],
      'SIAP_DIAMBIL_DI_KECAMATAN': ['Siap Diambil', '#16a34a', '#f0fdf4', '#bbf7d0'],
    };
    return map[posisi] || [posisi.replace(/_/g, ' '), '#6b7280', '#f3f4f6', '#e5e7eb'];
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: 13, padding: '20px 24px' }}>
      {/* Status Banner */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 14, height: 14, background: '#3b82f6', borderRadius: 3 }}></div>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Konfirmasi Tahap Dinas</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Aktifkan tracking tahap Dinas setelah berkas fisik diterima dari masyarakat.</div>
          </div>
        </div>
        <button onClick={() => document.getElementById('regInput').focus()} style={{ padding: '10px 20px', borderRadius: 8, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', background: '#1a4fca', color: '#fff' }}>
          Konfirmasi Berkas Diterima
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 18 }}>
        {[
          { label: 'Total Berkas', value: stats?.total_berkas ?? 0, sub: 'Semua berkas', iconColor: '#3b82f6', iconBg: '#eff6ff', border: '#bfdbfe', icon: '#' },
          { label: 'Sedang Diproses', value: stats?.sedang_diproses ?? 0, sub: 'Dalam proses', iconColor: '#10b981', iconBg: '#f0fdf4', border: '#a7f3d0', icon: '▦' },
          { label: 'Berkas Selesai', value: stats?.selesai ?? 0, sub: 'Sudah selesai', iconColor: '#16a34a', iconBg: '#f0fdf4', border: '#a7f3d0', icon: '✓' },
          { label: 'Menunggu TTD', value: stats?.menunggu_ttd ?? 0, sub: 'Di kecamatan', iconColor: '#f97316', iconBg: '#fff7ed', border: '#fed7aa', icon: '⏳' },
        ].map((m, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', border: `1.5px solid ${m.border}` }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: m.iconBg, border: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18, color: m.iconColor, fontWeight: 800 }}>
              {m.icon}
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#111827' }}>{m.label}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: '#0f1f3d', lineHeight: 1.1, margin: '4px 0 3px' }}>{m.value}</div>
              <div style={{ fontSize: 10, color: '#9ca3af' }}>{m.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Berkas Aktif Dinas */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Berkas Aktif Dinas</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Daftar berkas yang sedang diproses pada tahap Dinas.</div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Semua Status ▾
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                    {['No. Registrasi', 'Nama Warga', 'Layanan', 'Status Proses', 'SLA', 'Estimasi', 'Aksi'].map((h) => (
                      <th key={h} style={{ padding: '10px 18px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {berkasDinas.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: 20, textAlign: 'center', color: '#9ca3af', fontSize: 11 }}>Belum ada berkas di tahap Dinas.</td></tr>
                  ) : (
                    berkasDinas.map((row, i) => {
                      const [statusLabel, statusColor, statusBg, statusBorder] = getStatusStyle(row.posisi_berkas);
                      const isNextable = row.posisi_berkas !== 'SIAP_DIAMBIL_DI_KECAMATAN' && row.posisi_berkas !== 'DOKUMEN_SELESAI';
                      return (
                        <tr key={i} style={{ borderBottom: i < berkasDinas.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                          <td style={{ padding: '13px 18px', fontSize: 11, color: '#2563eb', fontWeight: 700 }}>{row.no_registrasi}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.nama_warga}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.layanan === 1 ? 'KTP' : row.layanan === 2 ? 'KK' : 'Akta'}</td>
                          <td style={{ padding: '13px 18px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 9px', fontSize: 10, fontWeight: 800, color: statusColor, background: statusBg, border: `1px solid ${statusBorder}`, borderRadius: 5, whiteSpace: 'nowrap' }}>
                              {statusLabel}
                            </span>
                          </td>
                          <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 700, color: '#2563eb' }}>{row.estimasi_ml_kecamatan?.range || '-'}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, color: '#111827' }}>{row.estimasi_ml_kecamatan?.predicted_minutes ? `${row.estimasi_ml_kecamatan.predicted_minutes}m` : '-'}</td>
                          <td style={{ padding: '13px 18px' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                              {isNextable && <button onClick={() => nextStep(row.no_registrasi)} style={{ padding: '5px 10px', background: '#1a4fca', color: '#fff', border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Next Step</button>}
                              <button onClick={() => navigate(`/tracking/${row.no_registrasi}`)} style={{ padding: '5px 10px', background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Detail</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Konfirmasi Berkas */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Konfirmasi Berkas</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Aktifkan tracking tahap Dinas.</div>
            <div style={{ background: '#0e2a5c', borderRadius: 12, padding: 22, color: '#fff' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Input Nomor Registrasi</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 16 }}>Gunakan nomor registrasi dari tahap Kecamatan untuk memulai proses Dinas.</div>
              <input
                id="regInput"
                type="text"
                value={inputNoReg}
                onChange={(e) => setInputNoReg(e.target.value)}
                placeholder="Contoh: AZ001"
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700, color: '#111827', marginBottom: 12, outline: 'none' }}
              />
              <button onClick={konfirmasiBerkasDiterima} style={{ width: '100%', padding: '10px', background: '#93c5fd', color: '#1e3a8a', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                Konfirmasi Berkas Diterima
              </button>
            </div>
          </div>

          {/* Ringkasan Hari Ini */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Ringkasan Hari Ini</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Performa proses layanan Dinas.</div>
            {[
              ['Total Berkas', stats?.total_berkas ?? 0],
              ['Sedang Diproses', stats?.sedang_diproses ?? 0],
              ['Selesai', stats?.selesai ?? 0],
            ].map(([label, val], i, arr) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <span style={{ fontSize: 11, color: '#6b7280' }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
