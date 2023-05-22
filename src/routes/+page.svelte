<script lang="ts">
	import { globalClient } from '$lib/store';
	import Message from '$lib/components/Message.svelte';
	import Channels from '$lib/components/Channels.svelte';
</script>

<div
	class="h-3/4 w-full variant-ghost-surface rounded-lg md:p-4 flex flex-col-reverse overflow-x-auto break-words overflow-y-auto p-2 gap-1"
>
	<Message />
</div>
<Channels client={$globalClient} />
