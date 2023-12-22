import logger from "../middleware/logger.js"; //importing logger middleware
import AuthUser from "../models/AuthUserModel.js"; // importing authetication model
import systemuser from "../models/SystemUserModel.js"; //importing system user model
import NotFoundError from "../Exceptions/NotFoundError.js"; //importing not found error handler
import ValidationError from "../Exceptions/ValidationError.js"; // importing validation error handler
import jobseeker from "../models/JobSeekerModel.js"; //importing job seeker
import seekerProfile from "../models/JobSeekerProfileModel.js";
import BadRequestError from "../Exceptions/BadRequestError.js";

//get all job seekers
const getallseekers = async (page, limit,filtername) => {
  try {
    let query = {}
    if (filtername) {
      query = {
        $or:[
         { firstName: { $regex: new RegExp(filtername, 'i') } }
        ]
      }
    }
    
    const totalposts = await jobseeker.countDocuments();
    const totalpages = Math.ceil(totalposts / limit);
    if (page > totalpages) {
      logger.error("Page not found");
      throw new NotFoundError("page not found");
    }

    const result = await jobseeker
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (result) {
      logger.info("All job seekers are : ", result);
      return result;
    } else {
      logger.error("Error occured in getting all job seekers");
      throw new NotFoundError("Error occured in getting all job seekers");
    }
  } catch (error) {
    throw error;
  }
};

//get jobseeker with specific id
const getseekerbyid = async (seekerid) => {
  try {
    const result = await jobseeker.findById(seekerid);
    console.log(result);
    if (result) {
      logger.info("job seeker is : ", result);
      return result;
    } else {
      logger.error("error occured in getting job seeker with specific id");
      throw new NotFoundError(
        "error occured in getting job seeker with specific id"
      );
    }
  } catch (error) {
    throw error;
  }
};

const getTotalJobseeker = async () => {
  try {
    const totalJobSeeker = await jobseeker.aggregate([
        {
          $group: {
            _id: null,
            count: {
              $sum: 1
            }
          }
        },
               {
            $project:{
                _id:0,
                count:1
            }
          }
      ]);

    if (totalJobSeeker) {
        logger.info("successfully getting all count of seekers")
      return totalJobSeeker;
    } else {
        logger.error("error occured in getting all seekers count")

    }
  } catch (error) {
    throw error;
  }
};

//create new job seeker
const createseeker = async (seekerdata) => {
  try {
    const findseeker = await jobseeker.findOne({ email: seekerdata.email });
    if (!findseeker) {
      const seekerresult = await jobseeker.create(seekerdata);
      console.log(seekerresult);
      logger.info("Job seeker created successfully");

      if (seekerresult) {
        const systemuserdata = {
          _id: seekerresult._id,
          firstName: seekerresult.firstName,
          lastName: seekerresult.lastName,
          email: seekerresult.email,
          phone: seekerresult.phone,
          role: seekerresult.role,
        };
        const systemresult = await systemuser.create(systemuserdata);
        logger.info("System user created successfully");

        if (systemresult) {
          const authuserdata = {
            _id: systemresult._id,
            userName: seekerresult.userName,
            password: seekerresult.password,
            firstName: systemresult.firstName,
            lastName: systemresult.lastName,
            email: systemresult.email,
            phone: systemresult.phone,
            role: systemresult.role,
          };
          const authuser = await AuthUser.create(authuserdata);
          logger.info("Auth user created successfully");

          if (authuser) {
            seekerdata.jobSeeker = {
              seekerId: seekerresult._id,
              firstName: seekerresult.firstName,
              lastName: seekerresult.lastName,
              userName: seekerresult.userName,
              email: seekerresult.email,
              phone: seekerresult.phone,
            };

            await seekerProfile.create(seekerdata);
            logger.info("profile created successfully");
          } else {
            logger.error("Error in creating auth user");
          }
        } else {
          logger.error("Error in creating system user");
          return null;
        }
      } else {
        logger.error("Error in creating job seeker");
      }
      return seekerresult;
    } else {
      logger.error("email already existing");
      throw new ValidationError("email already existing");
    }
  } catch (error) {
    throw error;
  }
};

