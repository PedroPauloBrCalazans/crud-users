//vamos pegar os usuarios do mongoDB

import { IGetUserRepository } from "../../controller/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}

//vai pegar todos os usuarios, pegar todos os objetos dentro da COLLECTION e vai transformar em um array
//Omit => ele omit uma propriedade
