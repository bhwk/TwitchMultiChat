<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { messages, channels } from '../lib/store';
	import { intialiseClient, joinChannel, leaveChannel } from '../lib/utils/twitchClient';
	import { scale } from 'svelte/transition';
	import type { Client } from 'tmi.js';

	let client: Client;
	let value: string;

	onMount(async () => {
		client = await intialiseClient();
	});

	onDestroy(async () => {
		if (client) {
			client.disconnect();
			console.log('Client destroyed!');
		}
	});
</script>

<div class="container h-full mx-auto flex flex-col gap-4 md:p-4 p-2">
	<div
		class="h-3/4 w-full variant-filled-surface rounded-lg md:p-4 flex flex-col-reverse overflow-y-auto gap-2 p-2"
	>
		{#each $messages as chat}
			<div class="rounded-md p-2 text-white">
				<p>
					<span class="badge variant-ringed-primary font-semibold">
						{chat.channel}
					</span>
					<span style="color: {chat.userstate.color};">{chat.userstate.username}</span>
					{chat.message}
				</p>
			</div>
		{/each}
	</div>
	<form
		on:submit|preventDefault={() => {
			joinChannel(client, value);
			value = '';
		}}
	>
		<input
			bind:value
			class="variant-ringed-primary input"
			type="text"
			placeholder="Enter channel to join"
		/>
	</form>
	<div class="flex space-x-2">
		{#each $channels as channel (channel)}
			<button
				transition:scale|local={{ duration: 150, opacity: 0 }}
				class="chip variant-filled"
				on:click={() => {
					leaveChannel(client, channel);
				}}>{channel}</button
			>
		{/each}
	</div>
</div>
