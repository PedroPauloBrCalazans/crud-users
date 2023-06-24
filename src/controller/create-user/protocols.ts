import { User } from "../../models/user";

export interface CreateUserParams {
  nome: string;
  sobrenome: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
