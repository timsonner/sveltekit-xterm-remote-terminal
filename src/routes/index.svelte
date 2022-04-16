<script>
	import { onMount } from 'svelte';
	
	let Thing;
	
	onMount(async () => {
		Thing = (await import('./Thing.svelte')).default;
	});
    
</script>

<svelte:component this={Thing} answer={42}>
	<p>some slotted content</p>
</svelte:component>

<div id="baz"></div>