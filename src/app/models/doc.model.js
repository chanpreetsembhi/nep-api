import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

export const GeneralEnglish = mongoose.model("GeneralEnglish", docSchema, "general-english");
export const ElectiveEnglish = mongoose.model("ElectiveEnglish", docSchema, "elective-english");
export const Computer = mongoose.model("Computer", docSchema, "computer");
