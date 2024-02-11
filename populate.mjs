import dotenv from "dotenv";
import mockData from "./MOCK_DATA.json" assert { type: "json" };
import JobModel from "./model/Job.model.mjs";
import connectDB from "./db/connectDB.mjs";
dotenv.config();
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await JobModel.create(mockData);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
