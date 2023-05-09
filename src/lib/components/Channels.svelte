<script lang="ts">
	import { channels } from '$lib/store';
	import { joinChannel, leaveChannel } from '$lib/utils/twitchClient';
	import { scale } from 'svelte/transition';
	import type { Client } from 'tmi.js';

	export let client: Client;
	let value: string;
</script>

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
