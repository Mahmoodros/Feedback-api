import express from "express";
import {getFeedbackForm,submitFeedback,downloadFeedback} from "../controllers/feedback.js";
import { handleLogin,login } from "../controllers/auth.js";
import { User } from "../model/userdb.js";
const router = express.Router();
// Serve the Login page
router.get("/", login),
// Serve the feedback form
router.get("/feedback-form", getFeedbackForm);
// Handle Login
router.post("/", handleLogin);
// Handle feedback submission
router.post("/submit-feedback", submitFeedback);
// Handle feedback download
router.get("/download-feedback", downloadFeedback);

export default router;
