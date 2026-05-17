import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, FileText, User, MapPin } from 'lucide-react';

const API = 'http://localhost:3000/api';

export function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/berkas?search=${query}`);
        const json = await res.json();
        if (json.success) {
          setResults(json.data);
        }
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
    else setLoading(false);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
        <h1 className="text-3xl font-bold text-[#112340] mb-2">Hasil Pencarian</h1>
        <p className="text-gray-500">
          Menampilkan hasil untuk: <span className="font-semibold text-blue-600">"{query}"</span>
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <div 
              key={item.no_registrasi}
              onClick={() => navigate(`/tracking/${item.no_registrasi}`)}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                  {item.no_registrasi}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-semibold">{item.nama_warga}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <FileText className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{item.layanan === 1 ? 'KTP' : item.layanan === 2 ? 'KK' : 'Akta'}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="truncate">{item.posisi_berkas.replace(/_/g, ' ')}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Status Tahapan:</span>
                  <span className="font-medium text-blue-600">
                    {item.tahapan_sekarang || 'KECAMATAN'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-16 text-center border border-dashed border-gray-200 shadow-sm">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <Search size={40} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            Maaf, kami tidak menemukan berkas dengan nomor registrasi atau nama warga tersebut.
          </p>
        </div>
      )}
    </div>
  );
}
