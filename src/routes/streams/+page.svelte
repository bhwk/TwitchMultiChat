<script lang="ts">
	import { channels } from '$lib/store';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import Player from '$lib/components/Player.svelte';
	let data: object;

	async function getStreams() {
		const response = await fetch('/api/get_stream', {
			method: 'POST',
			body: JSON.stringify(get(channels)),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		data = JSON.parse(await response.json());
	}

	onMount(async () => {
		await getStreams();
	});
</script>

<div class="gap-1 flex flex-wrap items-center overflow-y-scroll min-h-0 min-w-0">
	{#if data}
		{#each Object.entries(data) as [channel, streams]}
			{#if Object.keys(streams).length !== 0}
				<Player {channel} {streams} />
			{/if}
		{/each}
	{/if}
</div>
