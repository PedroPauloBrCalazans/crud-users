import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controller/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params); // criando o usuário

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId }); // buscando pelo usuario, pra ver se realmente foi criado

    if (!user) {
      throw new Error("Usuário não criado");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest }; // retorna o usuário sem o _id por ID
  }
}

//REST tem todas as propriedades menos o ID
