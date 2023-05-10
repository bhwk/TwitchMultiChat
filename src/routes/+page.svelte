<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { intialiseClient } from '$lib/utils/twitchClient';
	import type { Client } from 'tmi.js';
	import Message from '$lib/components/Message.svelte';
	import Channels from '$lib/components/Channels.svelte';

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

<div
	class="h-3/4 w-full variant-ghost-surface rounded-lg md:p-4 flex flex-col-reverse overflow-y-auto p-2 gap-1"
>
	<Message />
</div>
<Channels {client} />
