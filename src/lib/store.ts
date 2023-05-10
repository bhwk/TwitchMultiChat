import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { ChatMessage } from './utils/types';
import type { Client } from 'tmi.js';

export const messages = writable<ChatMessage[]>([]);
export const channels: Writable<string[]> = localStorageStore('channels', []);
export const globalClient = writable<Client>();
