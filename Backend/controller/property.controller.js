const repo = require("../repositories/property.repository");

// CREATE
exports.addProperty = async (req, res) => {
    try {
        const mainImage = req.files["main_image"][0].filename;
        const gallery = req.files["gallery_images"] 
            ? req.files["gallery_images"].map(f => f.filename)
            : [];

        const data = {
            project_name: req.body.project_name,
            builder_name: req.body.builder_name,
            location: req.body.location,
            price: req.body.price,
            description: req.body.description,
            main_image: mainImage,
            gallery_images: gallery
        };

        const property = await repo.createProperty(data);
        res.status(201).json({ success: true, message: "Property created successfully", data: property });
    } catch (err) {
        console.error("Add Property Error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// READ ALL
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await repo.getAllProperties();
        res.json(properties);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// READ ONE
exports.getPropertyById = async (req, res) => {
    try {
        const property = await repo.getPropertyById(req.params.id);
        if (!property) return res.status(404).json({ message: "Property Not Found" });
        res.json(property);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// UPDATE
exports.updateProperty = async (req, res) => {
    try {
        const old = await repo.getPropertyById(req.params.id);
        if (!old) return res.status(404).json({ message: "Property Not Found" });

        const mainImage = req.files["main_image"]?.[0]?.filename || old.main_image;
        const gallery = req.files["gallery_images"]
            ? req.files["gallery_images"].map(f => f.filename)
            : old.gallery_images;

        const data = {
            project_name: req.body.project_name || old.project_name,
            builder_name: req.body.builder_name || old.builder_name,
            location: req.body.location || old.location,
            price: req.body.price || old.price,
            description: req.body.description || old.description,
            main_image: mainImage,
            gallery_images: gallery
        };

        const updated = await repo.updateProperty(req.params.id, data);
        res.json({ success: true, message: "Property updated successfully", data: updated });
    } catch (err) {
        console.error("Update Property Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

// DELETE
exports.deleteProperty = async (req, res) => {
    try {
        const deleted = await repo.deleteProperty(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Property Not Found" });
        res.json({ success: true, message: "Property deleted successfully", deleted });
    } catch (err) {
        console.error("Delete Property Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};
