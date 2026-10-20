<script lang="ts">
	import { resolve } from '$app/paths';
	import { loanCards } from '#lib/content';
	import Icons from './Icons.svelte';

	let active = $state(1);
</script>

<div class="pick-row">
	{#each loanCards as loan, index (loan.id)}
		<article
			class="pick-card {loan.surface}"
			class:on={active === index}
			onmouseenter={() => (active = index)}
			onfocusin={() => (active = index)}
		>
			<div class="pick-visual" style:top={loan.visualTop}>
				<img src={loan.image} alt="" class="pick-img" />
			</div>
			<button
				type="button"
				class="pick-pill"
				aria-pressed={active === index}
				onclick={() => (active = index)}
			>
				{loan.pill}
			</button>
			<div class="pick-detail">
				<span class="text-[13px] font-medium text-muted">{loan.eyebrow}</span>
				<h3 class="m-0 text-2xl leading-tight font-semibold tracking-tight text-heading">
					{loan.title}
				</h3>
				<p class="m-0 mb-2.5 text-[15px] leading-snug text-muted">{loan.description}</p>
				<div class="flex items-center gap-4 pb-1">
					<a
						href={resolve('/enquire')}
						class="btn-3d btn-3d-sm edge-dark inline-flex min-h-10 items-center rounded-full bg-heading px-4 text-sm font-medium text-white no-underline"
						>Check eligibility</a
					>
					<a
						href={resolve('/emi')}
						class="text-sm font-medium text-foreground no-underline hover:text-primary"
						>Calculate EMI →</a
					>
				</div>
			</div>
		</article>
	{/each}
</div>
<div class="mt-5 flex flex-wrap items-center justify-between gap-3.5 px-6">
	<span class="text-[15px] text-muted">
		Also available: Education, Vehicle and Working capital loans.
		<a href={resolve('/#loans')} class="font-medium">View all loans →</a>
	</span>
	<span class="flex items-center gap-3.5">
		<span class="text-[15px] text-muted">Not sure which one fits? We'll help you choose.</span>
		<a
			href={resolve('/enquire')}
			class="btn-3d btn-3d-sm flex size-13 items-center justify-center rounded-full bg-primary text-white no-underline"
			aria-label="Help me choose a loan"
		>
			<Icons name="plus" class="size-5" />
		</a>
	</span>
</div>
