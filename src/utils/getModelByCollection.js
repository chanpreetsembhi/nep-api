import { GeneralEnglish, ElectiveEnglish, Computer } from "../app/models/doc.model.js";

export const getModelByCollection = (collectionName) => {
  switch (collectionName) {
    case "general-english":
      return GeneralEnglish;
    case "elective-english":
      return ElectiveEnglish;
    case "computer":
      return Computer;
    default:
      throw new Error("Invalid collection name");
  }
};