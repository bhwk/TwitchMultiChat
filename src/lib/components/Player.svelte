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

<div id={channel} class="w-full">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={video} class="w-1/2" />
	{#each Object.entries(streams) as [quality, url]}
		<button
			on:click={() => {
				setVideoSource(url);
			}}>{quality}</button
		>
	{/each}
</div>
