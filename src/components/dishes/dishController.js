import Restaurant from "../../models/restaurantModel.js";
import catchAsync from "../../helper/catchAsync.js";

export const createDish = catchAsync(async (req, res, next) => {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found." });
    }
    const newDish = req.body;
    restaurant.cuisines.forEach((cuisine) => {
        if (cuisine._id.equals(newDish.cuisineId)) {
            cuisine.dishes.push(newDish);
        }
    });
    const updatedRestaurant = await restaurant.save();

    res.status(201).json({
        status: "success",
        data: updatedRestaurant,
    });
});

export const getAllDish = catchAsync(async (req, res, next) => {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found." });
    }
    // Send Response
    res.status(200).json({
        status: "success",
        length: restaurant.cuisines.length,
        data: restaurant.cuisines,
    });
});

export const updateDish = catchAsync(async (req, res, next) => {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found." });
    }
    const dishId = req.params.dishId;
    const updatedDish = req.body;
    restaurant.cuisines.forEach((cuisine) => {
        if (cuisine._id.equals(updatedDish.cuisineId)) {
            const dishIndex = cuisine.dishes.findIndex((dish) =>
                dish._id.equals(dishId)
            );
            if (dishIndex !== -1) {
                cuisine.dishes[dishIndex] = updatedDish;
            }
        }
    });
    const updatedRestaurant = await restaurant.save();
    res.status(200).json({
        status: "success",
        data: updatedRestaurant,
    });
});

export const deleteDish = catchAsync(async (req, res, next) => {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found." });
    }
    const dishId = req.params.dishId;
    restaurant.cuisines.forEach((cuisine) => {
        if (cuisine.dishes.some((dish) => dish._id.equals(dishId))) {
            cuisine.dishes = cuisine.dishes.filter(
                (dish) => !dish._id.equals(dishId)
            );
        }
    });
    const updatedRestaurant = await restaurant.save();
    res.status(204).json({
        status: "success",
        data: updatedRestaurant,
    });
});
