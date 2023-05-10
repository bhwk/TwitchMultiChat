import * as tmi from 'tmi.js';
import type { ChatMessage } from './types';
import { messages, channels, globalClient } from '../store';
import { get } from 'svelte/store';

export async function intialiseClient() {
	let client = new tmi.client({ channels: get(channels) });

	client.on('disconnected', () => {
		console.log('Disconnected from twitch servers');
	});

	client.on('connected', () => {
		console.log('Connected to twitch servers');
	});

	client.on('part', (channel, username, self) => {
		if (self) {
			console.log('Left: ', channel);
			channels.update((channels) => {
				if (!channels.includes(channel)) {
					return channels;
				} else {
					channels.splice(channels.indexOf(channel), 1);
					return channels;
				}
			});
		}
	});

	client.on('join', (channel, username, self) => {
		if (self) {
			console.log('Joined: ', channel);
			channels.update((channels) => {
				if (channels.includes(channel)) {
					return channels;
				} else {
					channels.push(channel);
					return channels;
				}
			});
		}
	});

	client.on('chat', (channel, userstate, message) => {
		let chatMessage: ChatMessage = { channel, userstate, message };
		messages.update((messages) => {
			if (messages.length >= 100) {
				messages.pop();
			}
			messages.unshift(chatMessage);
			return messages;
		});
	});

	await client.connect().catch((err) => {
		console.log(err);
	});
	globalClient.set(client);
}

export async function joinChannel(client: tmi.Client, channel: string) {
	await client.join(channel).catch((err) => {
		console.log(err);
	});
}

export async function leaveChannel(client: tmi.Client, channel: string) {
	await client.part(channel).catch((err) => {
		console.log(err);
	});
}
