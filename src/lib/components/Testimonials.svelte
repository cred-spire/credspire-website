<script lang="ts">
	import { testimonials } from '#lib/content';
	import Icons from './Icons.svelte';

	let index = $state(0);
	let paused = $state(false);
	const last = 3;

	$effect(() => {
		if (paused) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const timer = window.setInterval(() => {
			index = (index + 1) % (last + 1);
		}, 5000);
		return () => window.clearInterval(timer);
	});
</script>

<div class="mb-9 flex flex-wrap items-end justify-between gap-5 px-6">
	<div class="flex max-w-xl flex-col gap-2.5">
		<h2 class="m-0 text-h2 text-heading">
			Built for <span class="serif text-h2-serif text-primary">borrowers</span> who plan ahead
		</h2>
		<p class="m-0 text-lg text-muted">Stories from people who found their loan with CredSpire.</p>
	</div>
	<div class="flex items-center gap-2.5">
		<button
			type="button"
			class="flex size-12 items-center justify-center rounded-full border border-chip bg-surface disabled:opacity-40"
			aria-label="Previous stories"
			disabled={index === 0}
			onclick={() => (index = Math.max(0, index - 1))}
		>
			<Icons name="arrow" class="size-5 rotate-180" />
		</button>
		<button
			type="button"
			class="flex size-12 items-center justify-center rounded-full border-0 bg-heading text-white"
			aria-label="Next stories"
			onclick={() => (index = (index + 1) % (last + 1))}
		>
			<Icons name="arrow" class="size-5" />
		</button>
	</div>
</div>

<div
	class="px-6"
	role="region"
	aria-roledescription="carousel"
	aria-label="Borrower stories"
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
	onfocusin={() => (paused = true)}
	onfocusout={() => (paused = false)}
>
	<div class="overflow-hidden">
		<div class="t-track" style:transform="translateX(-{index * 21}rem)">
			{#each testimonials as story (story.tag)}
				<figure class="tcard {story.card}">
					<span class="self-start rounded-full px-3 py-1.5 text-[13px] font-medium {story.tagClass}"
						>{story.tag}</span
					>
					<blockquote class="m-0 text-xl leading-snug font-normal tracking-tight">
						“{story.quote}”
					</blockquote>
					<figcaption
						class="mt-auto flex items-center gap-3 border-t border-dashed pt-4 text-[15px] {story.rule}"
					>
						<span
							class="flex size-11 shrink-0 items-center justify-center rounded-2xl {story.avatar}"
						>
							<Icons name="person" class="size-5" />
						</span>
						<span>
							<strong class="block font-semibold">{story.name}</strong>
							<span class="block text-[13px] opacity-80">{story.role}</span>
						</span>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
	<div class="mt-7 flex justify-center gap-2">
		{#each [0, 1, 2, 3] as dot (dot)}
			<button
				type="button"
				class="h-2 rounded-full bg-chip transition-all {index === dot ? 'w-7 bg-heading' : 'w-2'}"
				aria-label="Show stories starting at {dot + 1}"
				aria-current={index === dot ? 'true' : undefined}
				onclick={() => (index = dot)}
			></button>
		{/each}
	</div>
</div>
