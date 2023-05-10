<script lang="ts">
	import { channels } from '$lib/store';
	import SelectChip from '$lib/components/SelectChip.svelte';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
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
</script>
