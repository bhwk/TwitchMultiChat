<script lang="ts">
	import Hls from 'hls.js';
	import { onMount } from 'svelte';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	export let channel: string;
	export let streams: StreamData;

	let video: HTMLMediaElement;
	let clicked: boolean = false;
	let selectedQuality: string = 'best';

	interface StreamData {
		[key: string]: string;
	}

	async function setVideoSource(stream: string) {
		if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = stream;
		} else if (Hls.isSupported()) {
			let hls = new Hls();
			hls.loadSource(stream);
			hls.attachMedia(video);
		}

		video.play();
	}

	onMount(() => {
		setVideoSource(streams['best']);
	});
</script>

{#if streams}
	<div
		id={channel}
		class="flex-grow basis-1/3 flex-shrink group relative min-w-0 min-h-0 overflow-y-scroll"
	>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video bind:this={video} class="aspect-video w-full h-full" />
		<div
			class="absolute opacity-0 top-0 right-0 invisible group-hover:opacity-100 group-hover:visible flex flex-col transition-opacity ease-in-out duration-100 variant-glass-surface w-[100px] md:w-[150px] max-h-full"
		>
			<button on:click={() => (clicked = !clicked)}>Quality</button>
			{#if clicked}
				<ListBox active="variant-filled-surface" class="overflow-y-scroll">
					{#each Object.entries(streams) as [quality, url]}
						<ListBoxItem
							active="variant-filled-surface"
							on:click={() => setVideoSource(url)}
							bind:group={selectedQuality}
							value={quality}
							name={quality}>{quality}</ListBoxItem
						>
					{/each}
				</ListBox>
			{/if}
			<div class="flex flex-col-reverse" />
		</div>
	</div>
{/if}
