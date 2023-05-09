<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<div class="flex gap-2 font-bold text-primary">
			<a href="/">Home</a>
			<a href="/video">Video</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">(actions)</svelte:fragment>
</AppBar>

<div class="container mx-auto h-full flex flex-col gap-4 md:p-4 p-2">
	<slot />
</div>
