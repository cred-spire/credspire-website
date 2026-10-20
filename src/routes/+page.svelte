<script lang="ts">
	import { resolve } from '$app/paths';
	import { homeFaqs, ledgerArt, lenders, mark, phoneArt } from '#lib/content';
	import Comparison from '#lib/components/Comparison.svelte';
	import Guides from '#lib/components/Guides.svelte';
	import Icons from '#lib/components/Icons.svelte';
	import LoanPicker from '#lib/components/LoanPicker.svelte';
	import Testimonials from '#lib/components/Testimonials.svelte';
</script>

<svelte:head>
	<title>CredSpire — Find the right loan</title>
	<meta
		name="description"
		content="Compare loan options, estimate your EMI and get a call from an authorised CredSpire representative."
	/>
</svelte:head>

<section id="top" class="hero-wash border-b border-rail">
	<div class="rail flex flex-wrap items-center justify-center gap-10 px-6 pt-24 pb-22">
		<div class="flex max-w-180 flex-1 basis-140 flex-col items-center gap-5 text-center">
			<h1 class="m-0 text-display text-heading">
				Find the right loan.<br />At the
				<span class="serif text-display-serif text-primary">speed of you.</span>
			</h1>
			<p class="m-0 max-w-130 text-lead text-edge-dark">
				No confusion, no running between banks. Compare options, estimate your EMI and get a call
				from an authorised representative.
			</p>
			<a
				href={resolve('/enquire')}
				class="btn-3d mt-1.5 inline-flex min-h-14 items-center gap-2.5 rounded-btn-lg bg-primary px-7 text-lead font-medium text-white no-underline"
			>
				Check my loan options
				<Icons name="arrow" class="size-4.5" />
			</a>
		</div>
	</div>
</section>

