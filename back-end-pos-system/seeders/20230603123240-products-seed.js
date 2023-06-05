'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('products', [
      {
        name: "CheeseBurger",
        price: 25000,
        stock: 75,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLnu_KYBtEwMtlztR8NIbNHq68cz8V5O7TQ&usqp=CAU",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pizza",
        price: 50000,
        stock: 20,
        image: "https://www.pizzahut.co.id/assets/images/digital_menu/phr/pizza/meat-monsta.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Spaghetti",
        price: 37500,
        stock: 30,
        image: "https://cdn1-production-images-kly.akamaized.net/9O6ILyv4IaTj3xtxWYLUEI00Kv8=/1748x0:5493x3745/1200x1200/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3048436/original/030475400_1581499756-shutterstock_413580649.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Steak",
        price: 70000,
        stock: 10,
        image: "https://www.wholesomeyum.com/wp-content/uploads/2022/06/wholesomeyum-Perfect-Grilled-Sirloin-Steak-500x500.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Orange Juice",
        price: 15000,
        stock: 100,
        image: "https://media.istockphoto.com/id/152971676/photo/glass-of-orange-juice-and-fresh-oranges.jpg?s=612x612&w=0&k=20&c=PLfvkn63OMHN8epb8F9Yfx48BsBOxWzfwL2BSWdV1Nw=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Vanilla Milkshake",
        price: 25000,
        stock: 55,
        image: "https://www.cfacdn.com/img/order/menu/Mobile/Desserts/Menu%20Item/16oz_VanillaMilkshake-1080.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Coca Cola",
        price: 10000,
        stock: 250,
        image: "https://www.theboogaloobali.com/wp-content/uploads/Coca-cola_Original-Can-330-ml.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sprite",
        price: 10000,
        stock: 250,
        image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/9/30/4e116c77-2a94-4ae9-a210-772ca31ee5d1.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('products', null, {})
  }
};
