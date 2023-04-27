import * as tmi from 'tmi.js';
import type { ChatMessage } from './types';
import { messages } from '../store';
import { onDestroy } from 'svelte';

export async function intialiseClient() {
	let client = new tmi.client({ channels: ['roflgator'] });

	client.on('disconnected', () => {
		console.log('Disconnected from twitch servers');
	});

	client.on('connected', () => {
		console.log('Connected to twtich servers');
	});

	client.on('part', (channel, username, self) => {
		if (self) {
			console.log('Left: ', channel);
		}
	});

	client.on('join', (channel, username, self) => {
		if (self) {
			console.log('Joined: ', channel);
		}
	});

	client.on('chat', (channel, userstate, message) => {
		let chatMessage: ChatMessage = { channel, userstate, message };
		messages.update((messages) => {
			messages.unshift(chatMessage);
			return messages;
		});
	});

	await client.connect().catch((err) => {
		console.log(err);
	});
	return client;
}
