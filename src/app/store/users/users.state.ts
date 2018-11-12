import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../models/user';
import { NAME } from './users.constants';
import { GetUsers, GetUsersSuccess, SaveUser } from './users.actions';
import * as mockUsers from './MOCK_DATA.json';

export class UsersStateModel {
  users: User[];
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

@State<UsersStateModel>({
  name: NAME,
  defaults: {
    users: []
  }
})
export class UsersState {
  @Selector()
  static users(state: UsersStateModel) {
    return state.users;
  }

  @Action(GetUsers)
  async getUsers({ dispatch }: StateContext<UsersStateModel>) {
    await wait(2000);
    // mock getting users
    dispatch(new GetUsersSuccess(mockUsers.default));
  }

  @Action(GetUsersSuccess)
  getUsersSuccess(
    { patchState }: StateContext<UsersStateModel>,
    { users }: GetUsersSuccess
  ) {
    patchState({
      users
    });
  }

  @Action(SaveUser)
  saveUser(
    { patchState, getState }: StateContext<UsersStateModel>,
    { user }: SaveUser
  ) {
    const users = getState().users;
    const foundUserIndex = users.findIndex(u => u.id === user.id);
    patchState({
      users: [
        ...users.slice(0, foundUserIndex),
        user,
        ...users.slice(foundUserIndex + 1)
      ]
    });
  }
}
