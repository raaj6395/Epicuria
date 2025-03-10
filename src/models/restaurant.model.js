const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const restaurantSchema = mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: '',
      validate: (value) => {
        if (value && !validator.isURL(value)) {
          throw new Error('Invalid URL');
        }
      },
    },
    coverImageUrl: {
      type: String,
      default: '',
      validate: (value) => {
        if (value && !validator.isURL(value)) {
          throw new Error('Invalid URL');
        }
      },
    },
    backgroundImageUrl: {
      type: String,
      default: '',
      validate: (value) => {
        if (value && !validator.isURL(value)) {
          throw new Error('Invalid URL');
        }
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    openingTime: {
      type: String,
      required: true,
      trim: true,
    },
    closingTime: {
      type: String,
      required: true,
      trim: true,
    },
    descriptions: {
      type: String,
      default: '',
      trim: true,
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to JSON
restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

/**
 * @typedef Restaurant
 */
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
