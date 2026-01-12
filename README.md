# Sistem Pelaporan PLC SMK Tok Dor

Aplikasi web responsif untuk menjana laporan One Page Report (OPR) bagi aktiviti PLC sekolah. Aplikasi ini dibina menggunakan React, TypeScript, dan Tailwind CSS.

## Cara Menggunakan (Untuk Guru)

1. **Isi Maklumat**: Lengkapkan semua butiran program (Tajuk, Tarikh, Masa, Objektif, dll).
2. **Muat Naik Gambar**: Masukkan sehingga 6 keping gambar aktiviti.
3. **Jana Laporan**: Klik butang hijau "JANA PDF".
4. **Simpan PDF**:
   - Di skrin pratonton, klik butang "Cetak / Simpan PDF".
   - Tetingkap pencetak akan keluar.
   - Pada bahagian **Destination** (Destinasi), pilih **Save as PDF**.
   - Klik **Save** dan namakan fail anda.

## Cara "Publish" (Deployment)

Aplikasi ini adalah "Single Page Application" (SPA) berasaskan React.

### Pilihan 1: Vercel (Disyorkan)
1. Muat naik kod ini ke GitHub.
2. Daftar akaun di [Vercel](https://vercel.com).
3. Klik "Add New Project" dan import repository GitHub tadi.
4. Klik "Deploy". Vercel akan memberikan link web yang boleh dikongsikan kepada semua guru.

### Pilihan 2: Netlify
1. Serupa dengan Vercel, daftar di [Netlify](https://netlify.com).
2. Drag & drop folder `dist` (selepas menjalankan `npm run build`) atau sambungkan ke GitHub.

## Pemasangan Local (Untuk Developers)

Pastikan anda mempunyai Node.js dipasang.

```bash
# Install dependencies
npm install

# Jalankan server development
npm run dev
```

## Struktur Projek

- **App.tsx**: Komponen utama yang menguruskan borang.
- **components/ReportPreview.tsx**: Susun atur (layout) laporan A4 untuk PDF.
- **types.ts**: Definisi jenis data untuk laporan.
- **Tailwind**: Digunakan untuk styling antaramuka.

## Nota Penting

Aplikasi ini menggunakan fungsi "Print to PDF" pelayar web. Susun atur laporan direka khusus untuk kertas saiz **A4**. Pastikan setting pencetak ditetapkan kepada:
- **Paper Size**: A4
- **Margins**: Default atau None (CSS akan menguruskan margin)
- **Background Graphics**: Tick/Enable (Penting untuk warna header keluar)
