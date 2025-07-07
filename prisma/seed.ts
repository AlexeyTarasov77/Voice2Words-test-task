import { SubscriptionLevel } from "@/generated/prisma"
import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/library"
import { prisma } from "@/shared/lib/db"

const execIgnoreConflict = async (promise: Promise<any>) => {
  try {
    return await promise
  } catch (err) {
    if (!(err instanceof PrismaClientKnownRequestError && err.code == "P2002")) throw err
  }
}

async function main() {
  await execIgnoreConflict(prisma.subscription.create({
    data: {
      level: SubscriptionLevel.FREE,
      maxRecords: 2,
      features: ["Maximum 2 transcriptions", "Limited transcription time", "Standard accuracy"],
      price: 0.0
    }
  }))
  await execIgnoreConflict(prisma.subscription.create({
    data: {
      level: SubscriptionLevel.PREMIUM,
      maxRecords: -1,
      features: ["Unlimited transcriptions", "Unlimited transcription time", "High accuracy", "Priority support"],
      price: 19.99
    }
  }))
  console.log("Created basic subscriptions")
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
