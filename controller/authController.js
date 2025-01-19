import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { sendWelcomeEmail } from "../emails/email.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";

const codegenerator = () =>
  Math.floor(100000 + Math.random() * 9000).toString();
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const hashed = await hashPassword(req.body.password);
  req.body.password = hashed;
  const verificationCode = codegenerator();
  //console.log(verificationCode);
  //creat new user
  const newUser = await User.create({ ...req.body, verificationCode });
  // send email
  sendWelcomeEmail(req.body.email, verificationCode);
  const token = await jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  //console.log("token", token);
  res.cookie("beloveds", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: true,
  });
  newUser.password = undefined;
  res.status(StatusCodes.CREATED).json({
    msg: "please check your email",
    data: { newUser },
  });
};
// export const test = async (req, res) => {
//   console.log("test");
//   try {
//     res.status(200).render("email");
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
export const activateUserAccount = async (req, res) => {
  const belovedsCookie = req.cookies.beloveds;
  if (!belovedsCookie) throw new UnauthenticatedError("please register first");
  const decoded = jwt.verify(belovedsCookie, process.env.JWT_SECRET);
  // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }
  const user = await User.findById(decoded.id);
  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  const expirationTime = new Date(user.updatedAt).getTime() + 10 * 60 * 1000;
  if (user.isVerified === true) {
    throw new BadRequestError("you are already registered ");
  }
  if (
    user.verificationCode === req.body.verificationCode &&
    Date.now() < expirationTime
  ) {
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({ msg: "success", data: { user } });
  } else {
    throw new BadRequestError(" please request new code");
  }
};

export const requestnewCode = async (req, res) => {
  const verificationCode = codegenerator();
  //console.log(verificationCode);
  const belovedsCookie = req.cookies.beloveds;
  if (!belovedsCookie) throw new UnauthenticatedError("please register first");
  const decoded = jwt.verify(belovedsCookie, process.env.JWT_SECRET);
  // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }
  const user = await User.findById(decoded.id);
  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  if (user.isVerified === true) {
    throw new BadRequestError("you are already registered ");
  }
  user.verificationCode = verificationCode;
  await user.save({ validateBeforeSave: false });
  sendWelcomeEmail(user.email, verificationCode);
  res.status(StatusCodes.OK).json({
    msg: "please check your email",
  });
};
export const ForgetPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const hashed = await hashPassword(req.body.password);
  user.password = hashed;
  await user.save({ validateBeforeSave: false });
  user.password = undefined;
  const token = await jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  //console.log("token", token);
  res.cookie("beloveds", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: true,
  });
  user.password = undefined;
  //console.log(user);
  res.status(StatusCodes.OK).json({
    msg: "success",
  });
};
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );
  //401 not authorized
  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");
  if (!user.isVerified)
    throw new UnauthenticatedError("please activate your account ");

  const token = await jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  // cookie and token prefer have the same expire time
  res.cookie("beloveds", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: true,
  });
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    msg: `${user.name} logged in`,
    data: { user },
  });
};
export const logout = (req, res) => {
  res.cookie("beloveds", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    //secure: true,
  });
  res.status(StatusCodes.OK).json({ msg: " logged out!" });
};
export const protectedRoutesInClientSide = async (req, res) => {
  const belovedsCookie = req.cookies.beloveds;
  //console.log("belovedsCookie", belovedsCookie);
  if (!belovedsCookie)
    throw new UnauthenticatedError("You don't have permission");

  const decoded = jwt.verify(belovedsCookie, process.env.JWT_SECRET);
  // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }
  const user = await User.findById(decoded.id);
  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  res.status(200).json({ msg: "success" });
};
export const protectedRouterInServer = async (req, res, next) => {
  const belovedsCookie = req.cookies.beloveds;
  //console.log("belovedsCookie", belovedsCookie);
  if (!belovedsCookie)
    throw new UnauthenticatedError("You don't have permission");

  const decoded = jwt.verify(belovedsCookie, process.env.JWT_SECRET);
  // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }
  const user = await User.findById(decoded.id);
  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  if (!user.isVerified)
    throw new UnauthenticatedError("please activate your account ");
  req.user = user;
  next();
};
