import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

// Define the Dish Schema
const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    vegNonveg: {
        type: String,
        required: true,
        enum: ["Vegetarian", "Non-Vegetarian"],
    },
    dishPictures: [String],
    ingredients: [String],
});

// Define the Cuisine Schema
const cuisineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    vegNonveg: {
        type: String,
        required: true,
        enum: ["Vegetarian", "Non-Vegetarian", "Both"],
    },
    cuisinePictures: [String],
    dishes: [dishSchema], // Nested array of dishes for each cuisine
});

// Creating cab schema
const restaurantSchema = new Schema({
    name: {
        type: String,
        required: [true, "Restaurant name is required!"],
    },
    address: {
        type: String,
        required: [true, "Restaurant address is required!"],
    },
    phone: {
        type: String,
        required: [true, "Restaurant phone number is required!"],
    },
    pictures: [String],
    title: String,
    subtitle: String,
    availability: {
        type: String,
        required: true,
        enum: ["Open", "Closed"],
    },
    cuisines: [cuisineSchema], // Array of cuisines for the restaurant
});

// Creating model from schema
export default db.model("Restaurant", restaurantSchema);
