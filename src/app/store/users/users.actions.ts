import { NAME } from './users.constants';
import { User } from '../../models/user';

export class GetUsers {
  static readonly type = `[${NAME}] GetUsers`;
}

export class GetUsersSuccess {
  static readonly type = `[${NAME}] GetUsersSuccess`;

  constructor(public users: User[]) {}
}

export class SaveUser {
  static readonly type = `[${NAME}] SaveUser`;

  constructor(public user: User) {}
}
