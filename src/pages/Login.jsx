import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Clock,
  BarChart3,
  CheckCircle2,
  Building2,
  LayoutTemplate,
  FileText
} from 'lucide-react';
import logoImage from '../assets/logo2.png';

const Login = () => {
  // --- STATE UNTUK INTEGRASI BACKEND ---
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // --- FUNGSI LOGIN KE EXPRESS.JS ---
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        
        const role = (data.user.role || '').toString().toLowerCase();
        if (role.includes('kecamatan')) navigate('/home');
        else if (role.includes('camat')) navigate('/camat');
        else if (role.includes('dinas')) navigate('/dinas');
        else if (role.includes('kepala')) navigate('/kepala-dinas');
        else if (role.includes('biro') || role.includes('organisasi')) navigate('/biro-organisasi');
        else navigate('/home');
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg("Gagal terhubung ke server. Pastikan backend Express Anda menyala.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fb] relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-red-50/60 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-50/60 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 lg:p-12 gap-12 max-w-7xl mx-auto w-full">
        
        {/* Left Column - Information */}
        <div className="hidden lg:flex flex-col w-1/2 pr-8">
          <div className="mb-10">
            <img src={logoImage} alt="Jejak Berkas Logo" className="h-15 xl:h-20 object-contain" />
          </div>

          <h1 className="text-4xl xl:text-4xl font-bold text-[#1e3a5f] leading-tight mb-6">
            Satu Sistem, Banyak Manfaat<br/>
            Pelayanan Publik Lebih Cepat,<br/>
            Transparan, dan Akuntabel.
          </h1>

          <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-lg">
            JejakBerkas membantu instansi pemerintah dalam memantau dan mengelola berkas layanan masyarakat secara <span className="text-blue-500 font-semibold italic">real-time</span>.
          </p>

          {/* Illustration Box */}
          <div className="bg-[#eef2f6] rounded-2xl p-8 mb-12 flex items-center justify-center relative overflow-hidden shadow-sm border border-white">
            <div className="absolute top-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-1.5 h-16 bg-gray-300 absolute -top-8 left-1/2 -translate-x-1/2 rounded-t-full"></div>
              <div className="w-12 h-8 bg-red-500 absolute -top-6 left-1/2 border border-red-600 rounded-sm"></div>
              <div className="w-12 h-8 bg-white absolute -top-6 left-1/2 translate-y-8 border border-gray-200 rounded-sm shadow-sm"></div>
              
              <div className="bg-white border-2 border-gray-100 rounded-t-xl px-8 py-3 shadow-sm z-20 mt-8 relative">
                <span className="font-bold text-[#1e3a5f] tracking-widest text-sm">PELAYANAN PUBLIK</span>
              </div>
              <div className="flex space-x-4 bg-white border border-gray-100 p-4 rounded-b-xl shadow-sm w-full max-w-sm justify-between">
                <div className="w-12 h-24 bg-gray-100 rounded-sm"></div>
                <div className="w-12 h-24 bg-gray-100 rounded-sm"></div>
                <div className="w-12 h-24 bg-gray-100 rounded-sm"></div>
                <div className="w-12 h-24 bg-gray-100 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <ShieldCheck className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-xs font-bold text-[#1e3a5f] mb-1">Aman & Terpercaya</h3>
              <p className="text-[10px] text-gray-500 leading-tight px-2">Sistem aman dengan enkripsi data berstandar pemerintah</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-xs font-bold text-[#1e3a5f] mb-1">Real-time Tracking</h3>
              <p className="text-[10px] text-gray-500 leading-tight px-2">Pantau status berkas secara real-time dan transparan</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <BarChart3 className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-xs font-bold text-[#1e3a5f] mb-1">Monitoring Kinerja</h3>
              <p className="text-[10px] text-gray-500 leading-tight px-2">Pantau kinerja pegawai dan instansi secara terukur</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <CheckCircle2 className="w-5 h-5 text-gray-800" />
              </div>
              <h3 className="text-xs font-bold text-[#1e3a5f] mb-1">Akuntabel</h3>
              <p className="text-[10px] text-gray-500 leading-tight px-2">Setiap proses tercatat dan dapat dipertanggungjawabkan</p>
            </div>
          </div>
        </div>

        {/* Right Column - Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100">
            
            <div className="text-center mb-8">
              <h2 className="text-[26px] font-bold text-[#1e3a5f] mb-2 tracking-tight">Selamat Datang Kembali!</h2>
              <p className="text-sm text-gray-500">Silakan masuk untuk melanjutkan<br/>ke JejakBerkas</p>
            </div>

            {/* AREA PESAN ERROR */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 text-center font-medium">
                {errorMsg}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Masukkan username Anda" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-sm font-semibold text-[#0056b3] hover:text-[#004494] transition-colors">
                    Lupa Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Masukkan password Anda" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer">
                  Ingat saya
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#182945] hover:bg-[#111e35] disabled:bg-gray-400 text-white text-base font-bold py-3.5 px-4 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-[#182945]/20 mt-6"
              >
                {isLoading ? "Memproses..." : "Masuk ke Portal"}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <footer className="bg-[#112340] text-white/70 py-4 px-8 text-xs flex flex-col md:flex-row items-center justify-between mt-auto relative z-10">
        <p>© 2026 JejakBerkas - Portal Layanan Publik Nasional</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors flex items-center"><ShieldCheck className="w-3 h-3 mr-1"/> Kebijakan Privasi</a>
          <a href="#" className="hover:text-white transition-colors flex items-center"><FileText className="w-3 h-3 mr-1"/> Syarat & Ketentuan</a>
          <a href="#" className="hover:text-white transition-colors flex items-center"><Building2 className="w-3 h-3 mr-1"/> Kontak Kami</a>
          <a href="#" className="hover:text-white transition-colors">? Bantuan</a>
        </div>
      </footer>

    </div>
  );
};

export default Login;