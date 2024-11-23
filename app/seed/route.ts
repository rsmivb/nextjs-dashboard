import { db } from '@vercel/postgres';
import { projects, categories, suppliers, units, items } from '../lib/project/placeholder-data';

const client = await db.connect();

async function seedProjects() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
     CREATE TABLE IF NOT EXISTS projects (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT NULL
     );
   `;

  const insertedProjects = await Promise.all(
    projects.map(async (project) => {
      return client.sql`
         INSERT INTO projects (id, name, description)
         VALUES (${project.id}, ${project.name}, ${project.description})
         ON CONFLICT (id) DO NOTHING;
       `;
    }),
  );

  return insertedProjects;
}

async function seedCategories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
     CREATE TABLE IF NOT EXISTS categories (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL
     );
   `;
  const insertedCategories = await Promise.all(
    categories.map(
      (category) => client.sql`
         INSERT INTO categories (id, name)
         VALUES (${category.id}, ${category.name})
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );
  return insertedCategories;
}

async function seedSuppliers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
     CREATE TABLE IF NOT EXISTS suppliers (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL
     );
   `;
  const insertedSuppliers = await Promise.all(
    suppliers.map(
      (supplier) => client.sql`
         INSERT INTO categories (id, name)
         VALUES (${supplier.id}, ${supplier.name})
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );
  return insertedSuppliers;
}

async function seedUnits() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
   CREATE TABLE IF NOT EXISTS units (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     name VARCHAR(255) NOT NULL
   );
  `;
  const insertedUnits = await Promise.all(
    units.map(
      (unit) => client.sql`
        INSERT INTO units (id, name)
        VALUES (${unit.id}, ${unit.name})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedUnits;
}

async function seedItems() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
  await client.sql`
     CREATE TABLE IF NOT EXISTS items (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       date DATE NOT NULL,
       month INT NOT NULL,
       year INT NOT NULL,
       supplier_id UUID NOT NULL REFERENCES suppliers(id),
       description VARCHAR(255) NOT NULL,
       unit_value NUMERIC(6,2) NOT NULL,
       discount NUMERIC(6,2) DEFAULT 0.00,
       unit_id UUID NOT NULL REFERENCES units(id),
       type_ids TEXT[],
       project_id UUID NOT NULL REFERENCES projects(id)
     );
   `;
  const insertedItems = await Promise.all(
    items.map(
      (item) => client.sql`
        INSERT INTO items (id, date, month, year, supplier_id description, unit_value, discount, unit_id, type_ids, project_id)
        VALUES (${item.id}, ${item.date}, ${item.month}, ${item.year}, ${item.supplierId}, ${item.description}, ${item.unitValue}, ${item.discount}, ${item.unitId}, ARRAY[${item.typeIds.join(',')}], ${item.projectId})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedItems;
}

async function cleanDatabase() {
  await client.sql`DROP TABLE IF EXISTS items`;
  await client.sql`DROP TABLE IF EXISTS units`;
  await client.sql`DROP TABLE IF EXISTS projects`;
  await client.sql`DROP TABLE IF EXISTS types`;
  await client.sql`DROP TABLE IF EXISTS categories`;
  await client.sql`DROP TABLE IF EXISTS suppliers`;
}

export async function GET() {
  //return Response.json({
  //  message:
  //    'Uncomment this file and remove this line. You can delete this file when you are finished.',
  //});
  try {

    await client.sql`BEGIN`;
    //await cleanDatabase();
    await seedProjects();
    await seedCategories();
    await seedSuppliers();
    await seedUnits();
    await seedItems();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
