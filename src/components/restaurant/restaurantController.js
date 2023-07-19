import Restaurant from "../../models/restaurantModel.js";
import AppError from "../../helper/appError.js";
import catchAsync from "../../helper/catchAsync.js";
import APIFeatures from "../../helper/apiFeatures.js";

export const createRestaurant = catchAsync(async (req, res, next) => {
    const result = await Restaurant.create(req.body);
    res.status(201).json({
        status: "success",
        data: result,
    });
});
export const getAllRestaurant = catchAsync(async (req, res, next) => {
    // Execute the query
    const features = new APIFeatures(Restaurant.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const results = await features.query;

    // Send Response
    res.status(200).json({
        status: "success",
        length: results.length,
        data: results,
    });
});
export const getOneRestaurant = catchAsync(async (req, res, next) => {
    const result = await Restaurant.findById(req.params.id);

    // Return an error if doc is not found
    if (!result) {
        return next(new AppError("No restaurant found for given id", 404));
    }

    res.status(200).json({
        status: "success",
        data: result,
    });
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
    const result = await Restaurant.findByIdAndDelete(req.params.id);

    // Return an error if doc is not found
    if (!result) {
        return next(new AppError("No document was found with given id", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

export const searchRestaurants = catchAsync(async (req, res, next) => {
    const query = req.query.q; // The search query parameter from the client
    const regex = new RegExp(query, "i");
    const results = await Restaurant.find({
        $or: [{ name: regex }, { "cuisines.name": regex }],
    });

    res.status(200).json({
        status: "success",
        data: results,
    });
});
