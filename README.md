# **Дипломный проект**

> backend

Веб-сервис по поиску фильмом, созданный в рамках сдачи диплома на курсе Веб-разработчик в [Яндекс Практикум](https://practicum.yandex.ru 'сервис онлайн-образования'). Сервис позволяет искать фильмы, сохранять и удалять их в личном кабинете.

### **Структура проекта**

---

- Movie (backend) 🔆 _этот репозиторий_
- [Movie (frontend)](https://github.com/endjoyer/movies-explorer-frontend)

### **API**

---

- `POST /signup` — регистрация пользователя (name, email и password)
- `POST /signin` — авторизация пользователя (email и password, возвращает jwt)
- `GET /users/me` — возвращает информацию о пользователе (email и имя)
- `PATCH /users/me` — обновляет информацию о пользователе (email и имя)
- `GET /movies` — возвращает все сохранённые текущим пользователем фильмы
- `POST /movies` — создаёт фильм (country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail и movieId)
- `DELETE /movies/movieId` — удаляет сохранённый фильм по id

### **Технологии**

---

- сервер на Ubuntu в Яндекс.Облаке
- API сервер `Node.js` + `Express.js`
- база данных `MongoDB` + `Mongoose`
- валидация данных `Celebrate`, `Validator`
- безопасность данных `Bcrypt`, `Jsonwebtoken`
- логирование запросов `Winston`
- менеджер процессов на сервере pm2
- SSL-сертификаты от Letsencrypt

---

[Публичный сервер (Api) - https://endjoys.diploma.nomoreparties.sbs](https://endjoys.diploma.nomoreparties.sbs)\
[Открыть сайт в браузере](https://movies.explorer.diploma.nomoreparties.sbs)\
[Ссылка на макет в Figma](<https://www.figma.com/file/LZVRshGiIEmY9Ke8yhluvp/Diploma-(Copy)?type=design&node-id=891-3857&mode=design&t=1aReCFQ52fyf2LyZ-0>)
