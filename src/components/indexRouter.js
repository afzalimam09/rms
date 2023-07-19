import { Router } from "express";
import restaurantRout from "./restaurant/restaurantRoute.js";
import dishRoute from "./dishes/dishRoute.js";
import authRoute from "./auth/authRoute.js";
const router = Router();

router.use("/restaurant", restaurantRout);
router.use("/restaurant", dishRoute);
router.use("/auth", authRoute);
export default router;
