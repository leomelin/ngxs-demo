import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../models/user';
import { NAME } from './users.constants';
import { GetUsers, GetUsersSuccess, SaveUser } from './users.actions';
import * as mockUsers from './MOCK_DATA.json';

export class UsersStateModel {
  users: User[];
}

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
    setTimeout(() => {
      // mock getting users
      dispatch(new GetUsersSuccess(mockUsers.default));
    }, 2000);
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
    users[foundUserIndex] = user;
    patchState({
      users
    });
  }
}
