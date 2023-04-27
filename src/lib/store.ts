import { writable } from 'svelte/store';
import type { ChatMessage } from './utils/types';

export const messages = writable<ChatMessage[]>([]);
