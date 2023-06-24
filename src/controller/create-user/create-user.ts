import { User } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

import validator from "validator";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const camposObrigatorios = ["nome", "sobrenome", "email", "password"];

      for (const campos of camposObrigatorios) {
        if (!httpRequest?.body?.[campos as keyof CreateUserParams]?.length) {
          return badRequest(`Campo(s) ${campos} é obrigatório(s).`);
        }
      }
      const emailValido = validator.isEmail(httpRequest.body!.email);

      if (!emailValido) {
        return badRequest("E-mail é inválido");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
