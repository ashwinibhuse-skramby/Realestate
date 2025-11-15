const express = require("express");
const router = express.Router();
const controller = require("../controller/property.controller");
const upload = require("../middleware/upload");
const validateProperty = require("../middleware/validateProperty");

// multiple files
const filesUpload = upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 10 }
]);

router.post("/add", filesUpload, validateProperty, controller.addProperty);
router.get("/", controller.getAllProperties);
router.get("/:id", controller.getPropertyById);
router.put("/update/:id", filesUpload, controller.updateProperty);
router.delete("/delete/:id", controller.deleteProperty);

module.exports = router;
