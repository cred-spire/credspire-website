<script lang="ts">
	import { resolve } from '$app/paths';
	import { guides, guideTopics, type GuideTopic } from '#lib/content';

	let topic = $state<GuideTopic>('All');
	const visible = $derived(
		guides.filter((guide) => topic === 'All' || guide.category === topic).slice(0, 4)
	);
</script>

<div role="tablist" aria-label="Guide topics" class="mb-6 flex flex-wrap gap-2">
	{#each guideTopics as item (item)}
		<button
			type="button"
			role="tab"
			class="chip"
			class:on={topic === item}
			aria-selected={topic === item}
			onclick={() => (topic = item)}
		>
			{item}
		</button>
	{/each}
</div>

<div class="g-grid">
	<a href={resolve('/#guides')} class="g-feature">
		<span class="self-start rounded-full bg-primary px-3 py-1 text-xs font-medium text-white"
			>Featured · Getting started</span
		>
		<h3 class="relative z-1 m-0 max-w-md text-[2.375rem] leading-tight font-medium tracking-tight">
			The first-time borrower's guide to loans in India
		</h3>
		<p class="relative z-1 m-0 max-w-md text-base leading-normal text-faint">
			Loan types, how lenders decide, what EMI really means, and the questions to ask before you
			sign anything.
		</p>
		<span class="relative z-1 mt-auto flex items-center justify-between text-sm text-muted-dark">
			<span>10 min read</span>
			<span class="g-arrow bg-primary text-white">→</span>
		</span>
		<img class="g-img g-img-lg" src="/assets/9e53a2dfa66b1752ac71ca781a65423e.webp" alt="" />
	</a>
	<div class="g-list grid grid-cols-1 content-start gap-4 sm:grid-cols-2">
		{#each visible as guide (guide.title)}
			<a href={resolve('/#guides')} class="g-card {guide.card}">
				<span
					class="relative z-1 self-start rounded-full px-3 py-1 text-xs font-medium {guide.pill}"
					>{guide.category}</span
				>
				<h3
					class="relative z-1 m-0 max-w-[88%] text-[1.3rem] leading-snug font-medium tracking-tight"
				>
					{guide.title}
				</h3>
				<span class="relative z-1 mt-auto flex items-center justify-between text-sm">
					<span class="opacity-75">{guide.minutes} min read</span>
					<span class="g-arrow {guide.arrow}">→</span>
				</span>
				<img class="g-img" src={guide.image} alt="" />
			</a>
		{/each}
		{#if visible.length === 0}
			<p
				class="col-span-full rounded-frame border border-dashed border-chip px-10 py-10 text-center text-ink-soft"
			>
				No guides in this topic yet.
			</p>
		{/if}
	</div>
</div>
