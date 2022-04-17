<script>
	import { onMount } from 'svelte';
	
	let Term;
	
	onMount(async () => {
		Term = (await import('./Term.svelte')).default;
	});
    
</script>

<svelte:component this={Term}>
</svelte:component>