// // //update job seeker with specific id
const updateseeker = async (seekerid, seekerdata) => {
  try {
    const seekerresult = await jobseeker.findByIdAndUpdate(seekerid, seekerdata);
    logger.info("job seeker updated successfully");
    if (seekerresult) {
      const systemresult = await systemuser.findByIdAndUpdate(seekerid,seekerdata);
      logger.info("system user updated successfully");
      if (systemresult) {
        await AuthUser.findByIdAndUpdate(seekerid, seekerdata);
        logger.info("auth user updated successfully");
      } else {
        logger.error("error in updating system user");
      }
    } else {
      logger.info("error in updating job seeker");
    }
    return seekerresult;
  } catch (error) {
    throw error;
  }
};

// //delete job seeker with specific id
const deleteseeker = async (seekerid) => {
  try {
    const seekerresult = await jobseeker.findByIdAndDelete(seekerid);
    logger.info("job seeker deleted successfully");
    if (seekerresult) {
      const systemresult = await systemuser.findByIdAndDelete(seekerid);
      logger.info("system user deleted successfully");
      if (systemresult) {
        await AuthUser.findByIdAndDelete(seekerid);
        logger.info("auth user deleted successfully");
      } else {
        logger.error("error in deleting system user");
      }
    } else {
      logger.info("error in deleting job seeker");
    }
    return seekerresult;
  } catch (error) {
    throw error;
  }
};

const loginJobSeeker = async (seekerid, data) => {
  try {
    const existingSeeker = await jobseeker.findById(seekerid);
    if (existingSeeker) {
      const authvalue = await AuthUser.findById(seekerid);
      if (authvalue && authvalue.role === "Job Seeker") {
        const existingAuth = await AuthUser.findOne({
          _id: seekerid,
          password: data.password,
          email: data.email,
        });
        if (existingAuth) {
          logger.info("Job seeker login successful");
          return existingAuth;
        } else {
          logger.error("Incorrect email or password for job seeker");
          throw new BadRequestError("Incorrect email or password");
        }
      } else {
        logger.error("Job seeker authentication not found with specific id");
        throw new NotFoundError(
          "Job seeker authentication not found with specific id"
        );
      }
    } else {
      logger.error("Job seeker not found with specific id");
      throw new NotFoundError("Job seeker not found with specific id");
    }
  } catch (error) {
    logger.error(`Error in login job seeker: ${error.message}`);
    throw error;
  }
};

const changepassword = async (seekerid, data) => {
  try {
    const existingSeeker = await jobseeker.findById(seekerid);

    if (existingSeeker) {
      const authValue = await AuthUser.findById(seekerid);

      if (authValue && authValue.role === "Job Seeker") {
        if (data.oldpassword && data.oldpassword !== authValue.password) {
          logger.error("Old password does not match the current password");
          throw new BadRequestError("Old password does not match");
        }

        authValue.password = data.newpassword;

        if (authValue.password === data.confirmpassword) {
          const existingauth = await AuthUser.findOneAndUpdate(
            { _id: seekerid },
            { $set: { password: authValue.password } },
            { new: true }
          );

          if (existingauth) {
            logger.info("Job seeker password changed successfully");
            return existingauth;
          } else {
            logger.error("Error occurred in changing password");
            throw new BadRequestError("Error occurred in changing password");
          }
        } else {
          logger.error("New password and confirm password do not match");
          throw new BadRequestError(
            "New password and confirm password do not match"
          );
        }
      } else {
        logger.error("Job seeker authentication not found with specific id");
        throw new NotFoundError(
          "Job seeker authentication not found with specific id"
        );
      }
    } else {
      logger.error("Job seeker not found with specific id");
      throw new NotFoundError("Job seeker not found with specific id");
    }
  } catch (error) {
    logger.error(`Error in changing password of job seeker: ${error.message}`);
    throw error;
  }
};

export default {
  getallseekers,
  getseekerbyid,
  createseeker,
  updateseeker,
  deleteseeker,
  loginJobSeeker,
  changepassword,
  getTotalJobseeker,
};
