# NestJS Application

## 📌 Description

This application is a backend API built using **NestJS**, designed with a modular, scalable, and production-ready architecture. It supports API documentation using **Swagger (OpenAPI)** and can be easily integrated with frontend applications such as **Next.js**.

---

## 🚀 Tech Stack

- **Node.js**
- **NestJS**
- **TypeScript**
- **Swagger / OpenAPI**
- **ORM** (TypeORM / Prisma / Sequelize – depending on the project)
- **Database** (PostgreSQL / MySQL / MongoDB – depending on the setup)

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd <project-name>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file:

```env
DB_HOST=xxx
DB_PORT=xxx
DB_USERNAME=xxx
DB_PASSWORD=xxx
DB_NAME=xxx
```

---

## ▶️ Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

The application will be available at:

```
http://localhost:3000
```

---

## 📖 API Documentation (Swagger)

Swagger documentation is available at:

```
http://localhost:3000/api-docs
```

Swagger is used to:

- View all available endpoints
- Inspect request and response schemas
- Test APIs directly from the browser

---

## 🔐 Authentication (If Applicable)

This application uses **JWT Bearer Authentication**.

### How to use it in Swagger:

1. Log in to obtain an access token
2. Click the **Authorize** button
3. Enter the token:

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

## 🧠 Best Practices Applied

- Modular architecture
- DTOs and validation
- Environment-based configuration
- Swagger-based API documentation
- Separation of concerns (Controller, Service, Module)

---

## 📦 Build Output

The build output is located in:

```
dist/
```

---

## 🛠️ Scripts

| Command        | Description         |
|---------------|---------------------|
| `start`       | Run application     |
| `start:dev`   | Run in dev mode     |
| `build`       | Build application   |
| `start:prod`  | Run in production   |
| `test`        | Unit testing        |

---

## 📄 License

MIT License

---

## ✨ Notes

Make sure all environment variables are correctly configured before running the application. Swagger documentation should ideally be enabled only in the development environment.

---

# Next.js Application

## 📌 Description

This application is a **web application** built using **Next.js (App Router)** with a modern approach focused on performance, SEO, and scalability. It can function as a **frontend** connected to a backend service (such as a NestJS API) or as a **fullstack application** using API Routes and Server Actions.

---

## 🚀 Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS** *(if used)*
- **Fetch API / SWR / React Query**
- **ESLint & Prettier**

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd <project-name>
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

---

## ▶️ Running the Application

### Development

```bash
npm run dev
```

Open your browser at:

```
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## 🧪 Testing (Optional)

```bash
npm run test
```

---

## 🧠 Best Practices Applied

- App Router (Next.js 13+)
- Minimal usage of `useEffect`
- Server-first data fetching
- Component-based architecture
- Environment-based configuration
- Clean and maintainable folder structure

---

## 🛠️ Scripts

| Command | Description               |
|--------|---------------------------|
| `dev`  | Run development server    |
| `build`| Build production app      |
| `start`| Run production server     |
| `lint` | Run ESLint                |

---

## 📦 Build Output

```
.next/
out/
```

---

## 🌍 Deployment

This application can be deployed to:

- **Vercel** (recommended)
- **Docker + VPS**
- **Netlify**

---

## 📄 License

MIT License

---

## ✨ Notes

Make sure the backend API is running before starting this application if it depends on external services.

Happy coding 🚀