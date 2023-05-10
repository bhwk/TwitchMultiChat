<script lang="ts">
	import { messages } from '../store';
</script>

{#each $messages as chat}
	<div class="p-2 leading-relaxed">
		<p>
			<span class="badge text-sm variant-filled-surface font-semibold">
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
