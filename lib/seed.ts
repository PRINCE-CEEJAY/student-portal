import { faker } from '@faker-js/faker';
import prisma from './db';

const courses = [
  { title: 'Data Structures & Algorithms', code: 101, session: 'Fall 2025' },
  { title: 'Operating Systems', code: 201, session: 'Fall 2025' },
  { title: 'Database Systems', code: 301, session: 'Spring 2026' },
  { title: 'Machine Learning', code: 401, session: 'Spring 2026' },
  { title: 'Computer Networks', code: 202, session: 'Fall 2025' },
  { title: 'Software Engineering', code: 302, session: 'Spring 2026' },
  { title: 'Cloud Computing', code: 402, session: 'Fall 2025' },
  { title: 'Cryptography & Security', code: 501, session: 'Spring 2026' },
  { title: 'Distributed Systems', code: 502, session: 'Fall 2025' },
  { title: 'Web Development', code: 102, session: 'Spring 2026' },
];

async function main() {
  console.log('Start seeding...');

  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: {
          clerkId: faker.string.alphanumeric(24),
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          imageUrl: faker.image.avatar(),
        },
      }),
    ),
  );

  await Promise.all(
    courses.map((course) =>
      prisma.course.create({
        data: {
          ...course,
          candidateId: faker.helpers.arrayElement(users).id,
        },
      }),
    ),
  );

  console.log(`Seeded ${users.length} users and ${courses.length} courses.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
