import express from "express";
const router = express.Router();
import {
  getDocs,
  getDoc,
  deleteDoc,
  addDoc,
  editDoc,
} from "../app/controllers/docsController.js";

// Get All Docs
router.get("/", getDocs);

// Get Single Docs
router.get("/:id", getDoc);

// Add Docs
router.post("/", addDoc);

// Update docs
router.put("/edit/:id", editDoc);

// Delete Docs
router.delete("/delete/:id", deleteDoc);

export default router;
