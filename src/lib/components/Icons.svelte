<script lang="ts">
	let {
		name,
		class: className = 'size-4'
	}: {
		name: 'check' | 'arrow' | 'plus' | 'person' | 'ban' | 'chevron';
		class?: string;
	} = $props();
</script>

{#if name === 'check'}
	<svg
		class={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2.4"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M5 12l5 5 9-10" />
	</svg>
{:else if name === 'arrow'}
	<svg
		class={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
	</svg>
{:else if name === 'plus'}
	<svg
		class={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2.4"
		stroke-linecap="round"
		aria-hidden="true"
	>
		<path d="M12 5v14" /><path d="M5 12h14" />
	</svg>
{:else if name === 'person'}
	<svg
		class={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		aria-hidden="true"
	>
		<circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
	</svg>
{:else if name === 'ban'}
	<svg
		class={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		stroke-linecap="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" />
	</svg>
{:else}
	<svg
		class={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		aria-hidden="true"
	>
		<path d="M6 9l6 6 6-6" />
	</svg>
{/if}
