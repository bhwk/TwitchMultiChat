<script lang="ts">
	export let channel: string;
	export let selected = false;
	export let clickHandle: Function;

	$: chipStateClass = selected ? 'variant-filled' : 'variant-soft';
</script>

<span
	class="chip {chipStateClass} "
	on:click={() => {
		selected = !selected;
		clickHandle();
	}}
>
	{channel}
</span>
