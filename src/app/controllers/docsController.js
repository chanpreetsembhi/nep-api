import { getModelByCollection } from "../../utils/getModelByCollection.js";

// @desc    Get all docs
// @route   GEt /api
export const getDocs = async (req, res) => {
  try {
    const { collection } = req.query;

    if (!collection) {
      return res.status(400).json({ error: "Collection name is required" });
    }

    const Model = getModelByCollection(collection);

    const docs = await Model.find();

    return res.status(200).json({ docs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching documents" });
  }
};

// @desc    Get single doc
// @route   GET /api/doc/:id
export const getDoc = async (req, res) => {
  try {
    const docId = req.params.id;
    const { collection } = req.query;

    if (!collection) {
      return res.status(400).json({ error: "Collection name is required" });
    }

    const Model = getModelByCollection(collection);

    const doc = await Model.findById(docId);

    return res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching documents" });
  }
};

// @desc    Create new doc
// @route   POST /api/docs
export const addDoc = async (req, res) => {
  try {
    const { title, url } = req.body;
    const { collection } = req.query;

    if (!collection) {
      return res.status(400).json({ error: "Collection name is required" });
    }

    if (!title || !url) {
      return res.status(400).json({
        error: !title ? "Title is required" : "Url is required",
      });
    }

    const Model = getModelByCollection(collection);
    const doc = await Model.create({ title, url });
    return res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error adding document" });
  }
};

// @desc    Edit doc
// @route   PUT /api/docs/:id
export const editDoc = async (req, res) => {
  try {
    const docId = req.params.id;
    const { title, url, collection } = req.body;

    if (!collection) {
      return res.status(400).json({ error: "Collection name is required" });
    }

    if (!title || !url) {
      return res.status(400).json({
        error: !title ? "Title is required" : "Url is required",
      });
    }

    const Model = getModelByCollection(collection);
    const doc = await Model.findByIdAndUpdate(docId, { title, url });
    return res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Editing document" });
  }
};

// @desc    Delete doc
// @route   DELETE /api/docs/:id
export const deleteDoc = async (req, res) => {
  try {
    const docId = req.params.id;
    const { collection } = req.query;

    if (!collection) {
      return res.status(400).json({ error: "Collection name is required" });
    }

    const Model = getModelByCollection(collection);
    const doc = await Model.findByIdAndDelete(docId);
    return res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting document" });
  }
};
