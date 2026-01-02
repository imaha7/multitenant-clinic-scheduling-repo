# NestJS Application

## 📌 Deskripsi

Aplikasi ini adalah backend API yang dibangun menggunakan **NestJS**, dirancang dengan arsitektur modular, scalable, dan siap untuk production. Aplikasi ini mendukung dokumentasi API menggunakan **Swagger (OpenAPI)** serta dapat dengan mudah diintegrasikan dengan frontend seperti **Next.js**.

---

## 🚀 Tech Stack

* **Node.js**
* **NestJS**
* **TypeScript**
* **Swagger / OpenAPI**
* **ORM** (TypeORM / Prisma / Sequelize – sesuaikan dengan project)
* **Database** (PostgreSQL / MySQL / MongoDB – sesuaikan)

---

---

## ⚙️ Instalasi

### 1️⃣ Clone repository

```bash
git clone <repository-url>
cd <project-name>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variable

Buat file `.env`:

```env
DB_HOST=xxx
DB_PORT=xxx
DB_USERNAME=xxx
DB_PASSWORD=xxx
DB_NAME=xxx
```

---

## ▶️ Menjalankan Aplikasi

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

Aplikasi akan berjalan di:

```
http://localhost:3000
```

---

## 📖 API Documentation (Swagger)

Swagger tersedia di:

```
http://localhost:3000/api-docs
```

Swagger digunakan untuk:

* Melihat seluruh endpoint
* Melihat request & response schema
* Mencoba API langsung dari browser

---

## 🔐 Authentication (Jika Ada)

Aplikasi ini menggunakan **JWT Bearer Authentication**.

### Cara menggunakan di Swagger:

1. Login terlebih dahulu untuk mendapatkan token
2. Klik tombol **Authorize**
3. Masukkan token:

```
Bearer <your_token>
```

---

## 🧪 Testing

```bash
npm run test
npm run test:e2e
```

---

## 🧠 Best Practice yang Digunakan

* Modular architecture
* DTO & Validation
* Environment-based configuration
* Swagger documentation
* Separation of concerns (Controller, Service, Module)

---

## 📦 Build Output

Hasil build berada di folder:

```
dist/
```

---

## 🛠️ Scripts

| Command      | Description    |
| ------------ | -------------- |
| `start`      | Run app        |
| `start:dev`  | Run dev mode   |
| `build`      | Build app      |
| `start:prod` | Run production |
| `test`       | Unit test      |

---

## 📄 License

MIT License

---

## ✨ Catatan

Pastikan environment variable sudah benar sebelum menjalankan aplikasi. Dokumentasi Swagger sebaiknya hanya diaktifkan pada environment development.

---

# Next.js Application

## 📌 Deskripsi

Aplikasi ini adalah **web application** yang dibangun menggunakan **Next.js (App Router)** dengan pendekatan modern untuk performa, SEO, dan skalabilitas. Aplikasi ini dapat berfungsi sebagai **frontend** yang terhubung ke backend (misalnya NestJS API) atau sebagai **fullstack app** menggunakan API Routes / Server Actions.

---

## 🚀 Tech Stack

* **Next.js** (App Router)
* **React**
* **TypeScript**
* **Tailwind CSS** *(jika digunakan)*
* **Fetch API / SWR / React Query**
* **ESLint & Prettier**

---

## ⚙️ Instalasi

### 1️⃣ Clone repository

```bash
git clone <repository-url>
cd <project-name>
```

### 2️⃣ Install dependencies

```bash
npm install
# atau
yarn install
```

## ▶️ Menjalankan Aplikasi

### Development

```bash
npm run dev
```

Buka browser:

```
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## 🧪 Testing (Opsional)

```bash
npm run test
```

---

## 🧠 Best Practice yang Digunakan

* App Router (Next 13+)
* Minimal `useEffect`
* Server-first data fetching
* Component-based architecture
* Environment-based configuration
* Clean folder structure

---

## 🛠️ Scripts

| Command | Description            |
| ------- | ---------------------- |
| `dev`   | Run development server |
| `build` | Build production app   |
| `start` | Run production server  |
| `lint`  | Run ESLint             |

---

## 📦 Build Output

```
.next/
out/
```

---

## 🌍 Deployment

Aplikasi ini dapat di-deploy ke:

* **Vercel** (recommended)
* **Docker + VPS**
* **Netlify**

---

## 📄 License

MIT License

---

## ✨ Catatan

Pastikan backend API sudah berjalan sebelum menjalankan aplikasi ini jika aplikasi bergantung pada external service.

Happy coding 🚀

