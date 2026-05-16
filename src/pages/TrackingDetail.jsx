import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Check } from "lucide-react";

function StatusBadge({ status }) {
  const map = {
    completed: { label: "Completed", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
    inprogress: { label: "In Progress", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
    waiting: { label: "Waiting", color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
    notstarted: { label: "Not Started", color: "#6b7280", bg: "#f3f4f6", border: "#f3f4f6" },
  };
  const s = map[status] || map.notstarted;
  return (
    <span style={{ padding: "3px 8px", border: `1px solid ${s.border}`, color: s.color, background: s.bg, borderRadius: 8, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

function StepCircle({ step }) {
  const { num, status } = step;
  if (status === "completed") return (
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#22c55e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 10 }}>
      <Check size={18} strokeWidth={3} />
    </div>
  );
  if (status === "inprogress") return (
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 10, fontSize: 14, fontWeight: 700, boxShadow: "0 0 0 6px #eff6ff" }}>
      {num}
    </div>
  );
  if (status === "waiting") return (
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff7ed", color: "#f97316", border: "1px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 10, fontSize: 14, fontWeight: 700 }}>
      {num}
    </div>
  );
  return (
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f9fafb", color: "#9ca3af", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 10, fontSize: 14, fontWeight: 700 }}>
      {num}
    </div>
  );
}

export function TrackingDetail() {
  const { id, no_registrasi } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const regNo = id || no_registrasi;

  useEffect(() => {
    if (!regNo) {
      setLoading(false);
      return;
    }

    const fetchTracking = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/tracking/${regNo}`);
        const result = await response.json();
        if (result.success) setData(result.data);
      } catch (error) {
        console.error("Gagal sinkron BE:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTracking();
  }, [regNo]);

  // Polling: refresh tracking data every 5s to reflect dinas confirmation / real-time updates
  useEffect(() => {
    if (!regNo) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tracking/${regNo}`);
        const j = await res.json();
        if (j.success && j.data) {
          setData(j.data);
        }
      } catch (e) {
        // ignore polling errors
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [regNo]);

  // Hanya step kecamatan yang dikelola dari TrackingDetail (staff kecamatan)
  const kecamatanOrder = [
    "VERIFIKASI_BERKAS_KECAMATAN",
    "PEMBUATAN_SURAT_PENGANTAR",
    "MENUNGGU_TTD_CAMAT",
    "SELESAI_KECAMATAN",
  ];

  const handleNextStep = async () => {
    const posisi = data.posisi_berkas;
    const currentIdx = kecamatanOrder.indexOf(posisi);

    if (currentIdx === -1 || currentIdx >= kecamatanOrder.length - 1) {
      Swal.fire({ icon: "info", title: "Tahap Kecamatan Selesai", text: "Proses kecamatan sudah selesai. Lanjutan diproses oleh Staff Dinas.", confirmButtonColor: "#112340" });
      return;
    }

    setActionLoading(true);
    try {
      const nextPos = kecamatanOrder[currentIdx + 1];
      const res = await fetch(`http://localhost:3000/api/update-status/${data.no_registrasi}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          posisi_berkas_baru: nextPos,
          penanggung_jawab_baru_id: "STAFF_KECAMATAN",
          tahapan_baru: "KECAMATAN",
          keterangan_log: `Berkas lanjut ke tahap: ${nextPos}`,
        }),
      });
      const json = await res.json();
      if (json.success) {
        if (json.data) setData(json.data);
        Swal.fire({ icon: "success", title: "Berhasil!", text: `Berkas maju ke tahap ${nextPos.replace(/_/g, " ")}!`, confirmButtonColor: "#112340" });
      } else {
        Swal.fire({ icon: "error", title: "Gagal", text: json.message, confirmButtonColor: "#112340" });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Koneksi Gagal", text: "Tidak dapat terhubung ke server.", confirmButtonColor: "#112340" });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Memuat Detail Tracking...</div>;
  if (!data) return <div style={{ padding: 40 }}>Berkas tidak ditemukan.</div>;

  const fullOrder = [
    "VERIFIKASI_BERKAS_KECAMATAN",
    "PEMBUATAN_SURAT_PENGANTAR",
    "MENUNGGU_TTD_CAMAT",
    "SELESAI_KECAMATAN",
    "KONFIRMASI_WARGA_KE_DINAS",
    "VERIFIKASI_BERKAS_DINAS",
    "VERIFIKASI_SIAK",
    "PROSES_CETAK",
    "DOKUMEN_SELESAI",
    "SIAP_DIAMBIL_DI_KECAMATAN",
    "SELESAI",
  ];

  // Build displayedOrder: always include kecamatan steps first, then KONFIRMASI_WARGA_KE_DINAS,
  // then use dinas_sequence (if provided) or default dinas steps, then SIAP_DIAMBIL_DI_KECAMATAN and SELESAI
  const defaultDinas = ['VERIFIKASI_BERKAS_DINAS', 'VERIFIKASI_SIAK', 'PROSES_CETAK', 'DOKUMEN_SELESAI'];
  const dinasSection = Array.isArray(data.dinas_sequence) && data.dinas_sequence.length > 0 ? data.dinas_sequence : defaultDinas;
  const displayedOrder = [
    "VERIFIKASI_BERKAS_KECAMATAN",
    "PEMBUATAN_SURAT_PENGANTAR",
    "MENUNGGU_TTD_CAMAT",
    "SELESAI_KECAMATAN",
    "KONFIRMASI_WARGA_KE_DINAS",
    ...dinasSection,
    "DOKUMEN_DIKIRIM_KE_KECAMATAN",
    "SIAP_DIAMBIL_DI_KECAMATAN",
    "SELESAI",
  ];

  let actualPosisi = data.posisi_berkas;
  if (actualPosisi === 'SELESAI_DIAMBIL') actualPosisi = 'SELESAI';
  const currentIndex = displayedOrder.indexOf(actualPosisi);
  const isSelesai = actualPosisi === 'SELESAI';
  
  const getStepStatus = (idx) => {
    if (isSelesai) return "completed";
    if (currentIndex === -1) return "notstarted";
    return idx < currentIndex ? "completed" : idx === currentIndex ? "inprogress" : "notstarted";
  };

  // Determine whether to show Dinas action panel based on caller (query) or user role
  const location = useLocation();
  const fromParam = new URLSearchParams(location.search).get('from');
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const myRole = (savedUser.role || '').toString().toLowerCase();
  const dinasStartIdx = displayedOrder.indexOf("KONFIRMASI_WARGA_KE_DINAS");
  const isFaseDinas = currentIndex >= dinasStartIdx;
  // Priority: explicit caller route wins. If route is tracking-dinas -> show dinas panel.
  let showDinasPanel = false;
  if (location.pathname.includes('/tracking-dinas') || fromParam === 'dinas') showDinasPanel = true;
  else if (fromParam === 'kecamatan') showDinasPanel = false;
  else showDinasPanel = (myRole.includes('dinas')) || data.tahapan_sekarang === 'DINAS';

  const humanTitle = (pos) => {
    const map = {
      'ANTREAN_LOKET_DINAS': 'Antrean Loket Dinas',
      'REKAM_BIOMETRIK': 'Rekam Biometrik',
      'VALIDASI_DATA_TUNGGAL': 'Validasi Data Tunggal',
      'PROSES_CETAK_KTP': 'Proses Cetak KTP',
      'VALIDASI_PENGAJUAN_KTP_RUSAK': 'Validasi Pengajuan KTP Rusak',
      'ANTREAN_CETAK': 'Antrean Cetak',
      'PROSES_PERUBAHAN_BIODATA': 'Proses Perubahan Biodata',
      'VALIDASI_PERUBAHAN_DATA': 'Validasi Perubahan Data',
      'ENTRI_DRAF_KK': 'Entri Draf KK',
      'VALIDASI_PEJABAT_TERKAIT': 'Validasi Pejabat Terkait',
      'SERTIFIKASI_TTE_KADIS': 'Sertifikasi TTE Kadis',
      'PROSES_CETAK_KK': 'Proses Cetak KK',
      'VALIDASI_PEJABAT_DISDUKCAPIL': 'Validasi Pejabat Disdukcapil',
      'PENGAJUAN_TTE_KADIS': 'Pengajuan TTE Kadis',
      'MENUNGGU_PERSETUJUAN_BSRE': 'Menunggu Persetujuan BSRE',
      'VERIFIKASI_SIAK_DAN_LOKET': 'Verifikasi SIAK dan Loket',
      'VALIDASI_KASI_PENCATATAN_SIPIL': 'Validasi Kasi Pencatatan Sipil',
      'VERIFIKASI_DRAF_PRODUKSI': 'Verifikasi Draf Produksi',
      'PROSES_CETAK_REGISTER': 'Proses Cetak Register',
      'VERIFIKASI_DATA_REGISTRASI': 'Verifikasi Data Registrasi',
      'PEMBUATAN_DUPLIKAT_AKTA': 'Pembuatan Duplikat Akta',
      'REKAM_DATABASE_KEPENDUDUKAN': 'Rekam Database Kependudukan',
      'TANDA_TANGAN_KADIS': 'Tanda Tangan Kadis',
      'PEMBETULAN_INPUTAN_DATA': 'Pembetulan Inputan Data',
      'DOKUMEN_DIKIRIM_KE_KECAMATAN': 'Dokumen Dikirim ke Kecamatan',
      'SIAP_DIAMBIL_DI_KECAMATAN': 'Siap Diambil di Kecamatan',
      'SELESAI': 'Dokumen Telah Diambil',
    };
    return map[pos] || pos.replace(/_/g, ' ');
  };

  // Kecamatan hanya bisa Next Step di step 0–2 (index 0,1,2 → ke SELESAI_KECAMATAN)
  const isKecamatanSelesai = currentIndex >= 3; // SELESAI_KECAMATAN dst
  const isLayerInteredat = data.posisi_berkas === "KONFIRMASI_WARGA_KE_DINAS";
  const canNextStep = currentIndex >= 0 && currentIndex < 3; // hanya 3 langkah pertama

  const isKecamatanReceiving = data.posisi_berkas === "DOKUMEN_DIKIRIM_KE_KECAMATAN";

  const timelineSteps = displayedOrder.map((pos, i) => ({
    num: i + 1,
    title: humanTitle(pos),
    desc: '',
    status: getStepStatus(i),
    key: pos,
  }));

  return (
    <div style={{ width: "100%", maxWidth: "1450px", margin: "0 auto", padding: 24, fontFamily: "system-ui, -apple-system, sans-serif", display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Top Card */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "28px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#112340", letterSpacing: -1, margin: 0 }}>{data.no_registrasi}</h2>
            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Detail tracking pengajuan layanan masyarakat</p>
          </div>
          <button style={{ padding: "8px 16px", border: "1px solid #bfdbfe", color: "#2563eb", borderRadius: 10, fontSize: 11, fontWeight: 700, background: "#fff", cursor: "pointer" }}>
            Verifikasi Dokumen
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { label: "Nama Warga", value: data.nama_warga },
            { label: "Layanan", value: data.layanan === 1 ? "KTP" : data.layanan === 2 ? "KK" : "Akta" },
            { label: "PIC Saat Ini", value: data.penanggung_jawab_id || "Staff" },
            { label: "Estimasi Selesai", value: data.kalkulasi_sla?.estimasi_selesai ? new Date(data.kalkulasi_sla.estimasi_selesai).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "-" },
            { label: "SLA", value: `${data.kalkulasi_sla?.sisa_waktu_menit} menit tersisa`, blue: true },
            { label: "Status Saat Ini", value: data.posisi_berkas.replace(/_/g, " ") },
            { label: "Nomor HP", value: data.no_hp || "-" },
            { label: "Kecamatan", value: data.id_kecamatan_asal },
          ].map(({ label, value, blue }) => (
            <div key={label} style={{ background: "rgba(249,250,251,0.5)", border: "1px solid #f3f4f6", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 4px" }}>{label}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: blue ? "#2563eb" : "#1f2937", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", width: "100%" }}>
        <div style={{ flex: 1.4, display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>

          {/* Status Utama */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "22px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 4px" }}>Status Utama</h3>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 20px" }}>Ringkasan posisi berkas dan risiko penalti.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Status", value: data.posisi_berkas.replace(/_/g, "\n") },
                { label: "Progress", value: `${Math.max(currentIndex + 1, 1)} dari ${displayedOrder.length} tahap` },
                { label: "PIC", value: data.penanggung_jawab_id || "Staff" },
                { label: "Penalty Risk", value: data.kalkulasi_sla?.status_peringatan || "Aman", green: data.kalkulasi_sla?.status_peringatan === "Aman" },
              ].map(({ label, value, green }) => (
                <div key={label} style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: "14px 16px" }}>
                  <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 4px" }}>{label}</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: green ? "#22c55e" : "#1f2937", margin: 0, whiteSpace: "pre-line" }}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{ height: 8, width: "100%", background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${((currentIndex + 1) / Math.max(displayedOrder.length, 1)) * 100}%`, background: "#3b82f6", borderRadius: 99 }} />
            </div>
          </div>

          {/* Timeline Progress */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "32px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 4px" }}>Timeline Progress</h3>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, transparent, #e5e7eb, transparent)", zIndex: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                {timelineSteps.map((step) => (
                  <div key={step.num} style={{ display: "flex", alignItems: "center", gap: 16, opacity: step.status === "notstarted" ? 0.6 : 1 }}>
                    <StepCircle step={step} />
                    <div style={{ flex: 1, border: step.status === "inprogress" ? "2px solid #bfdbfe" : "1px solid #f3f4f6", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <div>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: step.status === "notstarted" ? "#6b7280" : "#1f2937", margin: "0 0 3px" }}>{step.title}</h4>
                        <p style={{ fontSize: 10, color: step.status === "notstarted" ? "#9ca3af" : "#6b7280", margin: 0 }}>{step.desc}</p>
                      </div>
                      <StatusBadge status={step.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Card: show Kecamatan actions or Dinas actions depending on tahapan */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "22px 24px" }}>
            {!showDinasPanel ? (
              <>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 4px" }}>Aksi Staff Kecamatan</h3>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 16px" }}>Gunakan tombol aksi sesuai kondisi proses berkas saat ini.</p>

                {isKecamatanSelesai && !showDinasPanel && (
                  <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#854d0e", margin: "0 0 4px" }}>
                      {isLayerInteredat ? "Menunggu Warga Membawa Berkas ke Dinas" : "Proses Kecamatan Selesai"}
                    </p>
                    <p style={{ fontSize: 11, color: "#a16207", margin: 0 }}>
                      {isLayerInteredat
                        ? "Warga perlu membawa berkas dan surat pengantar ke Dinas. Admin Dinas akan mengkonfirmasi penerimaan."
                        : data.posisi_berkas === "SELESAI_KECAMATAN" 
                          ? "Menunggu warga menekan tombol 'Lanjut ke Dinas' di aplikasi mobile untuk melanjutkan proses."
                          : "Berkas telah selesai diproses di Kecamatan. Warga akan membawa berkas ke Dinas untuk diproses lebih lanjut."}
                    </p>
                  </div>
                )}

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {canNextStep ? (
                    <button onClick={handleNextStep} disabled={actionLoading} style={{ padding: "9px 22px", background: actionLoading ? "#9ca3af" : "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: actionLoading ? "default" : "pointer" }}>
                      {actionLoading ? "Memproses..." : "Next Step"}
                    </button>
                  ) : isKecamatanReceiving ? (
                    <button onClick={async () => {
                      setActionLoading(true);
                      try {
                        const res = await fetch(`http://localhost:3000/api/update-status/${data.no_registrasi}`, {
                          method: 'PUT', headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ posisi_berkas_baru: 'SIAP_DIAMBIL_DI_KECAMATAN', penanggung_jawab_baru_id: 'STAFF_KECAMATAN', tahapan_baru: 'KECAMATAN', keterangan_log: 'Dokumen telah diterima di Kecamatan dan siap diambil warga.' })
                        });
                        const j = await res.json();
                        if (j.success && j.data) setData(j.data);
                        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Dokumen ditandai Siap Diambil.', confirmButtonColor: '#112340' });
                      } catch (e) {
                        console.error(e);
                      } finally { setActionLoading(false); }
                    }} disabled={actionLoading} style={{ padding: "9px 22px", background: actionLoading ? "#9ca3af" : "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: actionLoading ? "default" : "pointer" }}>
                      Konfirmasi Terima (Siap Diambil)
                    </button>
                  ) : (
                    <button disabled style={{ padding: "9px 22px", background: "#f3f4f6", color: "#9ca3af", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "not-allowed" }}>
                      {showDinasPanel 
                        ? "Diproses Staff Dinas" 
                        : data.posisi_berkas === 'SELESAI' 
                          ? "Selesai" 
                          : data.posisi_berkas === 'SELESAI_KECAMATAN' 
                            ? "Menunggu Konfirmasi Warga (Mobile)" 
                            : data.posisi_berkas === 'SIAP_DIAMBIL_DI_KECAMATAN'
                              ? "Menunggu Konfirmasi Pengambilan (Mobile)"
                              : "Menunggu Proses Dinas"}
                    </button>
                  )}
                  <button style={{ padding: "9px 22px", background: "#fff", color: "#2563eb", border: "1px solid #93c5fd", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Tambah Catatan</button>
                  <button style={{ padding: "9px 22px", background: "#fff", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Tandai Bermasalah</button>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 4px" }}>Aksi Staff Dinas</h3>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 16px" }}>Gunakan tombol aksi untuk memproses berkas sesuai alur dinas.</p>

                <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#1e40af", margin: "0 0 4px" }}>Berkas Sedang Diproses Dinas</p>
                  <p style={{ fontSize: 11, color: "#1d4ed8", margin: 0 }}>Lakukan konfirmasi penerimaan atau lanjutkan ke langkah berikutnya.</p>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {data.posisi_berkas === 'KONFIRMASI_WARGA_KE_DINAS' && (
                    <button onClick={async () => {
                      setActionLoading(true);
                      try {
                        const res = await fetch(`http://localhost:3000/api/update-status/${data.no_registrasi}`, {
                          method: 'PUT', headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ posisi_berkas_baru: 'VERIFIKASI_BERKAS_DINAS', penanggung_jawab_baru_id: 'STAFF_DINAS', tahapan_baru: 'DINAS', keterangan_log: 'Konfirmasi penerimaan oleh Dinas dari UI Tracking' })
                        });
                        const j = await res.json();
                        if (j.success && j.data) setData(j.data);
                        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Berkas berhasil dikonfirmasi dan masuk tahap Dinas.', confirmButtonColor: '#112340' });
                      } catch (e) {
                        console.error(e);
                        Swal.fire({ icon: 'error', title: 'Gagal', text: 'Koneksi ke server bermasalah.', confirmButtonColor: '#112340' });
                      } finally { setActionLoading(false); }
                    }} disabled={actionLoading} style={{ padding: '9px 22px', background: actionLoading ? '#9ca3af' : '#16a34a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: actionLoading ? 'default' : 'pointer' }}>
                      {actionLoading ? 'Memproses...' : 'Konfirmasi Terima'}
                    </button>
                  )}

                  {currentIndex < 4 && (
                    <button disabled style={{ padding: "9px 22px", background: "#f3f4f6", color: "#9ca3af", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "not-allowed" }}>
                      Masih di tahap Kecamatan
                    </button>
                  )}

                  {currentIndex > 4 && data.posisi_berkas !== 'DOKUMEN_DIKIRIM_KE_KECAMATAN' && data.posisi_berkas !== 'SELESAI' && data.posisi_berkas !== 'SIAP_DIAMBIL_DI_KECAMATAN' && data.posisi_berkas !== 'DOKUMEN_SELESAI' && (
                    <button onClick={async () => {
                      setActionLoading(true);
                      try {
                        const dinasOrder = data.dinas_sequence && data.dinas_sequence.length > 0 ? data.dinas_sequence : ['VERIFIKASI_BERKAS_DINAS','VERIFIKASI_SIAK','PROSES_CETAK','DOKUMEN_SELESAI','DOKUMEN_DIKIRIM_KE_KECAMATAN','SIAP_DIAMBIL_DI_KECAMATAN','SELESAI'];
                        const curIdx = dinasOrder.indexOf(data.posisi_berkas);
                        if (curIdx === -1 || curIdx >= dinasOrder.length - 1) { 
                          Swal.fire({ icon: 'info', title: 'Tahap Akhir', text: 'Berkas sudah di tahap akhir.', confirmButtonColor: '#112340' });
                          setActionLoading(false); return; 
                        }
                        const next = dinasOrder[curIdx + 1];
                        const res = await fetch(`http://localhost:3000/api/update-status/${data.no_registrasi}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ posisi_berkas_baru: next, penanggung_jawab_baru_id: 'STAFF_DINAS', tahapan_baru: 'DINAS', keterangan_log: `Berkas lanjut ke tahap: ${next}` }) });
                        const j = await res.json(); 
                        if (j.success && j.data) setData(j.data);
                        Swal.fire({ icon: 'success', title: 'Berhasil!', text: `Berkas maju ke tahap ${next.replace(/_/g, ' ')}!`, confirmButtonColor: '#112340' });
                      } catch (e) { 
                        console.error(e); 
                        Swal.fire({ icon: 'error', title: 'Gagal', text: 'Koneksi ke server bermasalah.', confirmButtonColor: '#112340' });
                      } finally { setActionLoading(false); }
                    }} disabled={actionLoading} style={{ padding: '9px 22px', background: actionLoading ? '#9ca3af' : '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: actionLoading ? 'default' : 'pointer' }}>
                      {actionLoading ? 'Memproses...' : 'Next Step'}
                    </button>
                  )}

                  {data.posisi_berkas === 'SIAP_DIAMBIL_DI_KECAMATAN' && (
                    <button disabled style={{ padding: "9px 22px", background: "#f3f4f6", color: "#9ca3af", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "not-allowed" }}>
                      Menunggu Konfirmasi Pengambilan (Mobile)
                    </button>
                  )}
                  <button style={{ padding: '9px 22px', background: '#fff', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Tandai Bermasalah</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right column */}
        <div style={{ width: 360, flexShrink: 0, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Activity Log */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "22px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 20px" }}>Activity Log</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {data.history?.slice(-5).map((log, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", width: 40, flexShrink: 0 }}>
                    {log.waktu ? new Date(log.waktu._seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "09:00"}
                  </span>
                  <p style={{ fontSize: 11, color: "#374151", margin: 0, lineHeight: 1.4 }}>{log.keterangan}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Document Checklist */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "22px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 14px" }}>Document Checklist</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Fotokopi KK", "Surat Hilang Polisi", "Formulir Permohonan"].map((doc) => (
                <div key={doc} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #f3f4f6", padding: "10px 12px", borderRadius: 12, background: "rgba(249,250,251,0.5)" }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{doc}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#16a34a" }}>Lengkap</span>
                </div>
              ))}
            </div>
          </div>

          {/* Approval History */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "22px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 14px" }}>Approval History</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { name: "Staff Kecamatan", status: currentIndex >= 3 ? "Selesai" : "Diproses", dim: currentIndex < 0 },
                { name: "Camat", status: currentIndex >= 3 ? "Sudah TTD" : "Belum TTD", dim: currentIndex < 2 },
                { name: "Staff Dinas", status: currentIndex >= 5 ? "Diproses" : "Belum Mulai", dim: currentIndex < 4 },
                { name: "Kepala Dinas", status: currentIndex >= 9 ? "Selesai" : "Belum Mulai", dim: currentIndex < 8, last: true },
              ].map(({ name, status, dim, last }) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, paddingBottom: last ? 0 : 12, marginBottom: last ? 0 : 12, borderBottom: last ? "none" : "1px solid #f3f4f6" }}>
                  <span style={{ color: "#6b7280" }}>{name}</span>
                  <span style={{ fontWeight: 700, color: dim ? "#9ca3af" : "#1f2937" }}>{status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan SLA */}
          <div style={{ background: "#f8fafc", borderRadius: 16, border: "1px solid #e5e7eb", padding: "18px 20px" }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: "#1f2937", margin: "0 0 8px" }}>Catatan SLA:</h3>
            <p style={{ fontSize: 10, color: "#9ca3af", margin: 0, lineHeight: 1.6 }}>
              Jika proses verifikasi tidak selesai sebelum estimasi, penalti akan diberikan kepada Staff Kecamatan. Jika sudah masuk tahap TTD, penalti menjadi tanggung jawab Camat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}