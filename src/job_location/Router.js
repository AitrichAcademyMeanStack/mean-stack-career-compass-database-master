import express from "express";
import locationController from "./controller.js";

const router = express.Router();



router.get("/",locationController.getAllLocations);
router.get("/:id",locationController.getLocationById);
router.post("/",locationController.addLocation);
router.put("/:id",locationController.updateLocation);
router.delete("/:id",locationController.deleteLocation);


export default router