import { createHook, createStore, StoreActionApi } from 'react-sweet-state';
import { ApplicationStates } from './type.d';

export const APPLICATION_STORE = 'ApplicationStore';

type StoreApi = StoreActionApi<ApplicationStates>;
type Actions = typeof actions;

export const actions = {
  onLoadTotalPage: (totalPage: number) => ({ setState }: StoreApi) => {
    setState({ totalPage });
  },
  onChangeItemIndex: (currentItemIndex: number) => ({ setState }: StoreApi) => {
    setState({ currentItemIndex });
  }
};
export const initialState: ApplicationStates = {
  totalPage: 0,
  currentItemIndex: 0
};

export const Store = createStore<ApplicationStates, Actions>({
  initialState,
  actions,
  name: APPLICATION_STORE
});

const useApplicationStore = createHook(Store);

export default useApplicationStore;
