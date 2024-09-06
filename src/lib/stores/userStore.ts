import type { User } from '$lib/types/user';
import { writable } from 'svelte/store';

const userStore = writable<User | null>();

export default {
  subscribe: userStore.subscribe,
  set: userStore.set,
};
