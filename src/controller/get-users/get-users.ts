import { IGetUserRepository, IGetUsersController } from "./protocols";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUserRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Algo deu errado",
      };
    }
  }
}
