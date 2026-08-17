// Usage: npm run create-admin
// Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env, hashes the password,
// and upserts a User document — this is what /auth/login checks against.
// Safe to re-run: if the user already exists, this updates their password
// to whatever ADMIN_PASSWORD currently is in .env.
require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env first, then re-run this script."
    );
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: email.trim().toLowerCase() },
    update: { passwordHash },
    create: { email: email.trim().toLowerCase(), passwordHash, name: "Admin" },
  });

  console.log(`\nAdmin user ready: ${user.email}`);
  console.log("You can now log in at /admin/login with that email + the ADMIN_PASSWORD you set.\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
