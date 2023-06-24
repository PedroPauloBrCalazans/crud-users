import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Campo ausente.");
      }

      if (!id) {
        return badRequest("ID não existe.");
      }

      const camposPermitido: (keyof UpdateUserParams)[] = [
        "nome",
        "sobrenome",
        "email",
      ];
      const campoNaoPermitidoAtualizar = Object.keys(body).some(
        (key) => !camposPermitido.includes(key as keyof UpdateUserParams)
      );

      if (campoNaoPermitidoAtualizar) {
        return badRequest("Algum campo recebido não é permitido.");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
