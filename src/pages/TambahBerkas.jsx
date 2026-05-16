import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Check, FileText, LayoutGrid, BookOpen
} from "lucide-react";

function StepItem({ num, label, label2, done, active }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, opacity: !done && !active ? 0.5 : 1 }}>
      <div style={{
        width: 27, height: 27, borderRadius: "50%", display: "flex", alignItems: "center",
        justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0,
        background: done ? "#10b981" : active ? "#0a58ca" : "#fff",
        color: done || active ? "#fff" : "#6b7280",
        border: !done && !active ? "2px solid #e5e7eb" : "none",
      }}>
        {done ? <Check size={13} strokeWidth={3} /> : num}
      </div>
      <p style={{ fontSize: 11, lineHeight: 1.3, fontWeight: active || done ? 700 : 500, color: active || done ? "#1f2937" : "#6b7280", margin: 0 }}>
        {label}<br />{label2}
      </p>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#374151", marginBottom: 5 }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, color: "#1f2937", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
      />
    </div>
  );
}

function ChecklistItem({ checked, onChange, label }) {
  return (
    <div onClick={onChange} style={{ display: "flex", alignItems: "center", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 8, cursor: "pointer", background: "#fff" }}>
      <div style={{
        width: 17, height: 17, borderRadius: 4, display: "flex", alignItems: "center",
        justifyContent: "center", marginRight: 10, flexShrink: 0,
        background: checked ? "#0a58ca" : "#fff",
        border: checked ? "1px solid #0a58ca" : "1.5px solid #d1d5db",
      }}>
        {checked && <Check size={9} color="#fff" strokeWidth={3} />}
      </div>
      <span style={{ fontSize: 12, fontWeight: checked ? 600 : 500, color: checked ? "#1f2937" : "#6b7280" }}>{label}</span>
    </div>
  );
}

function SummaryRow({ label, value, last }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, paddingBottom: last ? 0 : 10, marginBottom: last ? 0 : 10, borderBottom: last ? "none" : "1px solid #e5e7eb" }}>
      <span style={{ color: "#9ca3af" }}>{label}</span>
      <span style={{ fontWeight: 700, color: "#1f2937" }}>{value}</span>
    </div>
  );
}

