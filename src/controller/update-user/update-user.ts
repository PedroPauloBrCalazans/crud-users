import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "ID não existe.",
        };
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
        return {
          statusCode: 400,
          body: "Algum campo recebido não é permitido.",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
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
