<script lang="ts">
	import { messages } from '../store';
</script>

{#each $messages as chat}
	<div class="rounded-md p-2 text-white">
		<p>
			<span class="badge variant-ringed-primary font-semibold">
				{chat.channel}
			</span>
			<span class="font-bold" style="color: {chat.userstate.color};">{chat.userstate.username}</span
			>
			<span class="font-medium">
				{chat.message}
			</span>
		</p>
	</div>
{/each}
