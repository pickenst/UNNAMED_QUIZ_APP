import { PrismaClient } from "../../generated/client"

const prisma = new PrismaClient({
  omit: {
    user: {
      passwordHash: true
    }
  }
});

export default prisma