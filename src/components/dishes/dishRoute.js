import { Router } from "express";
import {
    createDish,
    deleteDish,
    getAllDish,
    updateDish,
} from "./dishController.js";
import { protect, restrictToAdmin } from "../auth/authController.js";
const router = Router();

//View dishes routes
router.get("/:id/dishes", getAllDish);

//Protect the below route
router.use(protect, restrictToAdmin);
router.post("/:id/dishes", createDish);
router.route("/:id/dishes/:dishId").patch(updateDish).delete(deleteDish);

export default router;
