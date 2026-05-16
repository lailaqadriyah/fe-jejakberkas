import React from 'react';

export function DashboardDinas() {
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
        <button style={{ padding: '10px 20px', borderRadius: 8, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', background: '#1a4fca', color: '#fff' }}>
          Konfirmasi Berkas Diterima
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 18 }}>
        {[
          { label: 'Berkas Masuk', value: 16, sub: 'Diterima hari ini', iconColor: '#3b82f6', iconBg: '#eff6ff', border: '#bfdbfe', icon: <div style={{width: 12, height: 12, background: '#3b82f6', borderRadius: 2}}></div> },
          { label: 'Sedang Diproses', value: 11, sub: 'Dalam tahap Dinas', iconColor: '#10b981', iconBg: '#f0fdf4', border: '#a7f3d0', icon: '▦' },
          { label: 'Menunggu Approval', value: 5, sub: 'Kepala Dinas', iconColor: '#f97316', iconBg: '#fff7ed', border: '#fed7aa', icon: '⏳' },
          { label: 'Terlambat', value: 2, sub: 'Melewati SLA Dinas', iconColor: '#ef4444', iconBg: '#fef2f2', border: '#fecaca', icon: '!' },
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
                  {[
                    { reg: 'JB-2025-00129', nama: 'Siti Aminah', layanan: 'KK Baru', status: 'Verifikasi Database', statusColor: '#2563eb', statusBg: '#eff6ff', statusBorder: '#bfdbfe', sla: '1j 40m tersisa', slaColor: '#2563eb', est: '15:30', showNext: true },
                    { reg: 'JB-2025-00136', nama: 'Andi Saputra', layanan: 'KTP Rusak', status: 'Proses Cetak', statusColor: '#16a34a', statusBg: '#f0fdf4', statusBorder: '#bbf7d0', sla: '55m tersisa', slaColor: '#2563eb', est: '14:45', showNext: true },
                    { reg: 'JB-2025-00138', nama: 'Maya Putri', layanan: 'Akta Baru', status: 'Menunggu Approval', statusColor: '#f97316', statusBg: '#fff7ed', statusBorder: '#fed7aa', sla: '2j 10m tersisa', slaColor: '#2563eb', est: '16:20', showNext: false },
                    { reg: 'JB-2025-00141', nama: 'Rudi Hartono', layanan: 'KK Rusak', status: 'Terlambat', statusColor: '#ef4444', statusBg: '#fef2f2', statusBorder: '#fecaca', sla: 'Lewat 25m', slaColor: '#ef4444', est: '12:30', showNext: true },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none' }}>
                      <td style={{ padding: '13px 18px', fontSize: 11, color: '#2563eb', fontWeight: 700 }}>{row.reg}</td>
                      <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.nama}</td>
                      <td style={{ padding: '13px 18px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.layanan}</td>
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
                        <div style={{ display: 'flex', gap: 6 }}>
                          {row.showNext && <button style={{ padding: '5px 10px', background: '#1a4fca', color: '#fff', border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Next Step</button>}
                          <button style={{ padding: '5px 10px', background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Detail</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alur Proses Dinas */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '18px 22px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Alur Proses Dinas</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3, marginBottom: 18 }}>Tahapan standar setelah berkas diterima di Dinas.</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { num: '✓', title: 'Berkas Diterima', desc: 'Staff Dinas mengonfirmasi berkas fisik sudah masuk.', status: 'Completed', color: '#10b981', bg: '#f0fdf4', border: '#a7f3d0' },
                { num: '2', title: 'Verifikasi Database', desc: 'Pengecekan data pada sistem kependudukan.', status: 'Active', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
                { num: '3', title: 'Input Data', desc: 'Staff memasukkan data ke sistem layanan Dinas.', status: 'Waiting', color: '#f97316', bg: '#fff7ed', border: '#fed7aa' },
                { num: '4', title: 'Proses Cetak', desc: 'Dokumen fisik diproses dan dicetak.', status: 'Not Started', color: '#9ca3af', bg: '#f3f4f6', border: '#e5e7eb' },
                { num: '5', title: 'Menunggu Approval Kepala Dinas', desc: 'Dokumen menunggu validasi akhir dari Kepala Dinas.', status: 'Not Started', color: '#9ca3af', bg: '#f3f4f6', border: '#e5e7eb' },
                { num: '6', title: 'Selesai', desc: 'Dokumen selesai dan siap dikirim kembali ke Kecamatan.', status: 'Not Started', color: '#9ca3af', bg: '#f3f4f6', border: '#e5e7eb' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', border: `1px solid ${step.border}`, borderRadius: 10, background: step.status === 'Completed' || step.status === 'Active' ? '#fff' : '#fafafa' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: step.bg, border: `1px solid ${step.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: step.color, flexShrink: 0 }}>
                    {step.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>{step.title}</div>
                    <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{step.desc}</div>
                  </div>
                  <span style={{ padding: '4px 10px', fontSize: 10, fontWeight: 800, color: step.color, background: step.bg, border: `1px solid ${step.border}`, borderRadius: 6 }}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan SLA */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '18px 22px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f1f3d' }}>Catatan SLA</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3, marginBottom: 16 }}>Informasi tanggung jawab proses.</div>
            
            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#f97316', marginBottom: 4 }}>Perhatian</div>
              <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.5 }}>
                Jika berkas terlambat saat proses Staff Dinas, penalti diberikan kepada Staff Dinas. Jika sudah masuk approval akhir, tanggung jawab berpindah ke Kepala Dinas.
              </div>
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
                type="text" 
                defaultValue="JB-2025-00129" 
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700, color: '#111827', marginBottom: 12, outline: 'none' }} 
              />
              <button style={{ width: '100%', padding: '10px', background: '#93c5fd', color: '#1e3a8a', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                Konfirmasi Berkas Diterima
              </button>
            </div>
          </div>

          {/* Ringkasan Hari Ini */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Ringkasan Hari Ini</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Performa proses layanan Dinas.</div>
            {[
              ['Total Berkas Aktif', '34'],
              ['SLA Tepat Waktu', '88%'],
              ['Rata-rata Proses', '2 Jam 15 Menit'],
              ['Penalti Saya', '2 Poin'],
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
