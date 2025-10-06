# Quran-API – A RESTful API for accessing and exploring Quranic text programmatically

Quran-API is a simple and powerful RESTful API that provides structured access to the Quran. It allows developers to retrieve verses, tafsirs, translations, and manage user-saved verses — ideal for building Islamic apps, educational platforms, or research tools.

---

## 🚀 Features

* 📖 Retrieve Quranic **verses** by surah and ayah
* 📚 Access **tafsir** from multiple sources
* 🔐 User authentication with token verification
* 💾 Save and manage favorite verses
* 🧭 JSON-based responses for easy integration
* ⚡ Lightweight and fast — perfect for web & mobile apps

---

## 🛠 Installation

You can run the API locally using **Node.js** or **Docker**.

### Option 1: Node.js

```bash
git clone https://github.com/yourusername/quran-api.git
cd quran-api
npm install
npm build
npm start
```

For development mode (with auto-reload using nodemon):

```bash
npm run start:dev
```

### Option 2: Docker

```bash
docker compose up --build
```

By default, the API runs on **[http://localhost:3000](http://localhost:3000)**.

---

## 🌐 API Endpoints

### 📖 Quran Routes (`/quran`)

| Method | Endpoint                              | Description                               |
| ------ | ------------------------------------- | ----------------------------------------- |
| GET    | `/quran/:surah/:verse`                | Get a specific verse                      |
| GET    | `/quran/:surah/:verse/tafsir/:tafsir` | Get tafsir for a specific verse           |
| GET    | `/quran/tafsir`                       | List all available tafsir sources         |
| POST   | `/quran/:surah/:verse/save`           | Save a verse to authenticated user’s list |
| GET    | `/quran/saved`                        | Retrieve saved verses for the user        |
| DELETE | `/quran/:verse_id/delete`             | Delete a saved verse                      |

---

### 👤 User Routes (`/users`)

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| GET    | `/users`        | List all users *(admin use)* |
| POST   | `/users/new`    | Register a new user          |
| POST   | `/users/login`  | Login and get an auth token  |

---

## 🔐 Authentication

Certain routes (such as saving or deleting verses) require authentication.
To access these endpoints, you must log in and receive a JWT token.

Example for storing the token in a cookie txt file:

```bash
curl -X POST http://localhost:3000/users/login -H "Content-Type: application/json" -d '{"username": "bob", "password": "password123"}' -c cookie.txt
```
The token is automatically set as an **HTTP-only** cookie in the response.

For subsequent requests to protected routes, include the cookie in your request. For example:

```bash
curl -X POST http://localhost:3000/quran/20/43/save\?note=test -H "Content-Type: application/json" -b cookie.txt
```

## 🧪 Example Response

### `GET /quran/2/255`

```json
{
  "sura_index": 2,
  "sura_name": "البقرة",
  "ayah_number": 255,
  "text": "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ"
}
```

---

## ⚙ Configuration

You can customize port and settings using environment variables:

```
PORT=3000
JWT_SECRET=your_secret_key
DATABASE_URL=postgresql_database_url
```

---

## 🤝 Contributing

Contributions are welcome!
If you’d like to improve the API or add features, feel free to:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a pull request

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🌟 Acknowledgements

* Quran text sourced from [api.quran-tafseer.com](http://api.quran-tafseer.com)
* Tafsir sources courtesy of their respective copyright holders
* Built with ❤️ to make Quranic access easier for developers
