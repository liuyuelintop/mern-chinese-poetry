# MERN Chinese Poetry

This project is a full-stack web application that allows users to search for Chinese poetry based on different dynasties, including Tang and Song poems, as well as Shijing. The application uses React for the frontend and Node.js/Express for the backend.

## Features

- View Random classic Poems at Home Page
- Search poems by dynasty (Tang, Song)
- Search Shijing poems
- Pagination support for browsing multiple pages of results
- Responsive design with Tailwind CSS
- RESTful API backend with Express and MongoDB

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Clone the repository

```bash
git clone https://github.com/liuyuelintop/mern-chinese-poetry.git
cd mern-chinese-poetry
```

### Install dependencies

#### Backend

```bash
cd server

npm install

```

#### Frontend

```bash
cd client

npm install

```

## Configuration

### Backend

Create a `.env` file in the `server` directory and add the following environment variables:

```env

MONGO_URI=mongodb://localhost:27017/poetrydb

PORT=5001

```

### Frontend

Update the `API_BASE_URL` in `client/src/api/poem.js` to match your backend URL:

```javascript
const API_BASE_URL = "http://localhost:5001/api";
```

## Running the Application

### Backend

```bash
cd server
npm start
```

The backend server will start on `http://localhost:5001`.

### Frontend

```bash
cd client
npm start
```

## Teck Stack

### Frontend

- React
- React Query
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- async-handler (for handling async operations)
- Cors

## API Endpoints

### Get Poems by Dynasty

```
GET /api/poems/dynasty/:dynasty?page=1&limit=10
```

### Search Shijing

```
GET /api/search/shijing?title=&chapter=&section=&page=1&limit=10
```

## Project Structure

```
mern-chinese-poetry/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├──hooks/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── server/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.

## Contact

- Email: liuyuelintop@gmail.com
- LinkedIn: [Yuelin Liu](https://www.linkedin.com/in/yuelin-liu-867ab6259/)
- GitHub: [liuyuelintop](https://github.com/liuyuelintop)
