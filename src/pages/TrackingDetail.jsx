import { useState } from "react";
import { Check } from "lucide-react";

const timelineSteps = [
  { num: 1, title: "Berkas Diterima", desc: "Berkas fisik diterima dan nomor registrasi dibuat.", status: "completed" },
  { num: 2, title: "Verifikasi Dokumen", desc: "Staff Kecamatan memeriksa kelengkapan dokumen.", status: "inprogress" },
  { num: 3, title: "Menunggu TTD Camat", desc: "Berkas akan diteruskan ke Camat untuk validasi akhir.", status: "waiting" },
  { num: 4, title: "Validasi Kecamatan Selesai", desc: "Surat pengantar telah ditandatangani oleh Camat.", status: "notstarted" },
  { num: 5, title: "Menunggu Dibawa ke Dinas", desc: "Masyarakat membawa surat pengantar ke Dinas.", status: "notstarted" },
  { num: 6, title: "Berkas Diterima Dinas", desc: "Staff Dinas mengkonfirmasi berkas diterima.", status: "notstarted" },
  { num: 7, title: "Verifikasi Database", desc: "Data diperiksa pada sistem database kependudukan.", status: "notstarted" },
  { num: 8, title: "Proses Cetak", desc: "Dokumen diproses dan dicetak oleh Dinas.", status: "notstarted" },
  { num: 9, title: "Approval Kepala Dinas", desc: "Menunggu validasi akhir dari Kepala Dinas.", status: "notstarted" },
  { num: 10, title: "Dokumen Selesai", desc: "Dokumen legal selesai diproses.", status: "notstarted" },
  { num: 11, title: "Siap Diambil di Kecamatan", desc: "Dokumen siap diambil oleh masyarakat.", status: "notstarted" },
];

function StatusBadge({ status }) {
  const map = {
    completed: { label: "Completed", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
    inprogress: { label: "In Progress", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
    waiting: { label: "Waiting", color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
    notstarted: { label: "Not Started", color: "#6b7280", bg: "#f3f4f6", border: "#f3f4f6" },
  };
  const s = map[status];
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
  return (
    <div style={{ 
  width: "100%",
  maxWidth: "1450px",
  margin: "0 auto",
  padding: 24,
  fontFamily: "system-ui, -apple-system, sans-serif",
  display: "flex",
  flexDirection: "column",
  gap: 24
}}>

      {/* Top Card */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "28px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#112340", letterSpacing: -1, margin: 0 }}>JB-2025-00128</h2>
            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Detail tracking pengajuan layanan masyarakat</p>
          </div>
          <button style={{ padding: "8px 16px", border: "1px solid #bfdbfe", color: "#2563eb", borderRadius: 10, fontSize: 11, fontWeight: 700, background: "#fff", cursor: "pointer" }}>
            Verifikasi Dokumen
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { label: "Nama Warga", value: "Andi Saputra" },
            { label: "Layanan", value: "KTP Rusak" },
            { label: "PIC Saat Ini", value: "Staff Kecamatan" },
            { label: "Estimasi Selesai", value: "14:30" },
            { label: "SLA", value: "1 jam 20 menit tersisa", blue: true },
            { label: "Status Saat Ini", value: "Verifikasi Dokumen" },
            { label: "Nomor HP", value: "0812-XXXX-7788" },
            { label: "Kecamatan", value: "Kuranji" },
          ].map(({ label, value, blue }) => (
            <div key={label} style={{ background: "rgba(249,250,251,0.5)", border: "1px solid #f3f4f6", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 4px" }}>{label}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: blue ? "#2563eb" : "#1f2937", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom two columns */}
      <div style={{ 
  display: "flex",
  gap: 24,
  alignItems: "flex-start",
  width: "100%"
}}>

        {/* Left column */}
        <div style={{ 
  flex: 1.4,
  display: "flex",
  flexDirection: "column",
  gap: 24,
  minWidth: 0
}}>

          {/* Status Utama */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "22px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 4px" }}>Status Utama</h3>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 20px" }}>Ringkasan posisi berkas dan risiko penalti.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Status", value: "Verifikasi\nDokumen" },
                { label: "Progress", value: "2 dari 11 tahap" },
                { label: "PIC", value: "Staff Kecamatan" },
                { label: "Penalty Risk", value: "Aman", green: true },
              ].map(({ label, value, green }) => (
                <div key={label} style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: "14px 16px" }}>
                  <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 4px" }}>{label}</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: green ? "#22c55e" : "#1f2937", margin: 0, whiteSpace: "pre-line" }}>{value}</p>
                </div>
              ))}
            </div>

            <div style={{ height: 8, width: "100%", background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "18%", background: "#3b82f6", borderRadius: 99 }} />
            </div>
          </div>

          {/* Timeline Progress */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "32px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 4px" }}>Timeline Progress</h3>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 28px" }}>Pantau setiap tahapan pelayanan dari kecamatan hingga selesai.</p>

            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, transparent, #e5e7eb, transparent)", zIndex: 0 }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                {timelineSteps.map((step) => (
                  <div key={step.num} style={{ display: "flex", alignItems: "center", gap: 16, opacity: step.status === "notstarted" ? 0.6 : 1 }}>
                    <StepCircle step={step} />
                    <div style={{
                      flex: 1, background: "#fff",
                      border: step.status === "inprogress" ? "2px solid #bfdbfe" : "1px solid #f3f4f6",
                      borderRadius: 12, padding: "14px 16px",
                      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                    }}>
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

          {/* Action Card */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "22px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 4px" }}>Aksi Staff Kecamatan</h3>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 16px" }}>Gunakan tombol aksi sesuai kondisi proses berkas saat ini.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={{ padding: "9px 22px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Next Step
              </button>
              <button style={{ padding: "9px 22px", background: "#fff", color: "#2563eb", border: "1px solid #93c5fd", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Tambah Catatan
              </button>
              <button style={{ padding: "9px 22px", background: "#fff", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Tandai Bermasalah
              </button>
            </div>
          </div>

        </div>

        {/* Right column */}
        <div style={{ 
  width: 360,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  gap: 24
}}>

          {/* Activity Log */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "22px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#112340", margin: "0 0 20px" }}>Activity Log</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { time: "09:00", text: "Berkas didaftarkan oleh Staff Kecamatan." },
                { time: "09:05", text: "Nomor registrasi JB-2025-00128 dibuat." },
                { time: "09:15", text: "Berkas masuk tahap Verifikasi Dokumen." },
                { time: "09:30", text: "Checklist dokumen lengkap." },
              ].map(({ time, text }) => (
                <div key={time} style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", width: 40, flexShrink: 0 }}>{time}</span>
                  <p style={{ fontSize: 11, color: "#374151", margin: 0, lineHeight: 1.4 }}>{text}</p>
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
                { name: "Staff Kecamatan", status: "Diproses", dim: false },
                { name: "Camat", status: "Belum TTD", dim: true },
                { name: "Staff Dinas", status: "Belum Mulai", dim: true },
                { name: "Kepala Dinas", status: "Belum Mulai", dim: true, last: true },
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