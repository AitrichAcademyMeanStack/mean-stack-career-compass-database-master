import asyncerrorhandler from "../utils/asyncerrorhandler.js";
import jobProviderService from "./Service.js";

// Fetching all JobProviders
const getAllJobProviders = asyncerrorhandler(async (req, res) => {
  const providers = await jobProviderService.getAllJobProviders();
  res.status(200).json(providers);
});

// Fetching JobProvider by ID
const getJobProviderById = asyncerrorhandler(async (req, res) => {
  const jobProviderId = req.params.id;
  const getJobProvider = await jobProviderService.getJobProviderById(jobProviderId);
  res.status(200).json(getJobProvider);
});

// Adding JobProvider
const addJobProvider = asyncerrorhandler(async (req, res) => {
  const newJobProvider = req.body;
  const provider = await jobProviderService.addIndustry(newJobProvider);
  res.status(201).json(provider);
});

// Updating JobProvider
const updateJobProvider = asyncerrorhandler(async (req, res) => {
  const jobProviderId = req.params.id;
  const provider = req.body;
  const updateData = await jobProviderService.updateIndustry(
    jobProviderId,
    provider
  );
  res.status(200).json(updateData);
});

// Deleting JobProvider
const deleteJobProvider = asyncerrorhandler(async (req, res) => {
  const jobProviderId = req.param.id;
  await jobProviderService.deleteJobProvider(jobProviderId);
  res.status(200).json({ message: "JobProvider deleted Successfully" });
});

export default {
  getAllJobProviders,
  getJobProviderById,
  addJobProvider,
  updateJobProvider,
  deleteJobProvider,
};
