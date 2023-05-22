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

<div class="w-full h-5/6 variant-ghost-surface rounded-lg md:p-4 flex overflow-y-auto p-2 gap-1">
	{#if data}
		{#each Object.entries(data) as [channel, streams]}
			<Player {channel} {streams} />
		{/each}
	{/if}
</div>
