
import { PrismaClient as MongoClient, Prisma } from "@/prisma/generated/mongodb_client";
import { PrismaClient as PostgresClient} from "@/prisma/generated/postgresql_client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const DATA_SOURCE = process.env.DATA_SOURCE

type ClientMongo = MongoClient<Prisma.PrismaClientOptions, never, DefaultArgs>
type ClientPostgres = PostgresClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export const mongoClient: ClientMongo = new MongoClient();
export const postgresClient: ClientPostgres = new PostgresClient()

export let prismaClient: any

if(DATA_SOURCE === "postgresql") {
    prismaClient = postgresClient
} else {
    prismaClient = mongoClient
}


