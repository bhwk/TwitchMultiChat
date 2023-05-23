<script lang="ts">
	import Hls from 'hls.js';
	import { onMount } from 'svelte';
	export let channel: string;
	export let streams: StreamData;

	let video: HTMLMediaElement;

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

		video.onloadedmetadata = () => {
			video.onplay = () => {
				video.currentTime = video.duration - 8;
			};
			console.log(video.currentTime, video.duration);
		};

		video.play();
	}

	onMount(() => {
		setVideoSource(streams['best']);
	});
</script>

{#if streams}
	<div
		id={channel}
		class="flex-grow basis-1/4 flex-shrink group relative border-surface-500 border-2 min-w-0 min-h-0"
	>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video bind:this={video} />
		<div class="hidden group-hover:block absolute bottom-0 right-0">
			{#each Object.entries(streams) as [quality, url]}
				<button
					on:click={() => {
						setVideoSource(url);
					}}>{quality}</button
				>
			{/each}
		</div>
	</div>
{/if}
