import React, { useState, useEffect } from 'react';

const API = 'http://localhost:3000/api';

export function DashboardBiroOrganisasi() {
  const [stats, setStats] = useState(null);
  const [berkas, setBerkas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, berkasRes] = await Promise.all([
          fetch(`${API}/berkas/stats`),
          fetch(`${API}/berkas?limit=200`),
        ]);
        const statsJson = await statsRes.json();
        const berkasJson = await berkasRes.json();
        if (statsJson.success) setStats(statsJson.data);
        if (berkasJson.success) setBerkas(berkasJson.data);
      } catch (err) {
        console.error('Gagal fetch:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const total = stats?.total_berkas ?? 0;
  const selesai = stats?.selesai ?? 0;
  const terlambat = stats?.detail_status?.TERLAMBAT ?? 0;
  const tepatWaktu = total > 0 ? Math.round(((total - terlambat) / total) * 100) : 0;
  const penaltiTotal = berkas.reduce((a, b) => a + (b.is_penalty_triggered ? 1 : 0), 0);

  if (loading) return <div style={{ padding: 40, fontSize: 14, color: '#6b7280', fontFamily: 'sans-serif' }}>Memuat data evaluasi...</div>;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: 13 }}>
      
      {/* Top Banner */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#3b82f6' }}>▦</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Evaluasi Kinerja Pelayanan Publik</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Dashboard agregat untuk memantau SLA, penalti, tren keterlambatan, dan performa unit kerja.</div>
          </div>
        </div>
        <button style={{ padding: '9px 18px', borderRadius: 8, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', background: '#1d4ed8', color: '#fff' }}>
          Export Laporan Evaluasi
        </button>
      </div>

      {/* Metric Cards (5 columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 18 }}>
        {[
          { label: 'Total Berkas', value: total.toLocaleString(), sub: 'Semua layanan bulan ini' },
          { label: 'SLA Tepat Waktu', value: `${tepatWaktu}%`, sub: 'Berkas tepat waktu', valueColor: tepatWaktu >= 85 ? '#16a34a' : '#ef4444' },
          { label: 'Berkas Terlambat', value: terlambat, sub: 'Perlu evaluasi unit kerja' },
          { label: 'Total Penalti', value: penaltiTotal, sub: 'Akumulasi pelanggaran' },
          { label: 'Rata-rata Waktu', value: stats?.detail_status ? `${Math.round(terlambat > 0 ? (selesai / total) * 100 : 0)}% selesai` : '-', sub: 'Progress penyelesaian' },
        ].map((m, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '16px 18px', border: '1px solid #e5e7eb', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#4b5563' }}>{m.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: m.valueColor || '#0f1f3d', lineHeight: 1.2, margin: '6px 0 4px' }}>{m.value}</div>
            <div style={{ fontSize: 9, color: '#9ca3af' }}>{m.sub}</div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: i === 1 && tepatWaktu >= 85 ? '#22c55e' : i === 1 ? '#ef4444' : i === 2 ? '#f59e0b' : i === 3 ? '#ef4444' : '#3b82f6', opacity: 0.8 }} />
          </div>
        ))}
      </div>

      {/* Grid 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18, marginBottom: 18 }}>
        {/* SLA Compliance */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>SLA Compliance</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Persentase layanan tepat waktu.</div>
            </div>
            <button style={{ padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer' }}>Detail SLA ▾</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {['VERIFIKASI_BERKAS_KECAMATAN', 'MENUNGGU_TTD_CAMAT', 'ANTREAN_LOKET_DINAS', 'PROSES_CETAK'].map((pos) => {
              const count = berkas.filter(b => b.posisi_berkas === pos).length;
              const phaseLabel = pos.replace(/_/g, ' ');
              return (
                <div key={pos}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{phaseLabel}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{count} berkas</span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${total > 0 ? (count / total) * 100 : 0}%`, height: '100%', background: count > 5 ? '#22c55e' : count > 2 ? '#f59e0b' : '#ef4444', borderRadius: 4 }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Penalty Trend */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Distribution by Tahap</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Sebaran berkas per tahapan.</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {['KECAMATAN', 'DINAS'].map((tahap) => {
              const count = berkas.filter(b => (b.tahapan_sekarang || '').toUpperCase() === tahap).length;
              const widthPct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={tahap}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{tahap}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{count} ({widthPct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${widthPct}%`, height: '100%', background: tahap === 'KECAMATAN' ? '#3b82f6' : '#f59e0b', borderRadius: 4 }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18, marginBottom: 18 }}>
        {/* Ranking by layanan */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '22px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Distribusi Layanan</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Jumlah berkas per jenis layanan.</div>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Layanan</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Jumlah</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: 'KTP-el' },
                { id: 2, name: 'Kartu Keluarga' },
                { id: 3, name: 'Akta Kelahiran' },
              ].map((r, i) => {
                const count = berkas.filter(b => b.layanan === r.id).length;
                const doneCount = berkas.filter(b => b.layanan === r.id && b.waktu_berkas_diterima_warga).length;
                const pct = count > 0 ? Math.round((doneCount / count) * 100) : 0;
                let status = pct >= 80 ? 'Baik' : pct >= 50 ? 'Sedang' : 'Evaluasi';
                let sColor = pct >= 80 ? '#16a34a' : pct >= 50 ? '#f59e0b' : '#dc2626';
                let sBg = pct >= 80 ? '#f0fdf4' : pct >= 50 ? '#fffbeb' : '#fef2f2';
                let sBorder = pct >= 80 ? '#bbf7d0' : pct >= 50 ? '#fde68a' : '#fecaca';
                return (
                  <tr key={r.id} style={{ borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '12px 22px', fontSize: 11, fontWeight: 800, color: '#111827' }}>{r.name}</td>
                    <td style={{ padding: '12px 22px', fontSize: 11, fontWeight: 800, color: '#111827' }}>{count}</td>
                    <td style={{ padding: '12px 22px' }}>
                      <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 800, color: sColor, background: sBg, border: `1px solid ${sBorder}` }}>{status} ({pct}%)</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Ringkasan */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Ringkasan Evaluasi</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3, marginBottom: 20 }}>Rekomendasi laporan periodik.</div>
          
          <div style={{ background: '#0f4296', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Evaluasi Bulanan Siap Dibuat</div>
            <div style={{ fontSize: 10, color: '#bfdbfe', lineHeight: 1.5, marginBottom: 16 }}>
              Ringkasan performa: {total} total berkas, {tepatWaktu}% SLA tepat waktu, {penaltiTotal} total penalti.
            </div>
            <button style={{ width: '100%', padding: '10px', background: '#fff', color: '#0f4296', border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
              Generate Evaluasi Bulanan
            </button>
          </div>

          {terlambat > 0 && (
            <div style={{ border: '1px solid #fecaca', background: '#fef2f2', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', marginBottom: 5 }}>Perhatian Evaluasi</div>
              <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.5 }}>Terdapat {terlambat} berkas yang perlu evaluasi lanjutan.</div>
            </div>
          )}

          {penaltiTotal > 0 && (
            <div style={{ border: '1px solid #fecaca', background: '#fef2f2', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', marginBottom: 5 }}>Total Penalti Terakumulasi</div>
              <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.5 }}>{penaltiTotal} poin penalti telah dikenakan pada berkas yang melewati SLA.</div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
