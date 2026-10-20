<script lang="ts">
	import { comparisons, logo } from '#lib/content';
	import Icons from './Icons.svelte';

	let root = $state<HTMLElement | null>(null);
	let visible = $state(false);

	$effect(() => {
		const node = root;
		if (!node) return;
		if (typeof IntersectionObserver === 'undefined') {
			visible = true;
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.25 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={root}
	class="versus mx-auto max-w-245 overflow-hidden rounded-frame bg-surface text-foreground shadow-float"
	class:in={visible}
>
	<div class="versus-head">
		<div class="flex items-center gap-2.5 bg-warm px-7 py-5">
			<span class="text-[17px] font-medium text-muted">Doing it alone</span>
		</div>
		<div class="flex items-center gap-3 border-l border-warm-line bg-warm px-7 py-5">
			<img src={logo} alt="CredSpire" class="h-7 w-auto" />
		</div>
	</div>
	{#each comparisons as row (row.withUs)}
		<div class="versus-row">
			<div class="flex items-center gap-3 px-7 py-5 text-[15px] text-ink-soft">
				<Icons name="ban" class="size-5 shrink-0 text-muted-dark" />
				<span class="strike">{row.alone}</span>
			</div>
			<div
				class="flex items-start gap-3.5 border-l border-primary-wash-line bg-primary-wash px-7 py-4 text-base text-heading"
			>
				<span class="tick"><Icons name="check" class="size-3.5 text-white" /></span>
				<span>
					<strong class="block font-semibold tracking-tight">{row.withUs}</strong>
					<span class="mt-0.5 block text-sm text-muted">{row.detail}</span>
				</span>
			</div>
		</div>
	{/each}
</div>
