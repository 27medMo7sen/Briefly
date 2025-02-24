import { Router } from "express";
import * as uc from "./user.controller.js";
import { asyncHandler } from "../../utils/errorHandling.js";
const router = Router();

router.post("/signup", asyncHandler(uc.signup));
router.get("/confirm/:token", asyncHandler(uc.confirmEmail));
router.post("/login", asyncHandler(uc.login));

export default router;
