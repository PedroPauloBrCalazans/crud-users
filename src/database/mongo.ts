// vamos criar um objeto que vai ter metodos responsaveis por se conectar e se comunicar com MongoDB

import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost:27017";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const client = new Mongo(url, { auth: { username, password } }); //quero criar um cliente no Mongo que vai se comunicar com a url e as credencias
    const db = client.db("users-db"); //vai ser a database de fato, nome do banco

    this.client = client;
    this.db = db;

    console.log("conectado no mongo");
  },
};
