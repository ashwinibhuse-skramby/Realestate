const db = require("../db");
const model = require("../model/property.model");

// CREATE
exports.createProperty = async (data) => {
    const query = `
        INSERT INTO ${model.table}
        (project_name, builder_name, location, price, description, main_image, gallery_images)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [
        data.project_name,
        data.builder_name,
        data.location,
        data.price,
        data.description,
        data.main_image,
        data.gallery_images
    ];
    const result = await db.query(query, values);
    return result.rows[0];
};

// READ ALL
exports.getAllProperties = async () => {
    const result = await db.query(`SELECT * FROM ${model.table} ORDER BY id DESC`);
    return result.rows;
};

// READ ONE
exports.getPropertyById = async (id) => {
    const result = await db.query(`SELECT * FROM ${model.table} WHERE id = $1`, [id]);
    return result.rows[0];
};

// UPDATE
exports.updateProperty = async (id, data) => {
    const query = `
        UPDATE ${model.table}
        SET project_name=$1, builder_name=$2, location=$3, price=$4,
            description=$5, main_image=$6, gallery_images=$7, updated_at=NOW()
        WHERE id=$8 RETURNING *;
    `;
    const values = [
        data.project_name,
        data.builder_name,
        data.location,
        data.price,
        data.description,
        data.main_image,
        data.gallery_images,
        id
    ];
    const result = await db.query(query, values);
    return result.rows[0];
};

// DELETE
exports.deleteProperty = async (id) => {
    const result = await db.query(`DELETE FROM ${model.table} WHERE id=$1 RETURNING *`, [id]);
    return result.rows[0];
};
