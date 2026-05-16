import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:3000/api';

export function DashboardKepalaDinas() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [berkasDinas, setBerkasDinas] = useState([]);
  const [stafList, setStafList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, dinasRes] = await Promise.all([
          fetch(`${API}/berkas/stats`),
          fetch(`${API}/berkas?tahapan=DINAS&limit=100`),
        ]);
        const statsJson = await statsRes.json();
        const dinasJson = await dinasRes.json();
        if (statsJson.success) setStats(statsJson.data);
        if (dinasJson.success) {
          setBerkasDinas(dinasJson.data);
          // aggregate staff performance
          const staffMap = {};
          dinasJson.data.forEach(b => {
            const pic = b.penanggung_jawab_id || 'Unknown';
            if (!staffMap[pic]) staffMap[pic] = { name: pic, total: 0, tepat: 0, terlambat: 0 };
            staffMap[pic].total++;
            if (b.waktu_berkas_diterima_warga) staffMap[pic].tepat++;
            else staffMap[pic].terlambat++;
          });
          setStafList(Object.values(staffMap));
        }
      } catch (err) {
        console.error('Gagal fetch:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const terlambatCount = berkasDinas.filter(b => {
    if (b.kalkulasi_sla?.sisa_waktu_menit === 0 || b.kalkulasi_sla?.sisa_waktu_menit < 0) return true;
    if (!b.kalkulasi_sla && b.estimasi_ml_kecamatan) return false;
    return false;
  }).length;

  const getStatusStyle = (posisi) => {
    const map = {
      'VERIFIKASI_BERKAS_DINAS': ['Verifikasi Database', '#2563eb', '#eff6ff', '#bfdbfe'],
      'VERIFIKASI_SIAK': ['Verifikasi Database', '#2563eb', '#eff6ff', '#bfdbfe'],
      'ANTREAN_LOKET_DINAS': ['Antrean Loket', '#f97316', '#fff7ed', '#fed7aa'],
      'PROSES_CETAK': ['Proses Cetak', '#16a34a', '#f0fdf4', '#bbf7d0'],
      'VALIDASI_PEJABAT': ['Menunggu Finalisasi', '#f97316', '#fff7ed', '#fed7aa'],
      'DOKUMEN_SELESAI': ['Dokumen Selesai', '#16a34a', '#f0fdf4', '#bbf7d0'],
      'SIAP_DIAMBIL_DI_KECAMATAN': ['Siap Diambil', '#16a34a', '#f0fdf4', '#bbf7d0'],
    };
    return map[posisi] || [posisi.replace(/_/g, ' '), '#6b7280', '#f3f4f6', '#e5e7eb'];
  };

  if (loading) return <div style={{ padding: 40, fontSize: 14, color: '#6b7280' }}>Memuat...</div>;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: 13, padding: '20px 24px' }}>
      {/* Top Banner */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#3b82f6' }}>▤</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Monitoring Proses Dinas</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Kepala Dinas memantau performa Staff Dinas, SLA layanan, penalti, dan dokumen aktif.</div>
          </div>
        </div>
        {terlambatCount > 0 && (
          <button style={{ padding: '8px 18px', borderRadius: 20, fontSize: 11, fontWeight: 700, border: '1px solid #fdba74', cursor: 'pointer', background: '#fff7ed', color: '#ea580c' }}>
            {terlambatCount} Proses Terlambat Perlu Dipantau
          </button>
        )}
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 18 }}>
        {[
          { label: 'Berkas Dalam Pengawasan', value: stats?.sedang_diproses ?? 0, sub: 'Dokumen aktif di Dinas', icon: '⌖', iconColor: '#3b82f6', iconBg: '#eff6ff', border: '#bfdbfe' },
          { label: 'Staff Dinas Terlambat', value: stafList.filter(s => s.terlambat > 0).length, sub: 'Melewati SLA proses', icon: '!', iconColor: '#ef4444', iconBg: '#fef2f2', border: '#fecaca' },
          { label: 'Total Penalti Staff', value: stafList.reduce((a, s) => a + s.terlambat, 0), sub: 'Akumulasi', icon: '⚑', iconColor: '#ef4444', iconBg: '#fef2f2', border: '#fecaca' },
          { label: 'Dokumen Selesai', value: stats?.selesai ?? 0, sub: 'Selesai', icon: '✓', iconColor: '#10b981', iconBg: '#f0fdf4', border: '#a7f3d0' },
        ].map((m, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', border: `1.5px solid ${m.border}` }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: m.iconBg, border: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18, color: m.iconColor, fontWeight: 800 }}>{m.icon}</div>
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
          {/* Monitoring Dokumen Aktif */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Monitoring Dokumen Aktif</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Pantau status dokumen yang sedang diproses oleh Staff Dinas.</div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>Semua Status ▾</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                    {['No. Registrasi', 'Nama Warga', 'Layanan', 'Staff Dinas', 'Status Proses', 'SLA', 'Estimasi', 'Aksi'].map(h => (
                      <th key={h} style={{ padding: '10px 18px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {berkasDinas.length === 0 ? (
                    <tr><td colSpan={8} style={{ padding: 20, textAlign: 'center', color: '#9ca3af', fontSize: 11 }}>Belum ada berkas di tahap Dinas.</td></tr>
                  ) : (
                    berkasDinas.slice(0, 10).map((row, i) => {
                      const [statusLabel, statusColor, statusBg, statusBorder] = getStatusStyle(row.posisi_berkas);
                      return (
                        <tr key={i} style={{ borderBottom: i < Math.min(berkasDinas.length, 10) - 1 ? '1px solid #f3f4f6' : 'none' }}>
                          <td style={{ padding: '13px 18px', fontSize: 11, color: '#2563eb', fontWeight: 700 }}>{row.no_registrasi}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.nama_warga}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, color: '#4b5563' }}>{row.layanan === 1 ? 'KTP' : row.layanan === 2 ? 'KK' : 'Akta'}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, color: '#4b5563' }}>{row.penanggung_jawab_id || '-'}</td>
                          <td style={{ padding: '13px 18px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 9px', fontSize: 10, fontWeight: 800, color: statusColor, background: statusBg, border: `1px solid ${statusBorder}`, borderRadius: 5, whiteSpace: 'nowrap' }}>{statusLabel}</span>
                          </td>
                          <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 700, color: '#2563eb' }}>{row.estimasi_ml_kecamatan?.range || '-'}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, color: '#111827' }}>{row.estimasi_ml_kecamatan?.predicted_minutes ? `${row.estimasi_ml_kecamatan.predicted_minutes}m` : '-'}</td>
                          <td style={{ padding: '13px 18px' }}>
                            <button onClick={() => navigate(`/tracking/${row.no_registrasi}`)} style={{ padding: '5px 10px', background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}>Lihat Detail</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monitoring Staff Dinas */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14 }}>
            <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Monitoring Staff Dinas</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Performa staff berdasarkan jumlah dokumen, keterlambatan, dan penalti.</div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer' }}>Bulan Ini ▾</button>
            </div>
            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {stafList.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 11, padding: 20 }}>Belum ada data staff.</div>
              ) : (
                stafList.map((s) => {
                  const pct = s.total > 0 ? Math.round((s.tepat / s.total) * 100) : 0;
                  return (
                    <div key={s.name} style={{ border: '1px solid #f3f4f6', borderRadius: 12, padding: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>{s.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#22c55e' }}>{pct}%</span>
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
                  );
                })
              )}
            </div>
          </div>

          {/* SLA Violation Chart */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '18px 22px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>SLA Violation Chart</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3, marginBottom: 20 }}>Distribusi berkas di tahap Dinas.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'KTP-el', pct: berkasDinas.filter(b => b.layanan === 1).length, total: berkasDinas.length, color: '#22c55e', bg: '#f0fdf4' },
                { label: 'Kartu Keluarga', pct: berkasDinas.filter(b => b.layanan === 2).length, total: berkasDinas.length, color: '#f59e0b', bg: '#fffbeb' },
                { label: 'Akta Kelahiran', pct: berkasDinas.filter(b => b.layanan === 3).length, total: berkasDinas.length, color: '#ef4444', bg: '#fef2f2' },
              ].map((bar, i) => {
                const widthPct = bar.total > 0 ? Math.round((bar.pct / bar.total) * 100) : 0;
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>{bar.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{bar.pct} berkas</span>
                    </div>
                    <div style={{ width: '100%', height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${widthPct}%`, height: '100%', background: bar.color, borderRadius: 4 }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Alert Keterlambatan */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Alert Keterlambatan</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Proses yang perlu dipantau Kepala Dinas.</div>
            {terlambatCount > 0 ? (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', marginBottom: 8 }}>{terlambatCount} berkas melewati SLA</div>
                <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.5, marginBottom: 16 }}>Beberapa berkas di tahap Dinas melewati estimasi waktu. Segera lakukan evaluasi.</div>
                <button style={{ width: '100%', padding: '10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>Lihat Detail Proses</button>
              </div>
            ) : (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 22, textAlign: 'center', fontSize: 11, color: '#16a34a', fontWeight: 700 }}>
                Tidak ada keterlambatan. Semua berjalan baik.
              </div>
            )}
          </div>

          {/* Ringkasan Dinas */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Ringkasan Dinas</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Performa layanan Dinas hari ini.</div>
            {[
              ['Total Berkas Aktif', stats?.sedang_diproses ?? 0],
              ['Berkas Selesai', stats?.selesai ?? 0],
              ['Proses Terlambat', terlambatCount],
            ].map(([label, val], i, arr) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <span style={{ fontSize: 11, color: '#6b7280' }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Penalty Report */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Penalty Report</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Laporan penalti Staff Dinas.</div>
            <div style={{ textAlign: 'center', padding: 20, fontSize: 11, color: '#9ca3af' }}>
              Total penalti staff dinas: {stafList.reduce((a, s) => a + s.terlambat, 0)} poin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
