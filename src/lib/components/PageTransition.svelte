<script>
	import { fly,slide } from 'svelte/transition';
	export let pathname = '';
</script>

{#key pathname}
	<div in:fly={{ y:300, duration: 500, delay: 500 }} out:fly={{ y: -1000, duration: 500 }}>
		<slot />
	</div>
{/key}
