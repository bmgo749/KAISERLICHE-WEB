# Panduan Deployment ke Vercel

## Tentang Vercel
Vercel adalah platform hosting yang cocok untuk aplikasi web modern. Untuk free tier:
- ✅ **Hosting gratis** dengan domain .vercel.app
- ✅ **Custom domain** gratis (kaiserliche.my.id)
- ✅ **SSL otomatis** untuk HTTPS
- ❌ **BUKAN 24/7** - Serverless functions akan "sleep" setelah tidak ada traffic
- ⚠️ **Batasan waktu** - Functions timeout setelah 10 detik (free) / 60 detik (pro)
- ⚠️ **Batasan bandwidth** - 100GB/bulan untuk free tier

## Langkah-Langkah Deployment

### 1. Persiapan Akun Vercel
1. Daftar di [vercel.com](https://vercel.com)
2. Connect dengan GitHub account Anda
3. Import repository proyek ini

### 2. Konfigurasi Environment Variables
Di Vercel dashboard, tambahkan environment variables:
```
NODE_ENV=production
DATABASE_URL=your_postgres_connection_string
```

### 3. Deploy
1. Push code ke GitHub repository
2. Di Vercel dashboard, klik "Deploy"
3. Vercel akan otomatis build dan deploy

### 4. Custom Domain Setup
1. Di Vercel dashboard, pilih project
2. Go to Settings > Domains
3. Add domain: kaiserliche.my.id
4. Update DNS di domain provider:
   - Type: CNAME
   - Name: @
   - Value: cname.vercel-dns.com

## Struktur File untuk Vercel
```
├── api/
│   └── index.ts          # Vercel serverless function entry
├── server/               # Express server code
├── client/               # React client code
├── vercel.json          # Vercel configuration
└── package.json         # Updated build scripts
```

## Limitasi dan Solusi

### WhatsApp Bot
- ⚠️ **Problem**: Vercel serverless functions tidak ideal untuk long-running WebSocket connections
- ✅ **Solusi**: Gunakan Vercel untuk web interface, hosting WhatsApp bot di Replit/Railway

### Database
- ✅ **Recommended**: Gunakan Neon/PlanetScale untuk PostgreSQL
- ✅ **Alternative**: Vercel Postgres (beta)

### File Storage
- ⚠️ **Problem**: Vercel adalah stateless, tidak bisa simpan file lokal
- ✅ **Solusi**: Gunakan cloud storage untuk QR codes dan files

## Alternative: Hybrid Approach
1. **Vercel**: Host web interface dan admin panel
2. **Replit/Railway**: Host WhatsApp bot service
3. **Shared Database**: PostgreSQL di cloud

## Commands
```bash
# Deploy to Vercel
npm run vercel-build
vercel --prod

# Local development
npm run dev
```

## Monitoring
- Vercel dashboard menyediakan logs dan analytics
- Functions akan otomatis scale berdasarkan traffic
- Cold start bisa lambat setelah tidak ada traffic