import React, { useState } from 'react';

export function DashboardCamat() {
  const [status, setStatus] = useState('available');

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: 13, padding: '20px 24px' }}>          {/* Status Banner */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f0fdf9', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#10b981' }}>✓</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Status Camat Hari Ini: Available</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Camat tersedia di lokasi. Proses TTD mengikuti estimasi normal.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 30, padding: 4, gap: 2 }}>
              <button
                onClick={() => setStatus('available')}
                style={{ padding: '6px 18px', borderRadius: 20, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', background: status === 'available' ? '#10b981' : 'transparent', color: status === 'available' ? '#fff' : '#16a34a' }}
              >
                Available
              </button>
              <button
                onClick={() => setStatus('notavailable')}
                style={{ padding: '6px 18px', borderRadius: 20, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', background: status === 'notavailable' ? '#10b981' : 'transparent', color: status === 'notavailable' ? '#fff' : '#16a34a' }}
              >
                Not Available
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 18 }}>
            {[
              { label: 'Menunggu TTD', value: 7, sub: 'Perlu konfirmasi Camat', icon: '✎', iconColor: '#f97316', iconBg: '#fff7ed', border: '#fed7aa' },
              { label: 'Staff Terlambat', value: 3, sub: 'Melewati SLA verifikasi', icon: '!', iconColor: '#ef4444', iconBg: '#fef2f2', border: '#fecaca' },
              { label: 'Total Penalti Staff', value: 12, sub: 'Akumulasi poin bulan ini', icon: '⚑', iconColor: '#ef4444', iconBg: '#f8fafc', border: '#bfdbfe' },
              { label: 'Berkas Selesai Hari Ini', value: 18, sub: 'Validasi kecamatan selesai', icon: '✓', iconColor: '#10b981', iconBg: '#f0fdf4', border: '#a7f3d0' },
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

            {/* Left Column */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Daftar Menunggu TTD */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Daftar Menunggu TTD</div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Berkas yang membutuhkan konfirmasi tanda tangan Camat.</div>
                  </div>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    Semua Layanan ▾
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
                      {[
                        { reg: 'JB-2025-00129', nama: 'Siti Aminah', layanan: 'KK Baru', staff: 'Siti Nurhaliza', sla: '45m tersisa', slaColor: '#2563eb', status: 'Menunggu TTD', late: false },
                        { reg: 'JB-2025-00133', nama: 'Rizky Maulana', layanan: 'KTP Baru', staff: 'Ahmad Fauzan', sla: '1j 05m', slaColor: '#2563eb', status: 'Menunggu TTD', late: false },
                        { reg: 'JB-2025-00134', nama: 'Maya Putri', layanan: 'Akta Baru', staff: 'Dewi Kartika', sla: 'Lewat 20m', slaColor: '#ef4444', status: 'Terlambat', late: true },
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
                          <td style={{ padding: '13px 18px', fontSize: 11, color: '#2563eb', fontWeight: 700 }}>{row.reg}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.nama}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.layanan}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, color: '#4b5563' }}>{row.staff}</td>
                          <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 700, color: row.slaColor }}>{row.sla}</td>
                          <td style={{ padding: '13px 18px' }}>
                            <span style={{
                              display: 'inline-block', padding: '4px 9px', fontSize: 10, fontWeight: 800,
                              color: row.late ? '#ef4444' : '#f97316',
                              background: row.late ? '#fef2f2' : '#fff7ed',
                              border: `1px solid ${row.late ? '#fecaca' : '#fed7aa'}`,
                              borderRadius: 5, whiteSpace: 'nowrap',
                            }}>
                              {row.status}
                            </span>
                          </td>
                          <td style={{ padding: '13px 18px' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button style={{ padding: '5px 10px', background: '#1a4fca', color: '#fff', border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Konfirmasi</button>
                              <button style={{ padding: '5px 10px', background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Detail</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Monitoring Staff */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14 }}>
                <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Monitoring Staff Kecamatan</div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>Performa staff berdasarkan SLA dan jumlah berkas.</div>
                  </div>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 10, fontWeight: 700, color: '#374151', background: '#fff', cursor: 'pointer' }}>
                    Bulan Ini ▾
                  </button>
                </div>
                <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { name: 'Siti Nurhaliza', pct: '89%', total: 28, tepat: 25, terlambat: 3, penalti: '3 Poin' },
                    { name: 'Ahmad Fauzan', pct: '94%', total: 19, tepat: 18, terlambat: 1, penalti: '1 Poin' },
                    { name: 'Dewi Kartika', pct: '100%', total: 22, tepat: 22, terlambat: 0, penalti: '0 Poin' },
                  ].map((s) => (
                    <div key={s.name} style={{ border: '1px solid #f3f4f6', borderRadius: 12, padding: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>{s.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#22c55e' }}>{s.pct}</span>
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

            </div>

            {/* Right Column */}
            <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Quick Approval */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Quick Approval</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Konfirmasi cepat untuk berkas prioritas.</div>
                <div style={{ background: '#1a4fca', borderRadius: 12, padding: 22, color: '#fff', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 6 }}>JB-2025-00129</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 18 }}>KK Baru atas nama Siti Aminah sedang menunggu TTD Camat.</div>
                  <button style={{ width: '100%', padding: 10, background: '#fff', color: '#1a4fca', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                    Konfirmasi TTD Selesai
                  </button>
                </div>
              </div>

              {/* Ringkasan */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Ringkasan Kecamatan</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Performa pelayanan hari ini.</div>
                {[
                  ['Total Berkas Aktif', '42'],
                  ['SLA Tepat Waktu', '91%'],
                  ['Rata-rata Proses', '38 Menit'],
                  ['Penalti Hari Ini', '4 Poin'],
                ].map(([label, val], i, arr) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <span style={{ fontSize: 11, color: '#6b7280' }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Penalty Monitoring */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Penalty Monitoring</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Aktivitas pelanggaran SLA terbaru.</div>
                {[
                  { title: '- 1 Poin Staff Kecamatan', desc: 'JB-2025-00130 melewati SLA 35 menit. PIC: Staff Kecamatan.' },
                  { title: '- 1 Poin Staff Kecamatan', desc: 'Verifikasi dokumen terlambat pada layanan Akta Kelahiran.' },
                ].map((p, i) => (
                  <div key={i} style={{ border: '1px solid #fecaca', background: 'rgba(254,242,242,0.5)', borderRadius: 10, padding: 14, marginBottom: i === 0 ? 10 : 0 }}>
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