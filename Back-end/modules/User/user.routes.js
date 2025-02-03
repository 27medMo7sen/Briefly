import { Router } from "express";
import * as uc  from "./user.controller.js";

const router = Router();

router.post("/signup", uc.signup);
router.get("/confirm/:token", uc.confirmEmail);
router.post("/login", uc.login);

export default router;