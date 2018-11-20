import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NAME } from './spinner.constants';
import { HideSpinner, ShowSpinner } from './spinner.actions';

export class SpinnerStateModel {
  showSpinner: boolean;
}

@State<SpinnerStateModel>({
  name: NAME,
  defaults: {
    showSpinner: false
  }
})
export class SpinnerState {
  @Selector()
  static isSpinnerVisible(state: SpinnerStateModel) {
    return state.showSpinner;
  }

  @Action(ShowSpinner)
  showSpinner({ patchState }: StateContext<SpinnerStateModel>) {
    patchState({ showSpinner: true });
  }

  @Action(HideSpinner)
  hideSpinner({ patchState }: StateContext<SpinnerStateModel>) {
    patchState({ showSpinner: false });
  }
}
