import { Router } from "express";
import {
  getAllJobs,
  createJob,
  deleteJob,
  getJob,
  updateJob,
  showStats,
} from "../controllers/job.controller.js";
import testUserMiddleware from "../middleware/testUser.middleware.js";
const jobsRouter = Router();

jobsRouter.route("/").post(createJob).get(getAllJobs);
jobsRouter.route("/stats").get(showStats);
jobsRouter
  .route("/:id")
  .delete(testUserMiddleware, deleteJob)
  .get(getJob)
  .patch(testUserMiddleware, updateJob);

export default jobsRouter;
