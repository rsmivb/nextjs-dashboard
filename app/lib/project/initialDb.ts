import { db } from '@vercel/postgres';
import { projects, types, units, items } from './placeholder-data';

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

async function seedTypes() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
     CREATE TABLE IF NOT EXISTS types (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL
     );
   `;
  const insertedTypes = await Promise.all(
    types.map(
      (type) => client.sql`
         INSERT INTO types (id, name)
         VALUES (${type.id}, ${type.name})
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );
  return insertedTypes;
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
       description VARCHAR(255) NOT NULL,
       unit_value NUMERIC(6,2) NOT NULL,
       discount NUMERIC(6,2) NULL,
       unit_id UUID NOT NULL REFERENCES units(id),
       type_ids UUID ARRAY NOT NULL,
       project_id UUID NOT NULL REFERENCES projects(id)
     );
   `;
  const insertedItems = await Promise.all(
    items.map(
      (item) => client.sql`
        INSERT INTO items (id, date, description, unit_value, discount, unit_id, type_ids, project_id)
        VALUES (${item.id}, ${item.date}, ${item.description}, ${item.unitValue}, ${item.discount}, ${item.unit_id}, {${item.type_ids.join(',')}}, ${item.project_id} )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedItems;

}

export async function GET() {
  return Response.json({
    message:
      'Uncomment this file and remove this line. You can delete this file when you are finished.',
  });
  // try {
  //   await client.sql`BEGIN`;
  //   await seedProjects();
  //   await seedTypes();
  //   await seedUnits();
  //   await seedItems();
  //   await client.sql`COMMIT`;

  //   return Response.json({ message: 'Database seeded successfully' });
  // } catch (error) {
  //   await client.sql`ROLLBACK`;
  //   return Response.json({ error }, { status: 500 });
  // }
}
