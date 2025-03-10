const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const menuSchema = mongoose.Schema(
  {
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
      default: '',
      validate: (value) => {
        if (value && !validator.isURL(value)) {
          throw new Error('Invalid URL');
        }
      },
    },
    availability: {
      type: Boolean,
      default: true,
    },
    is_vegetarian: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to JSON
menuSchema.plugin(toJSON);
menuSchema.plugin(paginate);

/**
 * @typedef Menu
 */
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
