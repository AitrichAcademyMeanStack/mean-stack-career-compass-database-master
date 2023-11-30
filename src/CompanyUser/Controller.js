import asyncerrorhandler from "../utils/asyncerrorhandler.js";
import userService from "./Service.js";

// Fetching all CompanyUsers
const getAllCompanyUsers = asyncerrorhandler(async (req, res) => {
  const users = await userService.getAllCompanyUsers();
  res.status(200).json(users);
});

//Fetching CompanyUser by ID
const getCompanyUserById = asyncerrorhandler(async (req, res) => {
  const userId = req.params.id;
  const companyUser = await userService.getCompanyUserById(userId);
  res.status(200).json(companyUser);
});

// Adding new CompanyUser
const addCompanyUser = asyncerrorhandler(async (req, res) => {
  const companyId = req.params.id;
  const data = req.body;
  const newCompanyUser = await userService.addCompanyUser(companyId,data);
  res.status(201).json(newCompanyUser);
});

// Updating companyUser
const updateCompanyUser = asyncerrorhandler(async (req, res) => {
  const userId = req.params.id;
  const updatedData = await userService.updateCompanyUser(userId);
  res.status(200).json(updatedData);
});

// Deleting CompanyUser
const deleteCompanyUser = asyncerrorhandler(async (req, res) => {
  const userId = req.params.id;
  const deleteData = await userService.deleteCompanyUser(userId);
  res.status(200).json(deleteData);
});

export default {
  getAllCompanyUsers,
  getCompanyUserById,
  addCompanyUser,
  updateCompanyUser,
  deleteCompanyUser,
};
