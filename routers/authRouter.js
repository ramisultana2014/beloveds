import { Router } from "express";
const router = Router();
// import { test } from "../controller/authController.js";
import {
  activateUserAccount,
  register,
  requestnewCode,
  ForgetPassword,
  login,
  logout,
  protectedRoutesInClientSide,
} from "../controller/authController.js";
import {
  validateRegisterInput,
  validateForgetPassword,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
// router.get("/email", test); // this route to design the email
router.post("/register", validateRegisterInput, register);
router.post("/activatTheAccount", activateUserAccount);
router.post("/requestnewcode", requestnewCode);
router.post("/forgetpassword", validateForgetPassword, ForgetPassword);
router.post("/login", validateLoginInput, login);
router.post("/logout", logout);
router.get(
  "/validate-for-protectedRoutesInClientSide",
  protectedRoutesInClientSide
);
export default router;
// the req will first arrive to validateRegisterInput or validateLoginInput they will look for the body and the actual error will come from withValidationErrors with the message we provide coming from validateRegisterInput or validateLoginInput . that error   catch by express-async-errors in server.js and send it down to app.use((err, req, res, next)
