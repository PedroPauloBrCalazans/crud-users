import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

import validator from "validator";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const camposObrigatorios = ["nome", "sobrenome", "email", "password"];

      for (const campos of camposObrigatorios) {
        if (!httpRequest?.body?.[campos as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Campo(s) ${campos} é obrigatório(s).`,
          };
        }
      }
      const emailValido = validator.isEmail(httpRequest.body!.email);

      if (!emailValido) {
        return {
          statusCode: 400,
          body: "E-mail é inválido",
        };
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Algo deu errado.",
      };
    }
  }
}
