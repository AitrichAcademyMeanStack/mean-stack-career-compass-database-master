import asyncerrorhandler from "../utils/asyncerrorhandler.js"; // importing global error handler
import qualificationService from "./Service.js" // importing service

// fetching all Qualifications
const getAllQualifications = asyncerrorhandler(async (req, res) => {
  const Qualifications = await qualificationService.getAllQualifications();
  res.status(200).json(Qualifications);
});

// Adding new qualification
const addQualification = asyncerrorhandler(async (req, res) => {
  const data = req.body;
  const newQualification = await qualificationService.addQualification(data);
  res.status(201).json(newQualification);
});

// Fetch qualification by ID
const getQualificationById = asyncerrorhandler(async (req, res) => {
  const id = req.params.id;
  const getQulification = await qualificationService.getQualificationById(id);
  res.status(200).json(getQulification);
});

// Update qualification
const updateQualification = asyncerrorhandler(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const update = await qualificationService.updateQualification(id, updateData);
  res.status(200).json(update);
});

// Deleting qualification
const deleteQualification = asyncerrorhandler(async (req, res) => {
  const id = req.params.id;
  const deletedData = await qualificationService.deleteQualification(id);
  res.status(200).json(deletedData);
});

export default {
  getAllQualifications,
  getQualificationById,
  addQualification,
  updateQualification,
  deleteQualification,
};
