import asyncerrorhandler from "../utils/asyncerrorhandler.js";
import industryService from "./Service.js";

// fetching all industries
const getAllIndustries = asyncerrorhandler(async (req, res) => {
  const industry = req.params.key
  const industries = await industryService.getAllIndustries(industry);
  res.status(200).json(industries);
});

// adding industry
const addIndustry = asyncerrorhandler(async (req, res) => {
  const newIndustry = req.body;
  const industry = await industryService.addIndustry(newIndustry);
  res.status(201).json(industry);
});

// updating industry
const updateIndustry = asyncerrorhandler(async (req, res) => {
  const IndustryId = req.params.id;
  const Industry = req.body;
  const updateData = await industryService.updateIndustry(IndustryId, Industry);
  res.status(200).json(updateData);
});

// Deleting industry
const deleteIndustry = asyncerrorhandler(async (req, res) => {
  const IndustryId = req.param.id;
  await industryService.deleteIndustry(IndustryId);
  res.status(200).json({ message: "Industry deleted Successfully" });
});

export default {
  getAllIndustries,
  addIndustry,
  updateIndustry,
  deleteIndustry,
};
