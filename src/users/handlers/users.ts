import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";

export interface User {
  id: number;
  email: string;
  username: string;
}

export function getUsers(request: Request, response: Response) {
  response.send([]);
}

export function getUserById(request: Request, response: Response) {
  response.send({});
}

export function createUser(
  request: Request<{}, {}, CreateUserDto>,
  response: Response<User>
) {
  const { email, password, username } = request.body;
  const id = 1;
  return response.status(201).send({ email, id, username });
}
