import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API = 'http://localhost:3000/api';

const DINAS_ORDER = [
  'VERIFIKASI_BERKAS_DINAS',
  'VERIFIKASI_SIAK',
  'PROSES_CETAK',
  'DOKUMEN_SELESAI',
  'DOKUMEN_DIKIRIM_KE_KECAMATAN',
  'SIAP_DIAMBIL_DI_KECAMATAN',
  'SELESAI',
];

const ALUR_STEPS = [
  { key: 'BERKAS_DITERIMA', label: 'Berkas Diterima', desc: 'Berkas sudah ada di Dinas dan siap diproses.' },
  { key: 'VERIFIKASI_BERKAS_DINAS', label: 'Verifikasi Database', desc: 'Pengecekan data berkas sesuai dengan data yang ada.' },
  { key: 'VERIFIKASI_SIAK', label: 'Input Data', desc: 'Petugas memasukan data berkas ke dalam Sistem Dinas.' },
  { key: 'PROSES_CETAK', label: 'Proses Cetak', desc: 'Berkas dicetak oleh petugas Dinas setelah dinyatakan valid.' },
  { key: 'DOKUMEN_SELESAI', label: 'DOKUMEN SELESAI', desc: 'Dokumen selesai dan siap dikirim balik ke Kecamatan.' },
  { key: 'SIAP_DIAMBIL_DI_KECAMATAN', label: 'Siap Diambil di Kecamatan', desc: 'Dokumen telah dikirim balik ke Kecamatan dan menunggu pengambilan.' },
  { key: 'SELESAI', label: 'Selesai', desc: 'Proses berkas selesai.' },
];

