import asyncerrorhandler from "../utils/asyncerrorhandler.js";
import jobProviderService from "./Service.js";

// Fetching all JobProviders
const getAllJobProviders = asyncerrorhandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const providers = await jobProviderService.getAllJobProviders(page,limit);
  res.status(200).json(providers);
});

// Fetching JobProvider by ID
const getJobProviderById = asyncerrorhandler(async (req, res) => {
  const jobProviderId = req.params.id;
  const getJobProvider = await jobProviderService.getJobProviderById(
    jobProviderId
  );
  res.status(200).json(getJobProvider);
});

// Adding JobProvider
const addJobProvider = asyncerrorhandler(async (req, res) => {
  const newJobProvider = req.body;
  const provider = await jobProviderService.addJobProvider(newJobProvider);
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

// counting total JobProvider
const gettotalprovider = asyncerrorhandler(async(req,res)=>{
  const totaljobproviders = await jobProviderService.gettotalprovider()
  res.status(200).json({totaljobproviders})
})

export default {
  getAllJobProviders,
  getJobProviderById,
  addJobProvider,
  updateJobProvider,
  deleteJobProvider,
  gettotalprovider,
};
