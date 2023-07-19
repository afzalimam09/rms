import { Router } from "express";
import {
    createRestaurant,
    deleteRestaurant,
    getAllRestaurant,
    getOneRestaurant,
    searchRestaurants,
} from "./restaurantController.js";
import { protect, restrictToAdmin } from "../auth/authController.js";

const router = Router();

router
    .route("/")
    .get(getAllRestaurant)
    .post(protect, restrictToAdmin, createRestaurant);
router.route("/search").get(searchRestaurants);
router
    .route("/:id")
    .get(getOneRestaurant)
    .delete(protect, restrictToAdmin, deleteRestaurant);

export default router;
