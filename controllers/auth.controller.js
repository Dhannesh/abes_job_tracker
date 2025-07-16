import UserModel from "../model/User.model.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest.error.js";
import UnauthenticatedError from "../errors/unauthenticated.error.js";

export const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastname,
      location: user.location,
      token,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let isPasswordCorrect = "";

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await UserModel.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");
  if (email === "testUser@test.com")
    isPasswordCorrect = await user.comparePassword("123456");
  else isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastname,
      location: user.location,
      token,
    },
  });
};

export const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await UserModel.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};