<section aria-label="Lending partners" class="border-b border-rail">
	<div class="rail flex flex-col gap-4 py-7">
		<p class="m-0 text-center text-sm text-muted">
			Explore loan options from India's leading banks
		</p>
		<div class="marquee-mask">
			<div class="marquee">
				{#each [0, 1] as copy (copy)}
					{#each lenders as lender (copy + lender.name)}
						<img
							class="logo-mute {lender.height} w-auto"
							src={lender.src}
							alt={copy === 0 ? lender.name : ''}
							aria-hidden={copy === 1 ? 'true' : undefined}
						/>
					{/each}
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail px-6 py-16">
		<div
			class="flex flex-wrap items-center gap-10 overflow-hidden rounded-frame bg-dark p-12 text-on-dark"
		>
			<p class="m-0 min-w-0 flex-1 basis-130 text-3xl leading-snug font-normal tracking-tight">
				<span class="text-primary-on-dark">CredSpire</span> is a loan discovery and referral platform
				that connects you with banks and NBFCs. That means clear information, honest estimates, and a
				team that explains every next step.
			</p>
			<div class="relative min-h-55 min-w-0 flex-1 basis-80" aria-hidden="true">
				<div
					class="absolute top-2.5 left-1/2 flex w-65 -translate-x-[40%] rotate-6 flex-col gap-2.5 rounded-2xl bg-surface p-4 text-foreground shadow-float"
				>
					<span class="text-[13px] font-semibold">Matched lenders</span>
					<span class="h-2.5 w-[90%] rounded bg-faq"></span>
					<span class="h-2.5 w-[70%] rounded bg-faq"></span>
					<span class="h-2.5 w-[80%] rounded bg-faq"></span>
					<span class="self-end rounded-lg bg-primary px-2.5 py-1 text-[11px] text-white">View</span
					>
				</div>
				<div
					class="absolute top-15 left-1/2 flex w-57.5 -translate-x-[85%] -rotate-4 flex-col gap-2.5 rounded-2xl bg-surface p-4 text-foreground shadow-float"
				>
					<span class="text-[13px] font-semibold">Your enquiry</span>
					<span class="text-xs text-muted">Business loan · ₹25,00,000</span>
					<span class="h-2.5 w-3/4 rounded bg-faq"></span>
					<span class="h-2.5 w-[55%] rounded bg-faq"></span>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="loans" class="border-b border-rail">
	<div class="rail overflow-hidden pt-18 pb-20">
		<div class="mb-10 flex flex-col items-center gap-3.5 px-6 text-center">
			<h2 class="m-0 text-h2 text-heading">
				Loans designed around <span class="serif text-h2-serif text-primary">every stage</span> of life
			</h2>
			<p class="m-0 max-w-155 text-lg text-muted">
				From your first bike to your next factory, pick the loan that fits where you are. Hover or
				tap a card to see more.
			</p>
		</div>
		<div class="px-6">
			<LoanPicker />
		</div>
	</div>
</section>

<section class="bg-dark text-on-dark">
	<div class="rail-dark px-6 py-18">
		<div class="mb-10 flex flex-col items-center gap-3.5 text-center">
			<h2 class="m-0 text-5xl leading-none font-medium tracking-tight">
				<span class="serif text-6xl text-primary-on-dark">Stop running</span> between banks
			</h2>
			<p class="m-0 max-w-140 text-lg text-faint">
				See how borrowing with CredSpire compares with doing it all on your own.
			</p>
		</div>
		<Comparison />
		<div class="mt-9 flex flex-wrap items-center justify-center gap-5 pb-1">
			<a
				href={resolve('/enquire')}
				class="btn-3d inline-flex min-h-13 items-center gap-2.5 rounded-btn-lg bg-primary px-6 text-[17px] font-medium text-white no-underline"
				>Start your enquiry →</a
			>
			<a
				href={resolve('/emi')}
				class="text-base font-medium text-on-dark no-underline hover:text-primary-on-dark"
				>Estimate your EMI first</a
			>
		</div>
	</div>
</section>

<section id="paths" class="border-b border-rail">
	<div class="rail flex flex-col gap-9 px-6 py-18">
		<div class="flex flex-col items-center gap-3.5 text-center">
			<h2 class="m-0 text-h2 text-heading">
				Choose how to <span class="serif text-[3.25rem] text-primary">get started</span>
			</h2>
			<p class="m-0 max-w-140 text-lg text-muted">
				Work out your numbers on your own, or let a loan expert guide you. Either way, it's your
				call.
			</p>
		</div>
		<div class="path-grid">
			<article class="path-card">
				<div class="path-art" aria-hidden="true">
					<img class="art-ledger block h-auto w-75" src={ledgerArt} alt="" />
				</div>
				<span class="text-[13px] font-medium tracking-wide text-ink-soft">Self-serve</span>
				<h3 class="m-0 text-[1.75rem] leading-none font-medium tracking-tight text-heading">
					Estimate on your own
				</h3>
				<p class="m-0 border-b border-row-line pb-1.5 text-[15px] leading-normal text-muted">
					Know your numbers before you speak to anyone. With the EMI calculator you get:
				</p>
				<ul class="my-1.5 mb-4 flex list-none flex-col gap-2.5 p-0 text-[15px] text-foreground">
					{#each ['Instant EMI as you move the sliders', 'Total interest and total amount payable', 'Year-by-year repayment schedule', 'No sign-up, no phone number'] as item (item)}
						<li class="flex items-center gap-2.5">
							<Icons name="check" class="size-4.5 shrink-0" />{item}
						</li>
					{/each}
				</ul>
				<a
					href={resolve('/emi')}
					class="btn-3d edge-dark mt-auto flex min-h-13 items-center justify-center gap-2.5 rounded-btn-lg bg-heading text-[17px] font-medium text-white no-underline"
					>Open EMI calculator →</a
				>
			</article>
			<article class="path-card path-card-lift">
				<span
					class="absolute -top-3 right-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-[0_3px_0_var(--color-primary-edge)]"
					>Personal help</span
				>
				<div class="path-art" aria-hidden="true">
					<img class="art-phone block h-auto w-62" src={phoneArt} alt="" />
				</div>
				<span class="text-[13px] font-medium tracking-wide text-ink-soft">Guided</span>
				<h3 class="m-0 text-[1.75rem] leading-none font-medium tracking-tight text-heading">
					Talk to a loan expert
				</h3>
				<p class="m-0 border-b border-row-line pb-1.5 text-[15px] leading-normal text-muted">
					Share a few details and an authorised representative calls you back to help with:
				</p>
				<ul class="my-1.5 mb-4 flex list-none flex-col gap-2.5 p-0 text-[15px] text-foreground">
					{#each ['Choosing the right loan type', 'Suitable banks and NBFCs for your profile', 'Documents lenders usually ask for', 'Next steps, explained simply'] as item (item)}
						<li class="flex items-center gap-2.5 text-primary">
							<Icons name="check" class="size-4.5 shrink-0" /><span class="text-foreground"
								>{item}</span
							>
						</li>
					{/each}
				</ul>
				<a
					href={resolve('/enquire')}
					class="btn-3d mt-auto flex min-h-13 items-center justify-center gap-2.5 rounded-btn-lg bg-primary text-[17px] font-medium text-white no-underline"
					>Request a call back →</a
				>
			</article>
		</div>
		<p class="m-0 text-center text-[13px] text-ink-soft">
			EMI figures are estimates. An enquiry is not a loan application or approval.
		</p>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail overflow-hidden pt-18 pb-20">
		<Testimonials />
		<p class="mx-6 mt-5 text-center text-xs text-ink-soft">
			Testimonials will be published only with the customer's written consent. Individual
			experiences vary; loan decisions are made by lenders.
		</p>
	</div>
</section>

<section id="partner" class="border-b border-rail">
	<div class="rail px-6 pt-18 pb-20">
		<div
			class="relative flex flex-wrap items-center gap-10 overflow-hidden rounded-panel bg-dark px-12 pt-14 pb-16"
		>
			<div class="relative z-1 flex min-w-0 flex-1 basis-110 flex-col gap-4">
				<span class="text-xs font-medium tracking-[0.14em] text-muted-dark uppercase"
					>Partner programme</span
				>
				<h2 class="m-0 text-5xl leading-none font-medium tracking-tight text-white">
					Refer borrowers.<br /><span class="serif text-6xl text-primary-on-dark">Earn</span> on every
					disbursed loan.
				</h2>
				<p class="m-0 max-w-115 text-[17px] text-faint">
					For loan agents, CAs, insurance advisors and real-estate professionals. See how it works
					and estimate your earnings.
				</p>
				<a
					href={resolve('/partner')}
					class="btn-3d inline-flex min-h-13 w-fit items-center gap-2.5 rounded-btn-lg bg-primary px-6 text-[17px] font-medium text-white no-underline"
					>Explore partner programme →</a
				>
			</div>
			<div class="flex flex-1 basis-95 justify-center gap-3.5" aria-hidden="true">
				<div class="pt-tile tilt-a relative bg-primary-soft text-heading">
					<span
						class="flex size-9 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white"
						>RK</span
					>
					<strong class="text-2xl font-semibold tracking-tight">₹18,750</strong>
					<span class="text-xs opacity-80">Home loan · Pune</span>
				</div>
				<div class="pt-tile tilt-b relative mt-15 bg-primary text-white delay-2">
					<span
						class="flex size-9 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-primary"
						>PM</span
					>
					<strong class="text-2xl font-semibold tracking-tight">₹31,500</strong>
					<span class="text-xs opacity-80">Business · Surat</span>
				</div>
				<div class="pt-tile tilt-c relative bg-on-dark text-heading delay-4">
					<span
						class="flex size-9 items-center justify-center rounded-full bg-heading text-[13px] font-semibold text-white"
						>NV</span
					>
					<strong class="text-2xl font-semibold tracking-tight">₹9,800</strong>
					<span class="text-xs opacity-80">Personal · Kochi</span>
				</div>
			</div>
			<span class="absolute bottom-4 left-12 text-[11px] text-legal"
				>Illustrative mock figures. Not a guarantee of earnings.</span
			>
		</div>
	</div>
</section>

<section id="guides" class="border-b border-rail">
	<div class="rail px-6 py-18">
		<div class="mb-7 flex flex-wrap items-end justify-between gap-5">
			<div class="flex max-w-155 flex-col gap-2.5">
				<h2 class="m-0 text-h2 text-heading">
					Borrow with <span class="serif text-h2-serif text-primary">confidence</span>
				</h2>
				<p class="m-0 text-lg text-muted">
					Plain-language guides to help you understand loans before you apply.
				</p>
			</div>
			<a
				href={resolve('/#guides')}
				class="btn-3d btn-3d-sm edge-dark inline-flex min-h-11 items-center rounded-btn bg-heading px-4 text-[15px] font-medium text-white no-underline"
				>All guides →</a
			>
		</div>
		<Guides />
	</div>
</section>

<section id="faq" class="border-b border-rail">
	<div class="rail px-6 py-20">
		<div class="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
			<div class="flex flex-col gap-4 lg:sticky lg:top-24">
				<h2 class="m-0 text-5xl leading-none font-medium tracking-tight">
					Questions, <span class="serif text-6xl text-primary">answered</span>
				</h2>
				<p class="m-0 max-w-85 text-[17px] text-muted">
					Everything you need to know about borrowing through CredSpire.
				</p>
				<div
					class="relative mt-3 flex min-h-50 flex-col gap-2 overflow-hidden rounded-frame bg-primary-soft p-6"
				>
					<img
						src={phoneArt}
						alt=""
						class="pointer-events-none absolute -right-4 -bottom-3 w-42 -rotate-6"
					/>
					<strong class="relative text-lg font-semibold tracking-tight"
						>Still have a question?</strong
					>
					<span class="relative max-w-55 text-sm text-muted"
						>Our team is happy to help on working days.</span
					>
					<a
						href={resolve('/enquire')}
						class="btn-3d btn-3d-sm edge-dark relative inline-flex min-h-11 w-fit items-center rounded-btn bg-heading px-4 text-[15px] font-medium text-white no-underline"
						>Talk to us →</a
					>
				</div>
			</div>
			<div class="faq-list">
				{#each homeFaqs as item, index (item.question)}
					<details class="faq-item" open={index === 0}>
						<summary>
							{item.question}
							<span class="faq-ic" aria-hidden="true"></span>
						</summary>
						<p>
							{#if 'href' in item}
								Visit the <a href={resolve(item.href)}>{item.linkLabel}</a> page and submit the application.
								Our team will check eligibility and take you through onboarding and the partner agreement.
							{:else}
								{item.answer}
							{/if}
						</p>
					</details>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail px-6 pt-6 pb-20">
		<div class="cta-card">
			<div class="relative z-1 flex max-w-xl flex-col items-center gap-5 text-center">
				<img
					src={mark}
					alt=""
					class="size-16 rounded-btn-lg shadow-[0_0_0_6px_rgb(255_255_255_/_18%)]"
				/>
				<h2 class="m-0 text-[4rem] leading-none font-medium tracking-tight">
					Your credit.<br />Your growth.<br />
					<span class="serif text-[4.625rem] text-heading">Your future.</span>
				</h2>
				<p class="m-0 max-w-110 text-lead text-white/90">
					Start with one enquiry. We will take it from there.
				</p>
				<div class="flex flex-wrap justify-center gap-3 pb-1">
					<a
						href={resolve('/enquire')}
						class="btn-3d edge-black inline-flex min-h-14 items-center gap-2.5 rounded-btn-lg bg-heading px-7 text-lg font-medium text-white no-underline"
						>Start your enquiry →</a
					>
					<a
						href={resolve('/partner')}
						class="btn-3d inline-flex min-h-14 items-center rounded-btn-lg bg-white px-6 text-lg font-medium text-heading no-underline"
						>Become a partner</a
					>
				</div>
			</div>
		</div>
	</div>
</section>
