import { sql } from '@vercel/postgres';
import { Item, Project, Category, Supplier, Unit } from './definitions';

export async function fetchProjects() {
    try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        // console.log('Fetching revenue data...');
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await sql<Project>`SELECT id, name, description FROM projects`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch project data.');
    }
}

export async function upsertProject(project: Project) {
    try {
        if (project.id !== undefined || null) {
            return (await sql`UPDATE projects SET name=${project.name}, description=${project.description} WHERE id = ${project.id}`).rows;
        }
        else {
            return (await sql`INSERT INTO projects (name, description) VALUES(${project.name}, ${project.description})`).rows;
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to upsert project data.');
    }
}

export async function fetchCategories() {
    try {
        const data = await sql<Category>`SELECT id, name FROM categories`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch category data.');
    }
}

export async function upsertCategory(category: Category) {
    try {
        if (category.id !== undefined || null) {
            return (await sql`UPDATE categories SET name=${category.name} WHERE id = ${category.id}`).rows;
        }
        else {
            return (await sql`INSERT INTO categories (name) VALUES(${category.name})`).rows;
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to upsert category data.');
    }
}

export async function fetchSuppliers() {
    try {
        const data = await sql<Supplier>`SELECT id, name FROM suppliers`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch supplier data.');
    }
}

export async function upsertSupplier(supplier: Supplier) {
    try {
        if (supplier.id !== undefined || null) {
            return (await sql`UPDATE suppliers SET name=${supplier.name} WHERE id = ${supplier.id}`).rows;
        }
        else {
            return (await sql`INSERT INTO suppliers (name) VALUES(${supplier.name})`).rows;
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to upsert supplier data.');
    }
}

export async function fetchUnits() {
    try {
        const data = await sql<Unit>`SELECT id, name FROM units`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch unit data.');
    }
}

export async function upsertUnit(unit: Unit) {
    try {
        if (unit.id !== undefined || null) {
            return (await sql`UPDATE units SET name=${unit.name} WHERE id = ${unit.id}`).rows;
        }
        else {
            return (await sql`INSERT INTO units (name) VALUES(${unit.name})`).rows;
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to upsert unit data.');
    }
}

export async function fetchItems() {
    try {
        const data = await sql<Item>`SELECT id, date, description, unit_value, discount, unit_id, type_ids, project_id FROM items`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch item data.');
    }
}

export async function upsertItem(item: Item) {
    try {
        if (item.id !== undefined || null) {
            return (await sql`UPDATE items SET description=${item.description}, quantity=${item.quantity}, unit_id=${item.unitId}, unit_value=${item.unitValue}, discount=${item.discount}, date=${item.date}, year=${item.year}, month=${item.month}, supplier_id=${item.supplierId}, type_ids=ARRAY[${item.categoryIds.join(',')}], project_id=${item.projectId} WHERE id = ${item.id}`).rows;
        }
        else {
            return (await sql`INSERT INTO items (description, quantity, unit_id, unit_value, discount, date, month, year, supplier_id, type_ids, project_id) VALUES(${item.description}, ${item.quantity}, ${item.unitId}, ${item.unitValue}, ${item.discount}, ${item.date}, ${item.month}, ${item.year}, ${item.supplierId}, ARRAY[${item.categoryIds.join(',')}], ${item.projectId})`).rows;
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to upsert item data.');
    }
}
