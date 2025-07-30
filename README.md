
# 📊 Chartify - Dashboard Penjualan & Analisis Data

Chartify adalah aplikasi dashboard visualisasi data penjualan berbasis **React** untuk frontend dan **CodeIgniter 4** + **MongoDB** untuk backend.

## 🚀 Fitur Utama
- Autentikasi user dengan role (Manager & Karyawan)
- CRUD data Login, Barang, dan Transaksi
- Visualisasi data penjualan: grafik penjualan, pendapatan, dan kategori
- Responsive UI menggunakan React

---

## 🛠️ Teknologi yang Digunakan
- **Frontend**: React.js (Vite atau CRA), TailwindCSS (opsional)
- **Backend**: CodeIgniter 4 (CI4)
- **Database**: MongoDB (Atlas atau lokal)
- **API**: RESTful API dengan CORS

---

## 📦 Instalasi Project

### 1. Clone Repository
```bash
git clone https://github.com/namakamu/chartify.git
cd chartify
```

---

## ⚙️ Backend (CodeIgniter 4 + MongoDB)

### 2. Masuk ke folder `backend`
```bash
cd backend
```

### 3. Install Dependencies
```bash
composer install
```

### 4. Atur `.env` (duplikat dari `env`)
```bash
cp env .env
```
Edit file `.env`:
```env
CI_ENVIRONMENT = development
app.baseURL = 'http://localhost:8080/'

database.default.hostname = localhost
database.default.database = chartify
database.default.username = 
database.default.password = 
database.default.DBDriver = MongoDB
```

### 5. Jalankan Server CodeIgniter
```bash
php spark serve
```
Akses API di: `http://localhost:8080`

---

## 💻 Frontend (React.js)

### 6. Masuk ke folder `frontend`
```bash
cd ../frontend
```

### 7. Install Dependencies
```bash
npm install
```

### 8. Konfigurasi Endpoint Backend
Edit file `.env`:
```env
VITE_API_URL=http://localhost:8080
```

### 9. Jalankan React App
```bash
npm run dev
```

Akses aplikasi di: `http://localhost:5173`

---

## ✅ Selesai
Kini kamu bisa mengakses **Chartify** dan mulai menggunakan fitur CRUD & dashboard analitik 🎉

---

## 📚 Struktur Folder
```
chartify/
├── backend/        ← CodeIgniter 4 project
├── frontend/       ← React.js project
```

---

## 🧑‍💻 Kontributor
- Xander Xeverra (@namakamu)
- dll

---

## 📄 Lisensi
MIT License
