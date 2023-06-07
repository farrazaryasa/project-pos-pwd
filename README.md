# project-pos-pwd
project point of sale module 4 Purwadhika

1. lakukan clone https://github.com/farrazaryasa/project-pos-pwd.git

# Front End
1. masuk ke dalam folder front end --> cd front-end-pos-system
2. ketik `npm install`
3. ketik `npm start` lalu enter
4. akan masuk ke link `http://localhost:3000/` untuk melihat tampilan website

# Back End
1. masuk ke dalam folder back end --> cd back-end-pos-system
2. ketik `npm install`
3. buat database dengan nama `pos_system` di mysql
4. ketik `npx sequelize-cli db:migrate` lalu enter
5. ketik `npx sequelize-cli db:seed:all` lalu enter
6. ketik `nodemon index.js` lalu enter
7. tes koneksi menggunakan postman di URL `http://localhost:3456/` dengan method GET
