import { prisma } from "@/shared/lib/db"

async function main() {
  await prisma.subscription.create({
    data: {
      name: "Free",
      maxRecords: 2,
      features: ["Maximum 2 transcriptions", "Limited transcription time", "Standard accuracy"],
      price: 0.0
    }
  })
  await prisma.subscription.create({
    data: {
      name: "Premium",
      maxRecords: -1,
      features: ["Unlimited transcriptions", "Unlimited transcription time", "High accuracy", "Priority support"],
      price: 19.99
    }
  })
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
