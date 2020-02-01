

const mongoose = require('mongoose');
require('./categories-schema.js');

const products = mongoose.Schema({

  category: { type: String, required: true },
  name: { type: String, required: true },
  display_name: { type: String, required: true },
  description: { type: String, required: true },

}
// , { toObject: { virtuals: true}, toJSON: { virtuals: true }}
);

// products.virtual('actualTeam', {
//   ref: 'teams',
//   localField: 'team',
//   foreignField: 'name',
//   justOne: false
// });

// products.pre('findOne', function() {
//   try {
//     this.populate('actualTeam');
//   } catch(e) {
//     console.error(e);
//   }
// });

module.exports = mongoose.model('products', products);