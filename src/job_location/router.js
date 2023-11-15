import express from "express";

const router = express.Router();

const locationController = require("./controller");

router.get("",locationController.getAllLocations);
router.get("",locationController.getLocationById);
router.post("",locationController.addLocation);
router.put("",locationController.updateLocation);
router.delete("",locationController.deleteLocation);

