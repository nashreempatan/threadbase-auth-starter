
import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

// GET /api/me — PROTECTED
router.get("/", verifyToken, (req, res) => {
  res.json(req.user);
});

export default router;