export function DashboardDinas() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [berkasDinas, setBerkasDinas] = useState([]);
  const [berkasMenunggu, setBerkasMenunggu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [konfirmasiNoReg, setKonfirmasiNoReg] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, dinasRes, menungguRes] = await Promise.all([
        fetch(`${API}/berkas/stats`),
        fetch(`${API}/berkas?tahapan=DINAS`),
        fetch(`${API}/berkas?status=KONFIRMASI_WARGA_KE_DINAS`),
      ]);
      const statsJson = await statsRes.json();
      const dinasJson = await dinasRes.json();
      const menungguJson = await menungguRes.json();
      if (statsJson.success) setStats(statsJson.data);
      if (dinasJson.success) setBerkasDinas(dinasJson.data);
      if (menungguJson.success) setBerkasMenunggu(menungguJson.data);
    } catch (err) {
      console.error('Gagal fetch data dinas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const konfirmasiTerimaFromList = async (noReg) => {
    const confirm = await Swal.fire({
      icon: 'question',
      title: 'Konfirmasi Terima Berkas?',
      text: `Berkas ${noReg} akan dipindahkan ke tahap VERIFIKASI_BERKAS_DINAS.`,
      showCancelButton: true,
      confirmButtonText: 'Ya, Konfirmasi',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#112340',
    });
    if (!confirm.isConfirmed) return;
    try {
      const res = await fetch(`${API}/update-status/${noReg}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          posisi_berkas_baru: 'VERIFIKASI_BERKAS_DINAS',
          penanggung_jawab_baru_id: 'STAFF_DINAS',
          tahapan_baru: 'DINAS',
          keterangan_log: 'Berkas diterima di Dinas, mulai proses verifikasi.',
        }),
      });
      const json = await res.json();
      if (json.success) {
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: `Berkas ${noReg} masuk tahap Dinas.`, confirmButtonColor: '#112340' }).then(() => fetchData());
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: json.message, confirmButtonColor: '#112340' });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Koneksi Gagal', text: 'Tidak dapat terhubung ke server.', confirmButtonColor: '#112340' });
    }
  };

  const konfirmasiTerimaManual = async () => {
    if (!konfirmasiNoReg.trim()) {
      Swal.fire({ icon: 'warning', title: 'Input Kosong', text: 'Masukkan nomor registrasi terlebih dahulu.', confirmButtonColor: '#112340' });
      return;
    }
    await konfirmasiTerimaFromList(konfirmasiNoReg.trim());
    setKonfirmasiNoReg('');
  };

  const nextStep = async (noReg) => {
    try {
      const berkas = berkasDinas.find(b => b.no_registrasi === noReg);
      if (!berkas) return;
      const dinasOrder = berkas.dinas_sequence && berkas.dinas_sequence.length > 0 ? berkas.dinas_sequence : DINAS_ORDER;
      const currentIdx = dinasOrder.indexOf(berkas.posisi_berkas);
      if (currentIdx === -1 || currentIdx >= dinasOrder.length - 1) {
        Swal.fire({ icon: 'warning', title: 'Tahap Akhir', text: 'Berkas sudah di tahap akhir.', confirmButtonColor: '#112340' });
        return;
      }
      const nextPos = dinasOrder[currentIdx + 1];
      const res = await fetch(`${API}/update-status/${noReg}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          posisi_berkas_baru: nextPos,
          penanggung_jawab_baru_id: 'STAFF_DINAS',
          tahapan_baru: 'DINAS',
          keterangan_log: `Berkas lanjut ke tahap: ${nextPos}`,
        }),
      });
      const json = await res.json();
      if (json.success) {
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: `Berkas ${noReg} maju ke ${nextPos.replace(/_/g, ' ')}.`, confirmButtonColor: '#112340' }).then(() => fetchData());
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: json.message, confirmButtonColor: '#112340' });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Koneksi Gagal', text: 'Tidak dapat terhubung ke server.', confirmButtonColor: '#112340' });
    }
  };

  const getStatusStyle = (posisi) => {
    const map = {
      'KONFIRMASI_WARGA_KE_DINAS': { label: 'Menunggu Konfirmasi', color: '#d97706', bg: '#fefce8', border: '#fde047' },
      'VERIFIKASI_BERKAS_DINAS': { label: 'Verifikasi Database', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
      'VERIFIKASI_SIAK': { label: 'Verifikasi SIAK', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
      'PROSES_CETAK': { label: 'Proses Cetak', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
      // VALIDASI_PEJABAT removed from flow; treat DOKUMEN_SELESAI as waiting finalization
      'DOKUMEN_SELESAI': { label: 'Dokumen Selesai', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
      'SIAP_DIAMBIL_DI_KECAMATAN': { label: 'Lewat 2Jam', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
    };
    return map[posisi] || { label: posisi.replace(/_/g, ' '), color: '#6b7280', bg: '#f3f4f6', border: '#e5e7eb' };
  };

  // Build dashboard-specific displayed order based on first berkas in queue
  const getDashboardOrder = () => {
    if (!berkasDinas || berkasDinas.length === 0) return ['BERKAS_DITERIMA', ...DINAS_ORDER];
    const first = berkasDinas[0];
    const seq = Array.isArray(first.dinas_sequence) && first.dinas_sequence.length > 0 ? first.dinas_sequence : DINAS_ORDER;
    return ['BERKAS_DITERIMA', ...seq];
  };

  const getDashboardStepState = (stepKey, index, order, firstBerkas) => {
    if (!firstBerkas) return 'not_started';
    // map posisi_berkas to index within order
    const currentPos = firstBerkas.posisi_berkas;
    let currentIdx = order.indexOf(currentPos);
    // If currentPos is not part of the dinas sequence but represents a post-dinas status,
    // treat as all steps completed.
    const postDinasStatuses = ['DOKUMEN_DIKIRIM_KE_KECAMATAN', 'DOKUMEN_SELESAI', 'SIAP_DIAMBIL_DI_KECAMATAN'];
    if (currentIdx === -1 && postDinasStatuses.includes(currentPos)) {
      currentIdx = order.length; // mark as past last
    }
    if (index < currentIdx) return 'completed';
    if (index === currentIdx) return 'active';
    // Special: if index === 0 (BERKAS_DITERIMA) and currentIdx > 0 then completed
    if (index === 0 && currentIdx > 0) return 'completed';
    return 'not_started';
  };

  // Feature flag: show the Alur Proses Dinas panel on dashboard
  const SHOW_ALUR_DINAS = false;

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, fontFamily: 'sans-serif', fontSize: 13, color: '#6b7280' }}>
        Memuat data dashboard Dinas...
      </div>
    );
  }

  const terlambat = berkasDinas.filter(b => b.posisi_berkas === 'SIAP_DIAMBIL_DI_KECAMATAN').length;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: 13, background: '#f5f6fa', minHeight: '100vh' }}>

      {/* ───── TOP BANNER ───── */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0f1f3d' }}>Dashboard Staff Dinas</div>
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Staf Dinas &nbsp;/&nbsp; Staf Berkas</div>
        </div>
        {/* Konfirmasi moved to TrackingDetail: removed top button to avoid duplicate entry point */}
      </div>

      <div style={{ padding: '20px 28px' }}>

        {/* ───── KONFIRMASI TAHAP BANNER ───── */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>📋</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d' }}>Konfirmasi Tahap Dinas</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
              Aktifkan tracking tahap Dinas setelah menerima fisik dokumen dari masyarakat.
            </div>
          </div>
        </div>

        {/* ───── METRIC CARDS ───── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
          {[
            { label: 'Berkas Masuk', value: berkasMenunggu.length, sub: 'Diterima hari ini', icon: '📥', iconBg: '#eff6ff', border: '#bfdbfe' },
            { label: 'Sedang Diproses', value: stats?.sedang_diproses ?? 0, sub: 'Dalam proses Dinas', icon: '⚙️', iconBg: '#f0fdf4', border: '#bbf7d0' },
            { label: 'Menunggu Finalisasi', value: berkasDinas.filter(b => b.posisi_berkas === 'DOKUMEN_SELESAI').length, sub: 'Menunggu finalisasi/pengiriman', icon: '✍️', iconBg: '#fff7ed', border: '#fed7aa' },
            { label: 'Terlambat', value: terlambat, sub: 'Perlu penanganan', icon: '⚠️', iconBg: '#fef2f2', border: '#fecaca' },
          ].map((m, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', border: `1.5px solid ${m.border}`, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: m.iconBg, border: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                {m.icon}
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.label}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#0f1f3d', lineHeight: 1.1, margin: '3px 0 2px' }}>{m.value}</div>
                <div style={{ fontSize: 10, color: '#9ca3af' }}>{m.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ───── BERKAS AKTIF DINAS ───── */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', marginBottom: 18 }}>
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d' }}>Berkas Aktif Dinas</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Daftar berkas yang sedang diproses pada tahap Dinas.</div>
            </div>
            <button style={{ padding: '5px 12px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 11, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
              Semua Status ▾
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                  {['No. Registrasi', 'Nama Warga', 'Layanan', 'Status Proses', 'SLA', 'Estimasi', 'Aksi'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', fontSize: 10, fontWeight: 800, color: '#374151', textAlign: 'left', whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {berkasDinas.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: 24, textAlign: 'center', color: '#9ca3af', fontSize: 12 }}>Belum ada berkas di tahap Dinas.</td></tr>
                ) : berkasDinas.map((row, i) => {
                  const st = getStatusStyle(row.posisi_berkas);
                      const dinasOrderForRow = row.dinas_sequence && row.dinas_sequence.length > 0 ? row.dinas_sequence : DINAS_ORDER;
                      const currentIdxForRow = dinasOrderForRow.indexOf(row.posisi_berkas);
                      const isNextable = currentIdxForRow !== -1 && currentIdxForRow < dinasOrderForRow.length - 1;
                  return (
                    <tr key={i} style={{ borderBottom: i < berkasDinas.length - 1 ? '1px solid #f3f4f6' : 'none', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '12px 16px', fontSize: 11, color: '#2563eb', fontWeight: 700 }}>{row.no_registrasi}</td>
                      <td style={{ padding: '12px 16px', fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.nama_warga}</td>
                      <td style={{ padding: '12px 16px', fontSize: 11, color: '#374151' }}>{row.layanan === 1 ? 'KTP' : row.layanan === 2 ? 'KK' : 'Akta'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '3px 9px', fontSize: 10, fontWeight: 700, color: st.color, background: st.bg, border: `1px solid ${st.border}`, borderRadius: 5, whiteSpace: 'nowrap' }}>
                          {st.label}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#2563eb' }}>{row.estimasi_ml_kecamatan?.range || '-'}</td>
                      <td style={{ padding: '12px 16px', fontSize: 11, color: '#374151' }}>{row.estimasi_ml_kecamatan?.predicted_minutes ? `${row.estimasi_ml_kecamatan.predicted_minutes}m` : '-'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {isNextable && (
                            <button onClick={() => nextStep(row.no_registrasi)} style={{ padding: '5px 11px', background: '#1a4fca', color: '#fff', border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>
                              Next Step
                            </button>
                          )}
                          <button onClick={() => navigate(`/tracking-dinas/${row.no_registrasi}`)} style={{ padding: '5px 10px', background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
                            Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ───── BOTTOM GRID ───── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18, alignItems: 'flex-start' }}>

          {/* LEFT: Alur Proses + SLA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Alur Proses Dinas (hidden by feature flag) */}
            {SHOW_ALUR_DINAS && (
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d' }}>Alur Proses Dinas</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Tahapan standar berkas di Dinas yang harus dilalui di Dinas.</div>
                </div>
                <div style={{ padding: '10px 20px 16px' }}>
                  {(() => {
                    const order = getDashboardOrder();
                    const first = berkasDinas && berkasDinas.length > 0 ? berkasDinas[0] : null;
                    return order.map((stepKey, i) => {
                      const state = getDashboardStepState(stepKey, i, order, first);
                      const isCompleted = state === 'completed';
                      const isActive = state === 'active';
                      const isLast = i === order.length - 1;
                      const st = getStatusStyle(stepKey);
                      const label = stepKey === 'BERKAS_DITERIMA' ? 'Berkas Diterima' : st.label;
                      const desc = stepKey === 'BERKAS_DITERIMA' ? 'Berkas sudah ada di Dinas dan siap diproses.' : '';
                      return (
                        <div key={stepKey} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative', paddingBottom: isLast ? 0 : 4 }}>
                          {!isLast && (
                            <div style={{ position: 'absolute', left: 15, top: 32, width: 2, height: 'calc(100% - 8px)', background: isCompleted ? '#22c55e' : '#e5e7eb', zIndex: 0 }} />
                          )}
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: isCompleted ? '#22c55e' : isActive ? '#2563eb' : '#f3f4f6', border: `2px solid ${isCompleted ? '#16a34a' : isActive ? '#1d4ed8' : '#d1d5db'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, position: 'relative' }}>
                            {isCompleted ? (
                              <span style={{ color: '#fff', fontSize: 13, fontWeight: 900 }}>✓</span>
                            ) : (
                              <span style={{ fontSize: 10, fontWeight: 800, color: isActive ? '#fff' : '#9ca3af' }}>{i + 1}</span>
                            )}
                          </div>
                          <div style={{ flex: 1, padding: '4px 0 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ fontSize: 12, fontWeight: 700, color: isCompleted ? '#16a34a' : isActive ? '#1d4ed8' : '#374151' }}>{label}</div>
                              {isCompleted && (
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 5, padding: '2px 8px' }}>Completed</span>
                              )}
                              {isActive && (
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 5, padding: '2px 8px' }}>Active</span>
                              )}
                              {!isCompleted && !isActive && i === 1 && (
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#d97706', background: '#fefce8', border: '1px solid #fde047', borderRadius: 5, padding: '2px 8px' }}>Waiting</span>
                              )}
                              {!isCompleted && !isActive && i > 1 && (
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 5, padding: '2px 8px' }}>Not Started</span>
                              )}
                            </div>
                            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>{desc}</div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {/* Catatan SLA */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d' }}>Catatan SLA</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Informasi terkait SLA pada proses Dinas.</div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#854d0e', marginBottom: 8 }}>⚠ Perhatian</div>
                  <div style={{ fontSize: 11, color: '#92400e', lineHeight: 1.7 }}>
                    Jika ada berkas yang melewati batas waktu proses Staff Dinas, segera lakukan koordinasi dengan kepala dinas untuk percepatan. Usahakan tidak ada berkas yang menginap lebih dari 1 hari di tahap Dinas.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Konfirmasi + Ringkasan */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Konfirmasi Berkas */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d' }}>Konfirmasi Berkas</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Input tracking berkas dari Kecamatan ke Dinas.</div>
              </div>
              {/* <die style={{ padding: '18px 20px 20px', background: '#1a4fca', margin: 16, borderRadius: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Input Nomor Registrasi</div>
                <div style={{ fontSize: 11, color: '#93c5fd', marginBottom: 14 }}>Gunakan nomor registrasi dari berkas yang datang dari Kecamatan untuk memulai proses.</div>
                <input
                  value={konfirmasiNoReg}
                  onChange={e => setKonfirmasiNoReg(e.target.value)}
                  placeholder="IB-2025-XXXXX"
                  onKeyDown={e => e.key === 'Enter' && konfirmasiTerimaManual()}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 7, border: '1.5px solid #3b82f6', fontSize: 12, outline: 'none', boxSizing: 'border-box', marginBottom: 10, color: '#0f1f3d' }}
                />
                <button
                  onClick={konfirmasiTerimaManual}
                  style={{ width: '100%', padding: '10px', background: '#fff', color: '#1a4fca', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
                >
                  Konfirmasi Berkas Diterima
                </button>
              </die> */}

              {/* Berkas menunggu list */}
              {berkasMenunggu.length > 0 && (
                <div style={{ padding: '0 16px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#d97706', marginBottom: 8 }}>
                    {berkasMenunggu.length} berkas menunggu konfirmasi
                  </div>
                  {berkasMenunggu.map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < berkasMenunggu.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#2563eb' }}>{row.no_registrasi}</div>
                        <div style={{ fontSize: 10, color: '#6b7280' }}>{row.nama_warga} · {row.layanan === 1 ? 'KTP' : row.layanan === 2 ? 'KK' : 'Akta'}</div>
                      </div>
                        <div style={{ display: 'flex', gap: 5 }}>
                        {/* Terima moved to TrackingDetail, keep only Detail here */}
                        <button onClick={() => navigate(`/tracking-dinas/${row.no_registrasi}`)} style={{ padding: '4px 8px', background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>Detail</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ringkasan Hari Ini */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0f1f3d', marginBottom: 4 }}>Ringkasan Hari Ini</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16 }}>Performa proses layanan Dinas.</div>
              {[
                ['Total Berkas Aktif', stats?.total_berkas ?? 0],
                ['SLA Tepat Waktu', `${stats?.sla_tepat_waktu ?? 0}%`],
                ['Rata-rata Proses', stats?.rata_rata_proses ?? '2 Jam 16 Menit'],
                ['Penilai Saya', `${stats?.penilai ?? 0} Poin`],
              ].map(([label, val], i, arr) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <span style={{ fontSize: 11, color: '#6b7280' }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>{val}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}