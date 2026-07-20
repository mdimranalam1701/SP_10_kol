import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gymsaas.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  // Hash the secure password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  // Upsert the Admin User (creates if doesn't exist, updates if it does)
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      phone: '+1234567890',
    },
  });

  console.log('Admin user seeded securely:');
  console.log(`Email: ${adminUser.email}`);
  console.log(`Role: ${adminUser.role}`);
  console.log(`Password: ${adminPassword} (Note: Change this in production!)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
