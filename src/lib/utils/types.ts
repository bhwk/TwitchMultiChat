import type { ChatUserstate } from 'tmi.js';
export interface ChatMessage {
	userstate: ChatUserstate;
	message: string;
	channel: string;
}
