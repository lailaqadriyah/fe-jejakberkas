import React from 'react';

export function DashboardKepalaDinas() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: 13, padding: '20px 24px' }}>
      
      {/* Top Banner */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#3b82f6' }}>
            ▤
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Monitoring Proses Dinas</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Kepala Dinas memantau performa Staff Dinas, SLA layanan, penalti, dan dokumen aktif.</div>
          </div>
        </div>
        <button style={{ padding: '8px 18px', borderRadius: 20, fontSize: 11, fontWeight: 700, border: '1px solid #fdba74', cursor: 'pointer', background: '#fff7ed', color: '#ea580c' }}>
          2 Proses Terlambat Perlu Dipantau
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 18 }}>
        {[
          { label: 'Berkas Dalam Pengawasan', value: 48, sub: 'Dokumen aktif di Dinas', iconColor: '#3b82f6', iconBg: '#eff6ff', border: '#bfdbfe', icon: '⌖' },
          { label: 'Staff Dinas Terlambat', value: 2, sub: 'Melewati SLA proses', iconColor: '#ef4444', iconBg: '#fef2f2', border: '#fecaca', icon: '!' },
          { label: 'Total Penalti Staff', value: 9, sub: 'Akumulasi bulan ini', iconColor: '#ef4444', iconBg: '#fef2f2', border: '#fecaca', icon: '⚑' },
          { label: 'Dokumen Selesai', value: 31, sub: 'Selesai hari ini', iconColor: '#10b981', iconBg: '#f0fdf4', border: '#a7f3d0', icon: '✓' },
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

        {/* Left Column */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Monitoring Dokumen Aktif */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Monitoring Dokumen Aktif</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Pantau status dokumen yang sedang diproses oleh Staff Dinas.</div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Semua Status ▾
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                    {['No. Registrasi', 'Nama Warga', 'Layanan', 'Staff Dinas', 'Status Proses', 'SLA', 'Estimasi', 'Aksi'].map((h) => (
                      <th key={h} style={{ padding: '10px 18px', fontSize: 10, fontWeight: 800, color: '#111827', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { reg: 'JB-2025-00138', nama: 'Maya Putri', layanan: 'Akta Baru', staff: 'Rina Pramesti', status: 'Menunggu Finalisasi', statusColor: '#f97316', statusBg: '#fff7ed', statusBorder: '#fed7aa', sla: '2j 10m tersisa', slaColor: '#2563eb', est: '16:20' },
                    { reg: 'JB-2025-00142', nama: 'Dewi Lestari', layanan: 'KK Baru', staff: 'Agus Santoso', status: 'Verifikasi Database', statusColor: '#2563eb', statusBg: '#eff6ff', statusBorder: '#bfdbfe', sla: '1j 25m tersisa', slaColor: '#2563eb', est: '15:40' },
                    { reg: 'JB-2025-00144', nama: 'Rudi Hartono', layanan: 'KTP Hilang', staff: 'Rina Pramesti', status: 'Proses Terlambat', statusColor: '#ef4444', statusBg: '#fef2f2', statusBorder: '#fecaca', sla: 'Lewat 18m', slaColor: '#ef4444', est: '13:10' },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
                      <td style={{ padding: '13px 18px', fontSize: 11, color: '#2563eb', fontWeight: 700 }}>{row.reg}</td>
                      <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.nama}</td>
                      <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.layanan}</td>
                      <td style={{ padding: '13px 18px', fontSize: 11, color: '#4b5563' }}>{row.staff}</td>
                      <td style={{ padding: '13px 18px' }}>
                        <span style={{
                          display: 'inline-block', padding: '4px 9px', fontSize: 10, fontWeight: 800,
                          color: row.statusColor, background: row.statusBg,
                          border: `1px solid ${row.statusBorder}`, borderRadius: 5, whiteSpace: 'nowrap',
                        }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 700, color: row.slaColor }}>{row.sla}</td>
                      <td style={{ padding: '13px 18px', fontSize: 11, color: '#111827' }}>{row.est}</td>
                      <td style={{ padding: '13px 18px' }}>
                        <button style={{ padding: '5px 10px', background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}>Lihat Detail</button>
                      </td>
                    </tr>
                  ))}
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
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer' }}>
                Bulan Ini ▾
              </button>
            </div>
            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: 'Rina Pramesti', pct: '88%', pctColor: '#22c55e', total: 34, tepat: 30, terlambat: 4, penalti: '4 Poin' },
                { name: 'Agus Santoso', pct: '94%', pctColor: '#22c55e', total: 29, tepat: 27, terlambat: 2, penalti: '2 Poin' },
                { name: 'Nadia Putri', pct: '97%', pctColor: '#22c55e', total: 31, tepat: 30, terlambat: 1, penalti: '1 Poin' },
              ].map((s) => (
                <div key={s.name} style={{ border: '1px solid #f3f4f6', borderRadius: 12, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>{s.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: s.pctColor }}>{s.pct}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {[['Total', s.total], ['Tepat Waktu', s.tepat], ['Terlambat', s.terlambat], ['Penalti', s.penalti]].map(([label, val]) => (
                      <div key={label}>
                        <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 3 }}>{label}</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Violation Chart */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '18px 22px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>SLA Violation Chart</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3, marginBottom: 20 }}>Distribusi keterlambatan proses Dinas berdasarkan jenis layanan.</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'KTP-el', pct: '18%', width: '18%', color: '#22c55e', bg: '#f0fdf4' },
                { label: 'Kartu Keluarga', pct: '24%', width: '24%', color: '#f59e0b', bg: '#fffbeb' },
                { label: 'Akta Kelahiran', pct: '32%', width: '32%', color: '#ef4444', bg: '#fef2f2' },
              ].map((bar, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>{bar.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>{bar.pct}</span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: bar.width, height: '100%', background: bar.color, borderRadius: 4 }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Alert Keterlambatan */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Alert Keterlambatan</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Proses yang perlu dipantau Kepala Dinas.</div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#ef4444', marginBottom: 8 }}>JB-2025-00144 Terlambat</div>
              <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.5, marginBottom: 16 }}>KTP Hilang atas nama Rudi Hartono melewati SLA 18 menit. PIC: Rina Pramesti.</div>
              <button style={{ width: '100%', padding: '10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                Lihat Detail Proses
              </button>
            </div>
          </div>

          {/* Ringkasan Dinas */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Ringkasan Dinas</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Performa layanan Dinas hari ini.</div>
            {[
              ['Total Berkas Aktif', '48'],
              ['SLA Tepat Waktu', '90%'],
              ['Rata-rata Proses', '2 Jam 05 Menit'],
              ['Proses Terlambat', '2'],
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
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Laporan penalti Staff Dinas terbaru.</div>
            {[
              { title: '+ 1 Poin Staff Dinas', desc: 'JB-2025-00141 melewati SLA saat proses cetak. PIC: Rina Pramesti.' },
              { title: '+ 1 Poin Staff Dinas', desc: 'Verifikasi database terlambat pada layanan Kartu Keluarga.' },
            ].map((p, i) => (
              <div key={i} style={{ border: '1px solid #fecaca', background: 'rgba(254,242,242,0.3)', borderRadius: 10, padding: 14, marginBottom: i === 0 ? 10 : 0 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', marginBottom: 5 }}>{p.title}</div>
                <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
