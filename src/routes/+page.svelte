<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { messages } from '../lib/store';
	import { intialiseClient } from '../lib/utils/twitchClient';
	import type { Client } from 'tmi.js';

	let client: Client;

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

<div class="container h-full mx-auto flex-col justify-center items-center">
	{#each $messages as chat}
		<div>
			{chat.channel}
			{chat.userstate.username}
			{chat.message}
		</div>
	{/each}
</div>
