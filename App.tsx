import React, { useState, useRef } from 'react';
import { Input } from './components/Input';
import { TextArea } from './components/TextArea';
import { ReportPreview } from './components/ReportPreview';
import { ReportData, PLC_STRATEGIES } from './types';
import { FileText, Image as ImageIcon, Printer, ArrowLeft, Trash2, Upload } from 'lucide-react';

const App: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState<ReportData>({
    programTitle: '',
    organizer: '',
    date: '',
    time: '',
    venue: '',
    participants: '',
    focus: '',
    objectives: '',
    plcStrategy: 'Lain-lain',
    findings: '',
    images: []
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files) as File[];
      const totalImages = formData.images.length + newFiles.length;
      
      if (totalImages > 6) {
        alert("Maksimum 6 gambar sahaja dibenarkan.");
        return;
      }

      const fileReaders = newFiles.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders).then(images => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...images].slice(0, 6)
        }));
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-500 flex flex-col items-center py-8 preview-mode">
        <div className="no-print w-full max-w-4xl flex justify-between items-center mb-6 px-4">
          <button 
            onClick={() => setIsPreview(false)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali Sunting
          </button>
          
          <div className="text-white font-medium">Pratonton Laporan</div>

          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-bold"
          >
            <Printer size={20} />
            Cetak / Simpan PDF
          </button>
        </div>

        {/* This component becomes the PDF content */}
        <ReportPreview data={formData} />
        
        <div className="no-print mt-8 text-white text-sm opacity-70 text-center max-w-lg">
          <p>Tips: Untuk menyimpan sebagai PDF, klik butang cetak dan pilih "Save as PDF" atau "Microsoft Print to PDF" sebagai pencetak.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 no-print">
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-md shrink-0">
                <img 
                  src="https://i.postimg.cc/Bv1qRtCx/lencana-smktd.jpg" 
                  alt="Logo SMK Tok Dor" 
                  className="w-full h-full object-contain" 
                />
             </div>
             <div>
               <h1 className="text-xl md:text-2xl font-bold tracking-tight">Penjana Laporan PLC SMK Tok Dor</h1>
               <p className="text-xs text-blue-100 font-medium">Sistem Pelaporan One Page Report TS25</p>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2">Maklumat Program</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <Input 
              label="Tajuk Program / Aktiviti" 
              name="programTitle" 
              value={formData.programTitle} 
              onChange={handleInputChange} 
              placeholder="Contoh: Majlis Pelancaran Bulan Bahasa"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Anjuran / Nama Penyelaras" 
                name="organizer" 
                value={formData.organizer} 
                onChange={handleInputChange} 
                placeholder="Panitia Bahasa Melayu"
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Strategi PLC</label>
                <select 
                  name="plcStrategy"
                  value={formData.plcStrategy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {PLC_STRATEGIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input 
                label="Tarikh" 
                name="date" 
                type="date"
                value={formData.date} 
                onChange={handleInputChange} 
              />
              <Input 
                label="Masa" 
                name="time" 
                type="time"
                value={formData.time} 
                onChange={handleInputChange} 
              />
              <Input 
                label="Tempat" 
                name="venue" 
                value={formData.venue} 
                onChange={handleInputChange} 
                placeholder="Dewan Terbuka"
              />
            </div>

            <TextArea 
              label="Nama & No. Kad Pengenalan Peserta" 
              name="participants" 
              value={formData.participants} 
              onChange={handleInputChange} 
              placeholder="Senaraikan nama peserta (atau kumpulan sasaran) di sini..."
              rows={3}
            />

            <TextArea 
              label="Objektif Pelaksanaan" 
              name="objectives" 
              value={formData.objectives} 
              onChange={handleInputChange} 
              placeholder="1. Meningkatkan..."
            />

            <TextArea 
              label="Fokus / Butiran Aktiviti" 
              name="focus" 
              value={formData.focus} 
              onChange={handleInputChange} 
              placeholder="Huraian ringkas perjalanan aktiviti..."
            />

            <TextArea 
              label="Dapatan / Kekuatan / Impak" 
              name="findings" 
              value={formData.findings} 
              onChange={handleInputChange} 
              placeholder="Impak positif aktiviti..."
            />

            {/* Image Upload Section */}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ImageIcon size={20} />
                Muat Naik Gambar
              </h3>
              <p className="text-sm text-gray-500 mb-4">Sila muat naik maksimum 6 keping gambar. (Format: JPG, PNG)</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video group bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      Gambar {idx + 1}
                    </div>
                  </div>
                ))}
                
                {formData.images.length < 6 && (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Tambah Gambar</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                multiple 
                className="hidden" 
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center pb-12">
          <button 
            onClick={() => setIsPreview(true)}
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <FileText size={24} />
            JANA PDF
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;