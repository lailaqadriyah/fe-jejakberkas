import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API = 'http://localhost:3000/api';

export function DashboardCamat() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('available');
  const [stats, setStats] = useState(null);
  const [menungguTTD, setMenungguTTD] = useState([]);
  const [stafList, setStafList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, ttdRes] = await Promise.all([
        fetch(`${API}/berkas/stats`),
        fetch(`${API}/berkas?status=MENUNGGU_TTD_CAMAT`),
      ]);
      const statsJson = await statsRes.json();
      const ttdJson = await ttdRes.json();
      if (statsJson.success) setStats(statsJson.data);
      if (ttdJson.success) setMenungguTTD(ttdJson.data);

      // Fetch data staf dari collection staf_performa
      try {
        const stafRes = await fetch(`${API}/berkas?limit=100`);
        const stafJson = await stafRes.json();
        // Aggregate staf dari data berkas
        if (stafJson.success) {
          const stafMap = {};
          stafJson.data.forEach(b => {
            if (b.penanggung_jawab_id) {
              if (!stafMap[b.penanggung_jawab_id]) {
                stafMap[b.penanggung_jawab_id] = { name: b.penanggung_jawab_id, total: 0, tepat: 0, terlambat: 0 };
              }
              stafMap[b.penanggung_jawab_id].total++;
              if (b.waktu_berkas_diterima_warga) {
                stafMap[b.penanggung_jawab_id].tepat++;
              } else {
                stafMap[b.penanggung_jawab_id].terlambat++;
              }
            }
          });
          setStafList(Object.values(stafMap));
        }
      } catch {}
    } catch (err) {
      console.error('Gagal fetch data camat:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleKehadiran = async (newStatus) => {
    setStatus(newStatus);
    try {
      await fetch(`${API}/kondisi/kehadiran`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_kecamatan: 'kuranji', camat_hadir: newStatus === 'available' ? 1 : 0 }),
      });
    } catch (err) {
      console.error('Gagal update kehadiran:', err);
    }
  };

  const konfirmasiTTD = async (noReg) => {
    try {
      const res = await fetch(`${API}/update-status/${noReg}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          posisi_berkas_baru: 'SELESAI_KECAMATAN',
          penanggung_jawab_baru_id: 'CAMAT',
          tahapan_baru: 'KECAMATAN',
          keterangan_log: 'Camat mengkonfirmasi tanda tangan selesai.',
        }),
      });
      const json = await res.json();
      if (json.success) {
        alert(`Berkas ${noReg} berhasil dikonfirmasi!`);
        fetchData();
      } else {
        alert('Gagal: ' + json.message);
      }
    } catch (err) {
      alert('Gagal terhubung ke server.');
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', fontFamily: 'sans-serif', fontSize: 14, color: '#6b7280' }}>Memuat data dashboard Camat...</div>;
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: 13, padding: '20px 24px' }}>
      {/* Status Banner */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f0fdf9', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#10b981' }}>{status === 'available' ? '✓' : '✗'}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Status Camat Hari Ini: {status === 'available' ? 'Available' : 'Not Available'}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Camat tersedia di lokasi. Proses TTD mengikuti estimasi normal.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 30, padding: 4, gap: 2 }}>
          <button
            onClick={() => toggleKehadiran('available')}
            style={{ padding: '6px 18px', borderRadius: 20, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', background: status === 'available' ? '#10b981' : 'transparent', color: status === 'available' ? '#fff' : '#16a34a' }}
          >
            Available
          </button>
          <button
            onClick={() => toggleKehadiran('notavailable')}
            style={{ padding: '6px 18px', borderRadius: 20, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', background: status === 'notavailable' ? '#10b981' : 'transparent', color: status === 'notavailable' ? '#fff' : '#16a34a' }}
          >
            Not Available
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 18 }}>
        {[
          { label: 'Menunggu TTD', value: stats?.menunggu_ttd ?? 0, sub: 'Perlu konfirmasi Camat', icon: '✎', iconColor: '#f97316', iconBg: '#fff7ed', border: '#fed7aa' },
          { label: 'Sedang Diproses', value: stats?.sedang_diproses ?? 0, sub: 'Berkas dalam proses', icon: '⏳', iconColor: '#3b82f6', iconBg: '#eff6ff', border: '#bfdbfe' },
          { label: 'Total Berkas', value: stats?.total_berkas ?? 0, sub: 'Akumulasi semua berkas', icon: '⚑', iconColor: '#6b7280', iconBg: '#f8fafc', border: '#e5e7eb' },
          { label: 'Berkas Selesai', value: stats?.selesai ?? 0, sub: 'Validasi kecamatan selesai', icon: '✓', iconColor: '#10b981', iconBg: '#f0fdf4', border: '#a7f3d0' },
        ].map((m) => (
          <div key={m.label} style={{ background: '#fff', borderRadius: 14, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', border: `1.5px solid ${m.border}` }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: m.iconBg, border: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18, color: m.iconColor }}>
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
          {/* Daftar Menunggu TTD */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Daftar Menunggu TTD</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Berkas yang membutuhkan konfirmasi tanda tangan Camat.</div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Semua Status ▾
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                    {['No. Registrasi', 'Nama Warga', 'Layanan', 'Staff', 'SLA', 'Status', 'Aksi'].map((h) => (
                      <th key={h} style={{ padding: '10px 18px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {menungguTTD.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: '#9ca3af', fontSize: 11 }}>Tidak ada berkas menunggu TTD.</td></tr>
                  ) : (
                    menungguTTD.map((row, i) => (
                      <tr key={i} style={{ borderBottom: i < menungguTTD.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                        <td style={{ padding: '13px 18px', fontSize: 11, color: '#2563eb', fontWeight: 700 }}>{row.no_registrasi}</td>
                        <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.nama_warga}</td>
                        <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.layanan === 1 ? 'KTP' : row.layanan === 2 ? 'KK' : 'Akta'}</td>
                        <td style={{ padding: '13px 18px', fontSize: 11, color: '#4b5563' }}>{row.penanggung_jawab_id}</td>
                        <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 700, color: '#f97316' }}>{row.estimasi_ml_kecamatan?.range || '-'}</td>
                        <td style={{ padding: '13px 18px' }}>
                          <span style={{ display: 'inline-block', padding: '4px 9px', fontSize: 10, fontWeight: 800, color: '#f97316', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 5, whiteSpace: 'nowrap' }}>
                            Menunggu TTD
                          </span>
                        </td>
                        <td style={{ padding: '13px 18px' }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button onClick={() => konfirmasiTTD(row.no_registrasi)} style={{ padding: '5px 10px', background: '#1a4fca', color: '#fff', border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Konfirmasi</button>
                            <button onClick={() => navigate(`/tracking/${row.no_registrasi}`)} style={{ padding: '5px 10px', background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Detail</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monitoring Staff */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14 }}>
            <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Monitoring Staff Kecamatan</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Performa staff berdasarkan jumlah berkas yang ditangani.</div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer' }}>
                Bulan Ini ▾
              </button>
            </div>
            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {stafList.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 11, padding: 20 }}>Belum ada data staff.</div>
              ) : (
                stafList.map((s) => (
                  <div key={s.name} style={{ border: '1px solid #f3f4f6', borderRadius: 12, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>{s.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#22c55e' }}>{s.total > 0 ? Math.round((s.tepat / s.total) * 100) + '%' : '-'}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                      {[['Total', s.total], ['Tepat Waktu', s.tepat], ['Terlambat', s.terlambat], ['Penalti', s.terlambat + ' Poin']].map(([label, val]) => (
                        <div key={label}>
                          <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 3 }}>{label}</div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Quick Approval */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Quick Approval</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Konfirmasi cepat untuk berkas prioritas.</div>
            {menungguTTD.length > 0 ? (
              <div style={{ background: '#1a4fca', borderRadius: 12, padding: 22, color: '#fff', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 6 }}>{menungguTTD[0].no_registrasi}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 18 }}>
                  {menungguTTD[0].layanan === 1 ? 'KTP' : menungguTTD[0].layanan === 2 ? 'KK' : 'Akta'} atas nama {menungguTTD[0].nama_warga} sedang menunggu TTD Camat.
                </div>
                <button onClick={() => konfirmasiTTD(menungguTTD[0].no_registrasi)} style={{ width: '100%', padding: 10, background: '#fff', color: '#1a4fca', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                  Konfirmasi TTD Selesai
                </button>
              </div>
            ) : (
              <div style={{ background: '#f3f4f6', borderRadius: 12, padding: 22, textAlign: 'center', color: '#9ca3af', fontSize: 11 }}>
                Tidak ada berkas yang perlu dikonfirmasi.
              </div>
            )}
          </div>

          {/* Ringkasan */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Ringkasan Kecamatan</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Performa pelayanan hari ini.</div>
            {[
              ['Total Berkas Aktif', stats?.sedang_diproses ?? 0],
              ['Menunggu TTD', stats?.menunggu_ttd ?? 0],
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
