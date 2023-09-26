import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const jogoData: Prisma.JogoCreateInput[] = [ 
];

async function main() {
    console.log(`Start seeding ...`);
    for (const  pjogo of jogoData) {
        // create jogo if not exists
        const jogo = await prisma.jogo.upsert({
            where: { id: pjogo.id },
            create: pjogo,
            update: {},
        });
        console.log(`Upserted Pet with id: ${jogo.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
      
    process.exit(1);
    });