export function TambahBerkas() {
  // --- INTEGRASI LOGIKA ---
  const [userLogin, setUserLogin] = useState(null);
  const [formData, setFormData] = useState({
    nama_warga: "",
    nik_warga: "",
    no_kk: "",
    no_hp: "",
    kecamatan: "Kuranji",
    kelurahan: "",
    alamat: "",
    catatan_staff: "",
  });
  const [selectedLayanan, setSelectedLayanan] = useState("1"); // Default: KTP (1)
  const [selectedSkenario, setSelectedSkenario] = useState("1"); // Default: Baru (1)
  const [checklist, setChecklist] = useState({ kk: true, polisi: false, foto: false });
  const [isLoading, setIsLoading] = useState(false);
  const [noRegResult, setNoRegResult] = useState("JB-2025-XXXXX");

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUserLogin(JSON.parse(savedUser));
    } catch (e) {
      localStorage.removeItem("user");
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.nama_warga || !formData.nik_warga) {
      Swal.fire({ icon: "warning", title: "Data Kurang", text: "Nama dan NIK wajib diisi!", confirmButtonColor: "#112340" });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/daftar-berkas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          layanan: selectedLayanan,
          sub_layanan: selectedSkenario,
          penanggung_jawab_id: userLogin?.id_staf || "STAFF_ANONYMOUS",
          id_kecamatan_asal: userLogin?.id_kecamatan || "kuranji",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setNoRegResult(result.no_registrasi);
        Swal.fire({ icon: "success", title: "Pendaftaran Berhasil!", text: "Nomor: " + result.no_registrasi, confirmButtonColor: "#112340" });
      } else {
        Swal.fire({ icon: "error", title: "Gagal", text: result.message, confirmButtonColor: "#112340" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Koneksi Gagal", text: "Tidak dapat terhubung ke server backend.", confirmButtonColor: "#112340" });
    } finally {
      setIsLoading(false);
    }
  };

  const layananList = [
    { id: "1", icon: <FileText size={16} />, name: "KTP-el", desc: "Perekaman, penggantian, atau cetak ulang KTP elektronik." },
    { id: "2", icon: <LayoutGrid size={16} />, name: "Kartu Keluarga", desc: "Pembuatan, perubahan data, atau cetak ulang KK." },
    { id: "3", icon: <BookOpen size={16} />, name: "Akta Kelahiran", desc: "Penerbitan akta baru, terlambat, atau duplikat." },
  ];

  const skenarioList = [
    { id: "1", label: "Baru / Perekaman" },
    { id: "2", label: "Rusak / Hilang" },
    { id: "3", label: "Perubahan Data" },
  ];

  const steps = [
    { num: 1, label: "Pilih", label2: "Layanan", done: noRegResult !== "JB-2025-XXXXX" },
    { num: 2, label: "Pilih", label2: "Skenario", done: noRegResult !== "JB-2025-XXXXX" },
    { num: 3, label: "Data", label2: "Pemohon", active: noRegResult === "JB-2025-XXXXX" },
    { num: 4, label: "Checklist", label2: "Berkas" },
    { num: 5, label: "Nomor", label2: "Registrasi", active: noRegResult !== "JB-2025-XXXXX" },
  ];

  return (
    <div style={{ width: "100%", padding: "0 24px", boxSizing: "border-box", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>

        {/* Card Header */}
        <div style={{ padding: "18px 26px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#112340" }}>Form Pengajuan Layanan</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Petugas: {userLogin?.nama_lengkap || "Staff"}</div>
          </div>
          <button style={{ padding: "7px 14px", background: "#fff", border: "1px solid #e5e7eb", color: "#374151", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            Simpan Draft
          </button>
        </div>

        {/* Stepper */}
        <div style={{ padding: "14px 26px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center" }}>
          {steps.reduce((acc, step, i) => {
            acc.push(<StepItem key={step.num} {...step} />);
            if (i < steps.length - 1)
              acc.push(<div key={`l${i}`} style={{ flex: 1, height: 1.5, background: "#e5e7eb", margin: "0 10px" }} />);
            return acc;
          }, [])}
        </div>

        {/* Body */}
        <div style={{ display: "flex", gap: 28, padding: "22px 26px", alignItems: "flex-start" }}>

          {/* Left column */}
          <div style={{ flex: 1.4, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

            {/* Step 1 */}
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#1f2937" }}>Step 1 — Pilih Jenis Layanan</div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, marginBottom: 14 }}>Pilih layanan yang diajukan oleh masyarakat.</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {layananList.map(({ id, icon, name, desc }) => {
                  const sel = selectedLayanan === id;
                  return (
                    <div key={id} onClick={() => setSelectedLayanan(id)} style={{
                      border: sel ? "2px solid #93c5fd" : "1px solid #e5e7eb",
                      background: sel ? "#eff6ff" : "#fff",
                      borderRadius: 12, padding: 14, cursor: "pointer", position: "relative",
                    }}>
                      {sel && (
                        <div style={{ position: "absolute", top: 9, right: 9, width: 16, height: 16, background: "#0a58ca", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Check size={9} color="#fff" strokeWidth={3} />
                        </div>
                      )}
                      <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, border: "1px solid", background: sel ? "#fff" : "#f8fafc", borderColor: sel ? "#bfdbfe" : "#f1f5f9", color: sel ? "#0a58ca" : "#9ca3af" }}>
                        {icon}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#1f2937", marginBottom: 2 }}>{name}</div>
                      <div style={{ fontSize: 10, color: "#9ca3af", lineHeight: 1.4 }}>{desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#1f2937" }}>Step 2 — Pilih Skenario</div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, marginBottom: 14 }}>Skenario menyesuaikan kebutuhan layanan.</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {skenarioList.map(({ id, label }) => {
                  const active = selectedSkenario === id;
                  return (
                    <button key={id} onClick={() => setSelectedSkenario(id)} style={{
                      padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                      border: active ? "1px solid #0a58ca" : "1px solid #e5e7eb",
                      background: active ? "#0a58ca" : "#fff",
                      color: active ? "#fff" : "#374151",
                    }}>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#1f2937" }}>Step 3 — Data Pemohon</div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, marginBottom: 14 }}>Lengkapi data masyarakat yang mengajukan layanan.</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 18px" }}>
                <Field label="Nama Lengkap" name="nama_warga" value={formData.nama_warga} onChange={handleInputChange} placeholder="Andi Saputra" />
                <Field label="NIK" name="nik_warga" value={formData.nik_warga} onChange={handleInputChange} placeholder="16 digit NIK" />
                <Field label="Nomor KK" name="no_kk" value={formData.no_kk} onChange={handleInputChange} placeholder="Masukkan nomor KK" />
                <Field label="Nomor HP" name="no_hp" value={formData.no_hp} onChange={handleInputChange} placeholder="Masukkan nomor HP" />
                <Field label="Kecamatan" name="kecamatan" value={formData.kecamatan} onChange={handleInputChange} defaultValue="Kuranji" />
                <Field label="Kelurahan/Desa" name="kelurahan" value={formData.kelurahan} onChange={handleInputChange} placeholder="Kelurahan Melati" />
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#374151", marginBottom: 5 }}>Alamat</label>
                  <textarea name="alamat" value={formData.alamat} onChange={handleInputChange} rows={3} placeholder="Masukkan alamat lengkap" style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#374151", marginBottom: 5 }}>Catatan Staff</label>
                  <textarea name="catatan_staff" value={formData.catatan_staff} onChange={handleInputChange} rows={3} placeholder="Tambahkan catatan jika diperlukan" style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
              </div>
            </div>

          

          </div>

          {/* Right column */}
          <div style={{ width: 340, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Ringkasan */}
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#112340", marginBottom: 14 }}>Ringkasan Pengajuan</div>
              <SummaryRow label="Layanan" value={selectedLayanan === "1" ? "KTP-el" : selectedLayanan === "2" ? "KK" : "Akta"} />
              <SummaryRow label="Skenario" value={selectedSkenario === "1" ? "Baru" : selectedSkenario === "2" ? "Rusak" : "Ubah Data"} />
              <SummaryRow label="Nama" value={formData.nama_warga || "—"} />
              <SummaryRow label="Petugas" value={userLogin?.nama_lengkap.split(" ")[0] || "Staff"} />
              <SummaryRow label="Status Awal" value="Berkas Diterima" last />
            </div>

            {/* Step 5 */}
            <div style={{ background: "#112340", borderRadius: 12, padding: 18, color: "#fff" }}>
              <div style={{ fontSize: 11, color: "#93c5fd", fontWeight: 500, marginBottom: 4 }}>Step 5 — Nomor Registrasi</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5, marginBottom: 14 }}>{noRegResult}</div>
              {[
                { label: "Estimasi Kecamatan", value: "Menghitung..." },
                { label: "Status", value: noRegResult !== "JB-2025-XXXXX" ? "Terdaftar" : "Draft", last: true },
              ].map(({ label, value, last }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, paddingBottom: last ? 0 : 10, marginBottom: last ? 0 : 10, borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
                  <span style={{ color: "#9ca3af" }}>{label}</span>
                  <span style={{ color: "#fff", fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 26px", borderTop: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button style={{ padding: "8px 18px", background: "#fff", border: "1px solid #e5e7eb", color: "#374151", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Kembali
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: "8px 14px", background: "#fff", border: "1px solid #0a58ca", color: "#0a58ca", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              Salin Nomor
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              style={{ padding: "8px 18px", background: isLoading ? "#9ca3af" : "#0a58ca", border: "none", color: "#fff", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: isLoading ? "default" : "pointer" }}>
              {isLoading ? "Memproses..." : "Mulai Tracking"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}