//vamos pegar os usuarios do mongoDB

import { IGetUserRepository } from "../../controller/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        nome: "Pedro Paulo",
        sobrenome: "Brauna Calazans",
        email: "pedro@paulo.com.br",
        password: "123",
      },
    ];
  }
}
