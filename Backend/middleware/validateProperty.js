module.exports = function validateProperty(req, res, next) {
    const { project_name, builder_name, location, price, description } = req.body;
    let errors = [];

    if (!project_name || project_name.trim() === "") errors.push("Project Name is required");
    if (!builder_name || builder_name.trim() === "") errors.push("Builder Name is required");
    if (!location || location.trim() === "") errors.push("Location is required");
    if (!price || isNaN(price)) errors.push("Price must be a valid number");
    if (!description || description.trim() === "") errors.push("Description is required");
    if (!req.files || !req.files["main_image"]) errors.push("Main Image is required");

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: "Validation Failed", errors });
    }

    next();
};
