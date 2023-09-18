const express = require("express");
const kitService = require("./kitService");

const router = express.Router();

// GET kit with the given label ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const kit = kitService.findKitByLabel(id);

    if (!kit) {
      res.status(404).json({ error: "Kit not found." });
      return;
    }

    res.status(200).json(kit);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET 5 kits that start with the provided partial label ID
router.get("/suggest/:partialId", async (req, res) => {
  try {
    const id = req.params.partialId;
    const options = kitService.findKitsStartingWith(id);

    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
