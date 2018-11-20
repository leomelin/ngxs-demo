import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../models/user';
import { NAME } from './users.constants';
import {
  GetUsers,
  GetUsersSuccess,
  SaveUser,
  SaveUserSuccess
} from './users.actions';
import * as mockUsers from './MOCK_DATA.json';
import { HideSpinner, ShowSpinner } from '../spinner/spinner.actions';

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
    dispatch(new ShowSpinner());
    await wait(3000);
    // mock getting users
    dispatch(new GetUsersSuccess(mockUsers.default));
  }

  @Action(GetUsersSuccess)
  getUsersSuccess(
    { patchState, dispatch }: StateContext<UsersStateModel>,
    { users }: GetUsersSuccess
  ) {
    patchState({
      users
    });
    dispatch(new HideSpinner());
  }

  @Action(SaveUser)
  async saveUser(
    { patchState, dispatch }: StateContext<UsersStateModel>,
    { user }: SaveUser
  ) {
    dispatch(new ShowSpinner());
    await wait(2000);
    return await dispatch(new SaveUserSuccess(user));
  }

  @Action(SaveUserSuccess)
  async saveUserSuccess(
    { patchState, dispatch, getState }: StateContext<UsersStateModel>,
    { user }: SaveUserSuccess
  ) {
    const users = getState().users;
    const foundUserIndex = users.findIndex(u => u.id === user.id);
    dispatch(new HideSpinner());
    patchState({
      users: [
        ...users.slice(0, foundUserIndex),
        user,
        ...users.slice(foundUserIndex + 1)
      ]
    });
  }
}
