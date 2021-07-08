# Server side of todo app with Mongodb

## About The Project
The application allows:
- Add todo
- Delete todos
- Mark the execution status of todos

### Tech
The application uses the following platforms, frameworks and libraries:

- node.js
- Express
- sequelize
- postgreSQL
- cors

## Getting Started
Requires [Node.js](https://nodejs.org/) v14.17.0 to run.
The client side is [here](https://github.com/Vetal26/todos_mongodb_client.git).

### Installation
1. Clone the repo.
```sh
git clone https://github.com/Vetal26/todos_postgresql_server.git
```

2. Install the dependencies.
```sh
npm install
```

3. Сreate a .env file and add the following content:
```sh
PORT=3333
DB_HOST='127.0.0.1'
DB_USERNAME=%your_login%
DB_PASSWORD=%your_password%
```

4. Create database and run data migration
```sh
npm run db:create
npm run db:migrate
```


5. Start the server
```sh
npm run start:dev
```

## License
Distributed under the MIT License.

## Contact
If you have any questions, please contact by email: vbshmit@gmail.com.
Sincerely Vitaly Borisov.