import React from 'react';
import { ReportData } from '../types';

interface ReportPreviewProps {
  data: ReportData;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ data }) => {
  // Pad images array to ensure grid maintains shape if fewer than 6 images
  const displayImages = [...data.images];
  while (displayImages.length < 6) {
    displayImages.push("");
  }

  // Format date nicely
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="print-only bg-white w-[210mm] min-h-[297mm] mx-auto p-8 relative box-border font-serif">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
        <div className="w-24 h-24 flex items-center justify-center">
          <img 
            src="https://i.postimg.cc/Bv1qRtCx/lencana-smktd.jpg" 
            alt="Logo SMK Tok Dor" 
            className="max-h-full max-w-full object-contain" 
          />
        </div>
        <div className="text-center flex-1 px-4">
          <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">SMK TOK DOR</h1>
          <h2 className="text-xl font-bold uppercase mb-1">LAPORAN PLC</h2>
          <p className="text-sm italic text-gray-600">One Page Report</p>
        </div>
        <div className="w-24 h-24 flex items-center justify-center">
          {/* TS25 Logo Placeholder - Using a generic education icon as fallback if specific URL fails or is empty, 
              but user asked for where to host. I am providing a placeholder that looks professional. */}
          <img 
            src="https://www.moe.gov.my/images/KPM/UKK/2019/06_Jun/14/TS25.png" 
            onError={(e) => {
                // Fallback if the MOE link doesn't work
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x150.png?text=TS25';
            }}
            alt="Logo TS25" 
            className="max-h-full max-w-full object-contain" 
          />
        </div>
      </div>

      {/* Title */}
      <div className="bg-gray-200 border border-black p-2 text-center font-bold uppercase text-lg mb-4">
        {data.programTitle || "TAJUK PROGRAM / AKTIVITI"}
      </div>

      {/* Main Info Table */}
      <table className="w-full border-collapse border border-black text-sm mb-4">
        <tbody>
          <tr>
            <td className="border border-black p-2 font-bold w-1/4 bg-gray-100">ANJURAN</td>
            <td className="border border-black p-2" colSpan={3}>{data.organizer}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-gray-100">TARIKH</td>
            <td className="border border-black p-2">{formatDate(data.date)}</td>
            <td className="border border-black p-2 font-bold bg-gray-100 w-1/6">MASA</td>
            <td className="border border-black p-2">{data.time}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-gray-100">TEMPAT</td>
            <td className="border border-black p-2" colSpan={3}>{data.venue}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-gray-100">PESERTA / SASARAN</td>
            <td className="border border-black p-2" colSpan={3}>
              <div className="whitespace-pre-wrap">{data.participants}</div>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-gray-100 align-top">OBJEKTIF</td>
            <td className="border border-black p-2 align-top" colSpan={3}>
              <div className="whitespace-pre-wrap min-h-[60px]">{data.objectives}</div>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-gray-100 align-top">STRATEGI PLC</td>
            <td className="border border-black p-2 align-top" colSpan={3}>{data.plcStrategy}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-gray-100 align-top">FOKUS / BUTIRAN</td>
            <td className="border border-black p-2 align-top" colSpan={3}>
               <div className="whitespace-pre-wrap min-h-[80px]">{data.focus}</div>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-gray-100 align-top">DAPATAN / IMPAK</td>
            <td className="border border-black p-2 align-top" colSpan={3}>
               <div className="whitespace-pre-wrap min-h-[80px]">{data.findings}</div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Images Section */}
      <div className="border border-black p-1">
        <div className="bg-gray-200 border-b border-black text-center font-bold p-1 mb-2 text-sm">
          LAPORAN BERGAMBAR
        </div>
        <div className="grid grid-cols-3 gap-2 p-1">
          {displayImages.map((img, index) => (
             <div key={index} className="aspect-[4/3] border border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 relative">
               {img ? (
                 <img src={img} alt={`Gambar ${index + 1}`} className="w-full h-full object-cover" />
               ) : (
                 <span className="text-gray-300 text-xs">Tiada Gambar</span>
               )}
               <div className="absolute bottom-0 left-0 bg-black/50 text-white text-[10px] px-1">
                 {index + 1}
               </div>
             </div>
          ))}
        </div>
      </div>
      
      {/* Footer / Validation Signatures (Optional standard OPR feature) */}
      <div className="mt-8 flex justify-between px-4 text-xs font-bold pt-4">
         <div className="text-center">
            <p className="mb-8">Disediakan Oleh:</p>
            <p className="border-t border-black pt-1 w-48 mx-auto">{data.organizer}</p>
         </div>
         <div className="text-center">
            <p className="mb-8">Disahkan Oleh:</p>
            <p className="border-t border-black pt-1 w-48 mx-auto">Pengetua / PK Pentadbiran</p>
         </div>
      </div>
    </div>
  );
};