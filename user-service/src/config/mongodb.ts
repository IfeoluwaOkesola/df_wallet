import Container from "typedi";
import { DataSource } from "typeorm";

import { env } from "../env";

const { db } = env;
const { mongo } = db;

//const urlSchema = (!env.isLocal && !env.isTest) ? "mongodb+srv://" : "mongodb://";
// const urlSchema = "mongodb+srv://"
// const url = `${urlSchema}${mongo.user}${mongo.pass ? `:${mongo.pass}` : ""}@${mongo.host}${(!env.isLocal && !env.isTest) ? "/?tls=true&authSource=admin" : ""}`;

export const dataSource = new DataSource({
    type: "mongodb" as any,
    url: mongo.url,
    database: mongo.database,
    port: +mongo.port,
    entities: ["src/api/models/mongo/**/*.ts"],
    synchronize: false,
    logging: true,
    //ssl: (!env.isLocal && !env.isTest) ? true : false
    ssl: true,  // Force SSL
    extra: {
        tls: true,  // Use TLS instead of SSL
        tlsAllowInvalidCertificates: false // Ensures only valid certificates are used
    }
});


export const mongoDBLoader = async () => {
    Container.set("MongoDBConnection", dataSource);

    await dataSource.initialize()
        .then(async () => {
            console.log("✅  Connected to MongoDB database");
        })
        .catch((err) => {
            console.log(`❌  Error connecting to MongoDB database >> ${err}`);
        });
};