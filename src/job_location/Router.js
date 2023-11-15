import express from "express";
import locationController from "./controller.js";

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          location:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 * 
 * 
 */

router.get("/",locationController.getAllLocations);
router.get("/:id",locationController.getLocationById);
router.post("/",locationController.addLocation);
router.put("/:id",locationController.updateLocation);
router.delete("/:id",locationController.deleteLocation);


export default router