🚀 VIMA CLI


VIMA CLI is a powerful scaffolding tool to quickly generate production-ready
frontend and backend projects with multiple variants based on modern tech stacks.

It helps developers avoid repetitive setup and start building immediately.



-------------------------------------------------------------------------------------------------
📦 Installation
-------------------------------------------------------------------------------------------------


Install globally from npm:

    =================================
    |  npm install -g vima-clt      |
    =================================


Verify installation:

    =================================
    |  vima --help                 |
    =================================



-------------------------------------------------------------------------------------------------
⚡ Usage
-------------------------------------------------------------------------------------------------


VIMA CLI provides 4 variants each for backend and frontend.

Backend commands:

    =================================
    |  vima backend 1              |
    |  vima backend 2              |
    |  vima backend 3              |
    |  vima backend 4              |
    =================================


Frontend commands:

    =================================
    |  vima frontend 1             |
    |  vima frontend 2             |
    |  vima frontend 3             |
    |  vima frontend 4             |
    =================================


Each command creates a fully structured project
in the current working directory.



-------------------------------------------------------------------------------------------------
📁 CLI Internal Structure
-------------------------------------------------------------------------------------------------


VIMA-CLI/
│
├── libs/
│   ├── backend/
│   │   ├── V1.js
│   │   ├── V2.js
│   │   ├── V3.js
│   │   └── V4.js
│   │
│   └── frontend/
│
├── test/
│   ├── 1/
│   ├── 2/
│   ├── 3/
│   └── 4/
│
├── index.js        (CLI entry point)
├── package.json
└── README.md



-------------------------------------------------------------------------------------------------
🧩 Backend Variants
-------------------------------------------------------------------------------------------------


-------------------------------------------------
Backend Variant 1
-------------------------------------------------

Stack:
- Express
- MongoDB (Mongoose)
- Firebase Admin
- Helmet, CORS, Rate Limiting

Generated Structure:

backend/
├── db/
├── models/
├── controllers/
├── routes/
├── middleware/
├── config/
├── index.js
└── .env

Best Use:
- Firebase authentication
- MongoDB based projects
- SaaS and startup backends



-------------------------------------------------
Backend Variant 2
-------------------------------------------------

Stack:
- Express
- MongoDB
- JWT Authentication
- bcrypt
- Morgan logging

Generated Structure:

backend/
├── db/
├── models/
├── controllers/
├── routes/
├── middleware/
├── utils/
├── index.js
└── .env

Best Use:
- Auth heavy applications
- MERN stack APIs
- User and role based systems



-------------------------------------------------
Backend Variant 3
-------------------------------------------------

Stack:
- Express
- SQL (PostgreSQL / MySQL / SQLite)
- Prisma ORM
- Zod validation
- Nodemon

Generated Structure:

backend/
├── config/
│   └── prisma.js
├── controllers/
├── routes/
├── middleware/
├── models/
├── utils/
├── prisma/
├── index.js
└── .env

Best Use:
- SQL based systems
- Enterprise applications
- Strong schema enforcement



-------------------------------------------------
Backend Variant 4
-------------------------------------------------

Stack:
- Express
- Prisma (SQLite by default)
- Firebase Admin
- Helmet, Compression

Generated Structure:

backend/
├── config/
│   ├── prisma.js
│   └── firebase.js
├── controllers/
├── routes/
├── middleware/
├── utils/
├── index.js
└── .env

Best Use:
- Firebase auth with SQL database
- Admin dashboards
- Hybrid backend systems



-------------------------------------------------------------------------------------------------
🎨 Frontend Variants
-------------------------------------------------------------------------------------------------


-------------------------------------------------
Frontend Variant 1
-------------------------------------------------

Stack:
- React
- Vite

Best Use:
- Beginners
- Simple React projects
- Quick prototypes



-------------------------------------------------
Frontend Variant 2
-------------------------------------------------

Stack:
- React
- Vite
- Tailwind CSS

Best Use:
- Modern UI development
- Responsive applications
- Landing pages



-------------------------------------------------
Frontend Variant 3
-------------------------------------------------

Stack:
- React
- Vite
- Axios pre-configured
- Auth ready structure

Best Use:
- API driven frontends
- Authentication based apps



-------------------------------------------------
Frontend Variant 4
-------------------------------------------------

Stack:
- Advanced React setup
- Scalable folder structure

Best Use:
- Large applications
- Production ready frontends



-------------------------------------------------------------------------------------------------
▶️ Running Generated Projects
-------------------------------------------------------------------------------------------------


Backend:

    =================================
    |  cd backend                  |
    |  npm install                |
    |  npm start                  |
    =================================


Frontend:

    =================================
    |  cd frontend                 |
    |  npm install                |
    |  npm run dev                |
    =================================



-------------------------------------------------------------------------------------------------
🌟 Why VIMA CLI?
-------------------------------------------------------------------------------------------------


✔ Saves hours of setup time
✔ Clean and scalable architecture
✔ Multiple backend and frontend options
✔ Ideal for students, startups and teams
✔ Production ready by default



-------------------------------------------------------------------------------------------------
📄 License
-------------------------------------------------------------------------------------------------


MIT License © 2025 VIMA
