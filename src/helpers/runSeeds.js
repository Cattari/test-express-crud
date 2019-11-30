const { db } = require('../db');

exports.runSeeds = () => {
  db
    .defaults({
      users: [{
        id: '0',
        username: 'admin',
        password: '07f8b27a16eecdc78fe43def3ce70da121c311c9', //qwerty_secured
      }],
      products: [{
        id: '1', 
        name: 'T-Shirt', 
        price: 99.99, 
        options: [{ color: 'blue' }, { size: 'XL' }],
      }],
      reviews: [{
        id: '0', productId: '1', content: 'Here is a 5-star review", "author": "Mary Johnson',
      }]
    })
    .write();
};
  