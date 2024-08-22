import type { UserResponse } from '$lib/api/apiUser';
import { writable } from 'svelte/store';

const userStore = writable<UserResponse | null>();

export default {
  subscribe: userStore.subscribe,
  set: userStore.set,
};
