import api, { User } from '@/api';
import { createModel } from '@rematch/core';
import { RootModel } from '.';

export const user = createModel<RootModel>()({
  state: {} as User, // initial state
  reducers: {
    set(state, payload: User) {
      return payload;
    },
    clear(state) {
      window.localStorage.removeItem('token');
      return {} as User;
    },
  },
  effects: (dispatch) => ({
    async asyncSet(token: string | null, state) {
      if (token) {
        const result = await api.auth(token);
        if (result.status === 0) {
          dispatch.user.set(result.data.user);
        }
      }
    },
  }),
});
