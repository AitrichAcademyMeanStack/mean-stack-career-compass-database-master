import express from "express";
import locationController from "./controller.js";

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Location:
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

/**
 * @swagger
 *  /api/v1/locations:
 *      get:
 *          summary: Get all locations
 *          tags:
 *              - Location
 *          responses: 
 *              200:
 *               description: Return array of locations
 *               content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref:  '#/components/schemas/Location'
 *  
 *  
 * 
 */
router.get("/",locationController.getAllLocations);


/**
 * @swagger
 *  /api/v1/locations:
 *      post:
 *          summary: Add a new location
 *          tags:
 *              - Location
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Location'
 *          responses:
 *              201:
 *                  description: Location Added Successfully
 *                  content:
 *                        application/json:
 *                            schema:
 *                              $ref: '#/components/schemas/Location'
 *              400:
 *                      description: Bad request , check the request body
 *              
 */

router.post("/",locationController.addLocation);
/**
 * @swagger
 *  /api/v1/locations/{id}:
 *      get:
 *          summary: Get location by ID
 *          tags:
 *              - Location
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description:  ID of the location
 *          responses:
 *              200:
 *                description:  Location retrieved Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schema/Location'
 *              400:
 *                description: Location not found
 * 
 *  
 */

router.get("/:id",locationController.getLocationById);
/**
 * @swagger
 *  /api/v1/locations/{id}:
 *      put:
 *          summary:    Update location by ID
 *          tags:
 *              - Location
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true        
 *                schema:
 *                  type: string
 *                description: ID of the location to update
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/Location'
 *  
 *          responses:
 *              200:
 *                  description: Location updated Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Location'
 *              400:
 *                  decription: Location not found
 *                                 
 * 
 *  
 *       
 */
router.put("/:id",locationController.updateLocation);
/**
 * @swagger
 *  /api/v1/locations/{id}:
 *      delete:
 *          summary: Delete location by ID
 *          tags:
 *              - Location 
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the location to delete
 *          responses:
 *              204:
 *                  description: Location Deleted Successfully
 *              404:
 *                  description: Location ID not found
 * 
 *              
 */
router.delete("/:id",locationController.deleteLocation);


export default router