import React from 'react';

export function DashboardBiroOrganisasi() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: 13 }}>
      
      {/* Top Banner */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#3b82f6' }}>
            ▦
          </div>
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
          { label: 'Total Berkas', value: '1.248', sub: 'Semua layanan bulan ini' },
          { label: 'SLA Tepat Waktu', value: '91%', sub: 'Naik 4% dari bulan lalu', valueColor: '#0f1f3d' },
          { label: 'Berkas Terlambat', value: '112', sub: 'Perlu evaluasi unit kerja' },
          { label: 'Total Penalti', value: '37', sub: 'Akumulasi pelanggaran' },
          { label: 'Rata-rata Waktu', value: '2j 18m', sub: 'Rata-rata proses layanan' },
        ].map((m, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '16px 18px', border: '1px solid #e5e7eb', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#4b5563' }}>{m.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: m.valueColor || '#0f1f3d', lineHeight: 1.2, margin: '6px 0 4px' }}>{m.value}</div>
            <div style={{ fontSize: 9, color: '#9ca3af' }}>{m.sub}</div>
            {/* Subtle top border accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: i === 1 ? '#22c55e' : i === 2 ? '#f59e0b' : i === 3 ? '#ef4444' : '#3b82f6', opacity: 0.8 }} />
          </div>
        ))}
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18, marginBottom: 18 }}>
        
        {/* SLA Compliance */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>SLA Compliance</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Persentase layanan tepat waktu berdasarkan unit kerja.</div>
            </div>
            <button style={{ padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer' }}>
              Detail SLA ▾
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { name: 'Kecamatan Sukamaju', pct: '96%', width: '96%', color: '#22c55e' },
              { name: 'Kecamatan Melati', pct: '89%', width: '89%', color: '#3b82f6' },
              { name: 'Dinas Dukcapil', pct: '88%', width: '88%', color: '#f59e0b' },
              { name: 'Kecamatan Cendana', pct: '74%', width: '74%', color: '#ef4444' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{item.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{item.pct}</span>
                </div>
                <div style={{ width: '100%', height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: item.width, height: '100%', background: item.color, borderRadius: 4 }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Penalty Trend */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Penalty Trend</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Tren penalti layanan per minggu.</div>
            </div>
            <button style={{ padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer' }}>
              Mingguan ▾
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { label: 'Minggu 1', val: '6 Poin', width: '30%', color: '#22c55e' },
              { label: 'Minggu 2', val: '8 Poin', width: '50%', color: '#f59e0b' },
              { label: 'Minggu 3', val: '10 Poin', width: '70%', color: '#f59e0b' },
              { label: 'Minggu 4', val: '13 Poin', width: '90%', color: '#ef4444' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{item.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{item.val}</span>
                </div>
                <div style={{ width: '100%', height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: item.width, height: '100%', background: item.color, borderRadius: 4 }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18, marginBottom: 18 }}>
        
        {/* Ranking Unit Kerja */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '22px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Ranking Unit Kerja</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Perbandingan performa Kecamatan dan Dinas.</div>
            </div>
            <button style={{ padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer' }}>
              Urutkan ▾
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Rank</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Unit Kerja</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>SLA</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Penalti</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, unit: 'Kecamatan Sukamaju', type: 'Kecamatan', sla: '96%', pen: '1 Poin', status: 'Sangat Baik', sColor: '#16a34a', sBg: '#f0fdf4', sBorder: '#bbf7d0' },
                { rank: 2, unit: 'Dinas Dukcapil', type: 'Dinas', sla: '88%', pen: '7 Poin', status: 'Baik', sColor: '#2563eb', sBg: '#eff6ff', sBorder: '#bfdbfe' },
                { rank: 3, unit: 'Kecamatan Melati', type: 'Kecamatan', sla: '82%', pen: '9 Poin', status: 'Perlu Pantau', sColor: '#d97706', sBg: '#fffbeb', sBorder: '#fde68a' },
                { rank: 4, unit: 'Kecamatan Cendana', type: 'Kecamatan', sla: '74%', pen: '14 Poin', status: 'Evaluasi', sColor: '#dc2626', sBg: '#fef2f2', sBorder: '#fecaca' },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '12px 22px' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f1f5f9', color: '#0f1f3d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>{r.rank}</div>
                  </td>
                  <td style={{ padding: '12px 22px' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{r.unit}</div>
                    <div style={{ fontSize: 9, color: '#6b7280', marginTop: 2 }}>{r.type}</div>
                  </td>
                  <td style={{ padding: '12px 22px', fontSize: 11, fontWeight: 800, color: '#111827' }}>{r.sla}</td>
                  <td style={{ padding: '12px 22px', fontSize: 11, fontWeight: 700, color: '#4b5563' }}>{r.pen}</td>
                  <td style={{ padding: '12px 22px' }}>
                    <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 800, color: r.sColor, background: r.sBg, border: `1px solid ${r.sBorder}` }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delay Heatmap */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Delay Heatmap</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3, marginBottom: 20 }}>Intensitas keterlambatan layanan 7 hari terakhir.</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 8 }}>
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d, i) => {
              const isBad = i === 1 || i === 3 || i === 6;
              return (
                <div key={d} style={{ padding: '8px 0', textAlign: 'center', borderRadius: 6, fontSize: 10, fontWeight: 800, color: isBad ? '#ef4444' : '#22c55e', background: isBad ? '#fef2f2' : '#f0fdf4', border: `1px solid ${isBad ? '#fecaca' : '#bbf7d0'}` }}>
                  {d}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {['KTP', 'KK', 'Akta', 'KTP', 'KK', 'KTP', 'Akta'].map((d, i) => {
              const isBad = i === 2 || i === 6;
              const isWarn = i === 4;
              const color = isBad ? '#ef4444' : isWarn ? '#f59e0b' : '#22c55e';
              const bg = isBad ? '#fef2f2' : isWarn ? '#fffbeb' : '#f0fdf4';
              const border = isBad ? '#fecaca' : isWarn ? '#fde68a' : '#bbf7d0';
              return (
                <div key={i} style={{ padding: '8px 0', textAlign: 'center', borderRadius: 6, fontSize: 10, fontWeight: 800, color: color, background: bg, border: `1px solid ${border}` }}>
                  {d}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Grid Layout 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18 }}>
        
        {/* Unit Kerja dengan Keterlambatan Tertinggi */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '22px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Unit Kerja dengan Keterlambatan Tertinggi</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Unit yang perlu mendapat perhatian evaluasi.</div>
            </div>
            <button style={{ padding: '5px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 800, color: '#0f1f3d', background: '#fff', cursor: 'pointer' }}>
              Generate Evaluasi
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Unit Kerja</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Jenis</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Terlambat</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Penalti</th>
                <th style={{ padding: '12px 22px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[
                { unit: 'Kecamatan Cendana', type: 'Kecamatan', late: '32 Berkas', pen: '14 Poin' },
                { unit: 'Dinas Dukcapil', type: 'Dinas', late: '21 Berkas', pen: '7 Poin' },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: i === 0 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '14px 22px', fontSize: 11, fontWeight: 800, color: '#111827' }}>{r.unit}</td>
                  <td style={{ padding: '14px 22px', fontSize: 11, fontWeight: 600, color: '#4b5563' }}>{r.type}</td>
                  <td style={{ padding: '14px 22px', fontSize: 11, fontWeight: 700, color: '#111827' }}>{r.late}</td>
                  <td style={{ padding: '14px 22px', fontSize: 11, fontWeight: 700, color: '#4b5563' }}>{r.pen}</td>
                  <td style={{ padding: '14px 22px' }}>
                    <button style={{ padding: '5px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 800, color: '#374151', background: '#fff', cursor: 'pointer' }}>Lihat Unit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Laporan Evaluasi */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Laporan Evaluasi</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3, marginBottom: 20 }}>Rekomendasi laporan periodik.</div>
          
          <div style={{ background: '#0f4296', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Evaluasi Bulanan Siap Dibuat</div>
            <div style={{ fontSize: 10, color: '#bfdbfe', lineHeight: 1.5, marginBottom: 16 }}>Ringkasan performa bulan ini mencakup SLA, penalti, ranking unit kerja, dan rekomendasi evaluasi.</div>
            <button style={{ width: '100%', padding: '10px', background: '#fff', color: '#0f4296', border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
              Generate Evaluasi Bulanan
            </button>
          </div>

          <div style={{ border: '1px solid #fecaca', background: '#fef2f2', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', marginBottom: 5 }}>Rekomendasi Evaluasi</div>
            <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.5 }}>Kecamatan Cendana perlu evaluasi karena SLA berada di bawah 80%.</div>
          </div>

          <div style={{ border: '1px solid #fecaca', background: '#fef2f2', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', marginBottom: 5 }}>Perhatian Tren Penalti</div>
            <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.5 }}>Penalty trend meningkat pada minggu ke-4. Perlu monitoring beban kerja layanan Akta.</div>
          </div>
        </div>

      </div>
      
    </div>
  );
}
