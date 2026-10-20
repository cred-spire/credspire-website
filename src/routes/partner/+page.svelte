<script lang="ts">
	import { resolve } from '$app/paths';
	import { partnerFaqs, partnerRates } from '#lib/content';
	import { formatInr } from '#lib/format';
	import Icons from '#lib/components/Icons.svelte';

	let product = $state(0);
	let count = $state(3);
	let average = $state(500_000);
	let compareOpen = $state(false);
	let name = $state('');
	let mobile = $state('');
	let email = $state('');
	let city = $state('');
	let profession = $state('Loan agent / DSA');
	let experience = $state('Less than 1 year');
	let consent = $state(false);
	let honeypot = $state('');
	let loading = $state(false);
	let submitted = $state(false);
	let errors = $state<Partial<Record<'name' | 'mobile' | 'city' | 'consent', string>>>({});

	const monthly = $derived((count * average * partnerRates[product].rate) / 100);
	const tier = $derived(count >= 15 ? 2 : count >= 5 ? 1 : 0);
	const tierName = $derived(['Starter', 'Growth', 'Elite'][tier]);

	const audiences = [
		{
			title: 'Loan agents & DSAs',
			copy: 'Add more lenders and loan types to what you already offer clients.',
			image: '/assets/0817f59e34e269bb0a4747906fc09c79.webp',
			art: 'bg-primary-soft',
			tag: 'Most common'
		},
		{
			title: 'Chartered accountants',
			copy: 'Help business and individual clients whose finances you already know.',
			image: '/assets/f76cf648fa09edc84bc7bafe93235b01.webp',
			art: 'bg-dark',
			imageClass: 'invert brightness-110'
		},
		{
			title: 'Insurance advisors',
			copy: 'Support clients at big life moments, from a new home to a new business.',
			image: '/assets/9e53a2dfa66b1752ac71ca781a65423e.webp',
			art: 'bg-faq'
		},
		{
			title: 'Real-estate professionals',
			copy: 'Connect home buyers with home loan and LAP options while they decide.',
			image: '/assets/9ae45f587a8eda2385bfd544db62d09c.webp',
			art: 'bg-primary',
			imageClass: 'mix-blend-multiply'
		}
	] as const;

	const tiers = [
		{
			name: 'Starter',
			badge: 'Tier 1',
			badgeClass: 'text-ink-soft',
			dot: 'bg-dot',
			need: '1–4 disbursed loans a month',
			needClass: 'bg-background',
			card: '',
			mark: 'text-primary',
			items: [
				'Base commission per your agreement',
				'All 5 loan types, 40+ lenders',
				'Fortnightly payouts',
				'Email & WhatsApp support'
			],
			action: 'Start as a partner',
			button: 'btn-3d edge-ink border border-foreground bg-surface text-foreground'
		},
		{
			name: 'Growth',
			badge: 'Tier 2 · Most partners',
			badgeClass: 'text-primary-on-dark',
			dot: 'bg-primary',
			need: '5–14 disbursed loans a month',
			needClass: 'bg-dark text-faint',
			card: 'bg-heading text-on-dark border-heading',
			mark: 'text-primary-on-dark',
			items: [
				'Everything in Starter',
				'Volume bonus of up to [+0.10%]',
				'Dedicated partner manager',
				'Co-branded marketing kit'
			],
			action: 'Become a partner →',
			button: 'btn-3d bg-primary text-white'
		},
		{
			name: 'Elite',
			badge: 'Tier 3',
			badgeClass: 'text-primary-edge',
			dot: 'bg-primary-edge',
			need: '15+ disbursed loans a month',
			needClass: 'bg-surface',
			card: 'bg-primary-soft border-primary-soft-deep',
			mark: 'text-primary-edge',
			items: [
				'Everything in Growth',
				'Volume bonus of up to [+0.25%]',
				'Priority lender routing',
				'Quarterly business review'
			],
			action: 'Talk to partnerships',
			button: 'btn-3d edge-black bg-heading text-white'
		}
	] as const;

	type Cell = 'yes' | 'no' | string;
	const matrix: Array<{ group?: string; label?: string; cells?: [Cell, Cell, Cell] }> = [
		{ group: 'Earnings' },
		{ label: 'Base commission (per agreement)', cells: ['yes', 'yes', 'yes'] },
		{ label: 'Volume bonus', cells: ['no', '[+0.10%]', '[+0.25%]'] },
		{ label: 'Payout cycle', cells: ['Fortnightly', 'Fortnightly', 'Fortnightly'] },
		{ group: 'Support' },
		{ label: 'Email & WhatsApp support', cells: ['yes', 'yes', 'yes'] },
		{ label: 'Dedicated partner manager', cells: ['no', 'yes', 'yes'] },
		{ label: 'Priority lender routing', cells: ['no', 'no', 'yes'] },
		{ group: 'Growth tools' },
		{ label: 'Product training sessions', cells: ['yes', 'yes', 'yes'] },
		{ label: 'Co-branded marketing kit', cells: ['no', 'yes', 'yes'] },
		{ label: 'Quarterly business review', cells: ['no', 'no', 'yes'] }
	];
	const preview = matrix.slice(0, 4);

	function submit(event: SubmitEvent) {
		event.preventDefault();
		if (loading) return;
		const next: typeof errors = {};
		if (!name.trim()) next.name = 'Please enter your full name.';
		if (!/^[6-9][0-9]{9}$/.test(mobile.replace(/\s/g, ''))) {
			next.mobile = 'Enter a valid 10-digit mobile number.';
		}
		if (!city.trim()) next.city = 'Please enter your city.';
		if (!consent) next.consent = 'Please accept the Privacy Notice to continue.';
		errors = next;
		if (Object.keys(next).length) return;
		if (honeypot) {
			submitted = true;
			return;
		}
		loading = true;
		window.setTimeout(() => {
			loading = false;
			submitted = true;
		}, 1200);
	}
</script>

<svelte:head>
	<title>Partner programme — CredSpire</title>
	<meta
		name="description"
		content="Refer borrowers to CredSpire and earn when their loan is disbursed. Illustrative earnings only."
	/>
</svelte:head>

<section class="border-b border-rail">
	<div class="rail px-6 pt-8 pb-18">
		<nav aria-label="Breadcrumb" class="mb-4 text-sm text-muted">
			<a href={resolve('/')} class="text-muted no-underline hover:text-primary">Home</a>
			<span aria-hidden="true"> / </span> Partner programme
		</nav>
		<div class="pt-head">
			<div class="pt-tile tilt-a top-2.5 left-[2%] bg-primary-soft text-heading" aria-hidden="true">
				<span
					class="flex size-9 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white"
					>RK</span
				>
				<strong class="text-2xl font-semibold tracking-tight">₹18,750</strong>
				<span class="text-xs opacity-80">Home loan · Pune</span>
			</div>
			<div class="pt-tile tilt-b top-42 left-[9%] bg-dark text-on-dark delay-1" aria-hidden="true">
				<span
					class="flex size-9 items-center justify-center rounded-full bg-on-dark text-[13px] font-semibold text-heading"
					>AS</span
				>
				<strong class="text-2xl font-semibold tracking-tight">₹4,200</strong>
				<span class="text-xs opacity-80">Gold loan · Madurai</span>
			</div>
			<div class="pt-tile tilt-c top-80 left-[3%] bg-primary text-white delay-3" aria-hidden="true">
				<span
					class="flex size-9 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-primary"
					>PM</span
				>
				<strong class="text-2xl font-semibold tracking-tight">₹31,500</strong>
				<span class="text-xs opacity-80">Business loan · Surat</span>
			</div>
			<div class="pt-tile tilt-d top-0 right-[3%] bg-faq text-heading delay-5" aria-hidden="true">
				<span
					class="flex size-9 items-center justify-center rounded-full bg-heading text-[13px] font-semibold text-white"
					>NV</span
				>
				<strong class="text-2xl font-semibold tracking-tight">₹9,800</strong>
				<span class="text-xs opacity-80">Personal loan · Kochi</span>
			</div>
			<div
				class="pt-tile tilt-e top-40 right-[10%] bg-primary text-white delay-6"
				aria-hidden="true"
			>
				<span
					class="flex size-9 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-primary"
					>SJ</span
				>
				<strong class="text-2xl font-semibold tracking-tight">₹26,000</strong>
				<span class="text-xs opacity-80">LAP · Chennai</span>
			</div>
			<div
				class="pt-tile tilt-f top-80 right-[2%] bg-heading text-on-dark delay-7"
				aria-hidden="true"
			>
				<span
					class="flex size-9 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white"
					>DG</span
				>
				<strong class="text-2xl font-semibold tracking-tight">₹12,400</strong>
				<span class="text-xs opacity-80">Personal loan · Jaipur</span>
			</div>
			<div class="relative z-1 flex max-w-155 flex-col items-center gap-4 text-center">
				<span class="text-xs font-medium tracking-[0.14em] text-ink-soft uppercase"
					>CredSpire partner programme</span
				>
				<h1 class="m-0 text-6xl leading-none font-medium tracking-tight text-heading">
					Refer borrowers.<br /><span class="serif text-display text-primary">Earn</span> on every disbursed
					loan.
				</h1>
				<p class="m-0 max-w-125 text-lead text-muted">
					Help your clients find the right financing from banks and NBFCs, and earn commission when
					their loan is disbursed.
				</p>
				<div class="flex flex-wrap justify-center gap-3 pb-1">
					<a
						href="#apply"
						class="btn-3d inline-flex min-h-14 items-center gap-2.5 rounded-btn-lg bg-primary px-6 text-lg font-medium text-white no-underline"
						>Become a partner →</a
					>
					<a
						href="#calc"
						class="btn-3d edge-ink inline-flex min-h-14 items-center rounded-btn-lg border-[1.5px] border-foreground bg-surface px-5 text-lg font-medium text-foreground no-underline"
						>Estimate earnings</a
					>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail flex flex-col gap-8 px-6 py-18">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<h2 class="m-0 text-h2">
				Built for people clients <span class="serif text-h2-serif text-primary">already trust</span>
			</h2>
			<p class="m-0 max-w-100 text-[17px] text-muted">
				If your clients ask you about money, you can help them find the right loan, and earn when
				it's disbursed.
			</p>
		</div>
		<div class="who-grid">
			{#each audiences as person (person.title)}
				<article class="who2">
					<div class="who2-art {person.art}">
						{#if 'tag' in person}
							<span
								class="absolute top-3.5 left-3.5 rounded-full bg-white/85 px-2.5 py-1 text-xs font-medium text-heading"
								>{person.tag}</span
							>
						{/if}
						<img
							src={person.image}
							alt=""
							class={'imageClass' in person ? person.imageClass : ''}
						/>
					</div>
					<div class="flex flex-1 flex-col gap-2 p-5">
						<h3 class="m-0 text-xl font-semibold tracking-tight">{person.title}</h3>
						<p class="m-0 text-sm leading-normal text-muted">{person.copy}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="calc" class="border-b border-rail">
	<div class="rail flex flex-col gap-8 px-6 py-18">
		<div class="flex max-w-160 flex-col gap-2.5">
			<h2 class="m-0 text-h2">
				See what you <span class="serif text-h2-serif text-primary">could earn</span>
			</h2>
			<p class="m-0 text-lg text-muted">
				Pick a loan type and move the sliders. Figures are illustrative.
			</p>
		</div>
		<div class="pt-calc">
			<div class="flex flex-col gap-6 p-6">
				<div class="flex items-baseline justify-between gap-3">
					<h3 class="m-0 text-[1.625rem] font-medium tracking-tight">Estimate your earnings</h3>
					<span
						class="rounded-full border border-mock-line bg-mock px-2.5 py-1 text-xs font-medium whitespace-nowrap text-mock-ink"
						>Illustrative · mock data</span
					>
				</div>
				<div class="flex flex-col gap-2.5">
					<span class="text-sm font-medium">Loan type you refer most</span>
					<div class="flex flex-wrap gap-2">
						{#each partnerRates as item, index (item.label)}
							<button
								type="button"
								class="seg"
								class:on={product === index}
								onclick={() => (product = index)}>{item.label}</button
							>
						{/each}
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<div class="flex justify-between text-sm">
						<label for="pt-n" class="font-medium">Disbursed loans per month</label>
						<strong class="rounded-lg bg-background px-2.5 py-0.5 font-semibold">{count}</strong>
					</div>
					<input id="pt-n" type="range" min="1" max="50" step="1" bind:value={count} />
				</div>
				<div class="flex flex-col gap-2">
					<div class="flex justify-between text-sm">
						<label for="pt-a" class="font-medium">Average loan size</label>
						<strong class="rounded-lg bg-background px-2.5 py-0.5 font-semibold"
							>₹ {formatInr(average)}</strong
						>
					</div>
					<input
						id="pt-a"
						type="range"
						min="100000"
						max="5000000"
						step="50000"
						bind:value={average}
					/>
				</div>
			</div>
			<div class="flex flex-col gap-4 rounded-card bg-dark p-7 text-on-dark">
				<span class="text-sm text-faint">Estimated monthly earnings</span>
				<span class="text-[3.5rem] leading-none font-semibold tracking-tight"
					>₹ {formatInr(monthly)}</span
				>
				<div class="grid grid-cols-2 gap-2.5">
					<div class="rounded-2xl bg-rail-dark p-3.5">
						<span class="block text-xs text-muted-dark">Per fortnightly payout</span>
						<strong class="text-xl font-semibold">₹ {formatInr(monthly / 2)}</strong>
					</div>
					<div class="rounded-2xl bg-rail-dark p-3.5">
						<span class="block text-xs text-muted-dark">Estimated per year</span>
						<strong class="text-xl font-semibold">₹ {formatInr(monthly * 12)}</strong>
					</div>
				</div>
				<div class="border-t border-card-mid pt-3 text-[13px] text-muted-dark">
					{count} loans × ₹{formatInr(average)} × {partnerRates[product].rate.toFixed(1)}%
					commission
				</div>
				<a
					href="#tiers"
					class="flex items-center justify-between gap-2.5 rounded-2xl bg-rail-dark px-3.5 py-3 text-sm text-on-dark no-underline"
				>
					<span
						>At this volume you'd be on <strong class="font-semibold text-primary-on-dark"
							>{tierName}</strong
						></span
					>
					<span class="text-primary-on-dark">See tiers ↓</span>
				</a>
				<a
					href="#apply"
					class="btn-3d mt-auto flex min-h-13 items-center justify-center gap-2.5 rounded-btn-lg bg-primary text-[17px] font-medium text-white no-underline"
					>Apply as a partner →</a
				>
			</div>
		</div>
	</div>
</section>

<section id="tiers" class="border-b border-rail">
	<div class="rail flex flex-col gap-9 px-6 py-18">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div class="flex max-w-160 flex-col gap-2.5">
				<h2 class="m-0 text-h2">
					Grow with <span class="serif text-h2-serif text-primary">partner tiers</span>
				</h2>
				<p class="m-0 text-lg text-muted">
					Everyone starts on Starter. As your monthly disbursals grow, you unlock more support. Your
					tier follows the calculator above.
				</p>
			</div>
			<span
				class="rounded-full border border-mock-line bg-mock px-2.5 py-1 text-xs font-medium whitespace-nowrap text-mock-ink"
				>Illustrative · tiers to be confirmed</span
			>
		</div>
		<div class="tier-grid">
			{#each tiers as card, index (card.name)}
				<article class="tier {card.card ?? ''} {tier === index ? 'here' : ''}">
					{#if tier === index}
						<span
							class="absolute -top-3 right-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-[0_3px_0_var(--color-primary-edge)]"
							>Your estimate</span
						>
					{/if}
					<span
						class="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase {card.badgeClass}"
					>
						<span class="size-2 rounded-full {card.dot}"></span>{card.badge}
					</span>
					<h3 class="m-0 text-3xl font-medium tracking-tight">{card.name}</h3>
					<div class="rounded-xl px-3.5 py-2.5 text-sm {card.needClass}">{card.need}</div>
					<ul class="m-0 flex list-none flex-col gap-3 p-0 text-[15px]">
						{#each card.items as item (item)}
							<li class="flex items-start gap-2.5">
								<Icons name="check" class="mt-0.5 size-4 shrink-0 {card.mark ?? 'text-primary'}" />
								{item}
							</li>
						{/each}
					</ul>
					<a
						href="#apply"
						class="{card.button} mt-auto flex min-h-12 items-center justify-center rounded-btn font-medium no-underline"
						>{card.action}</a
					>
				</article>
			{/each}
		</div>

		<div class="overflow-hidden rounded-frame border border-line bg-surface">
			<div class="overflow-x-auto">
				<div class="min-w-160">
					<div class="matrix-row border-t-0 bg-field font-semibold">
						<span>Compare benefits</span><span>Starter</span><span class="bg-primary-col"
							>Growth</span
						><span>Elite</span>
					</div>
					{#each compareOpen ? matrix : preview as row (`${row.group ?? row.label}`)}
						{#if row.group}
							<div
								class="border-t border-row-line bg-background px-5 py-3 text-xs font-semibold tracking-widest text-ink-soft uppercase"
							>
								{row.group}
							</div>
						{:else if row.label && row.cells}
							<div class="matrix-row">
								<span>{row.label}</span>
								{#each row.cells as cell, cellIndex (cellIndex)}
									<span class={cellIndex === 1 ? 'bg-primary-col' : ''}>
										{#if cell === 'yes'}
											<Icons name="check" class="size-5 text-primary" />
										{:else if cell === 'no'}
											<span class="h-0.5 w-3.5 self-center rounded-sm bg-dash"></span>
										{:else}
											{cell}
										{/if}
									</span>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			</div>
			<button
				type="button"
				class="flex w-full items-center justify-center gap-2 border-0 border-t border-row-line bg-surface px-4 py-4 text-[15px] font-medium text-primary"
				aria-expanded={compareOpen}
				onclick={() => (compareOpen = !compareOpen)}
			>
				{compareOpen ? 'Show fewer benefits' : 'Compare all benefits'}
				<Icons
					name="chevron"
					class="size-4 transition-transform {compareOpen ? 'rotate-180' : ''}"
				/>
			</button>
		</div>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail flex flex-col gap-8 px-6 py-18">
		<h2 class="m-0 text-h2">How it <span class="serif text-h2-serif text-primary">works</span></h2>
		<div class="pt-steps">
			<div
				class="flex min-h-55 flex-col gap-2.5 rounded-frame bg-primary p-7 text-white transition-transform duration-300 hover:-translate-y-1.5"
			>
				<span class="flex size-10 items-center justify-center rounded-xl bg-white/20 font-semibold"
					>1</span
				>
				<h3 class="m-0 mt-2 text-[1.375rem] font-medium tracking-tight">Apply & get verified</h3>
				<p class="m-0 text-[15px] leading-normal text-white/90">
					Submit the partner form below. Our team checks eligibility and shares the partner
					agreement.
				</p>
			</div>
			<div
				class="flex min-h-55 flex-col gap-2.5 rounded-frame bg-dark p-7 text-on-dark transition-transform duration-300 hover:-translate-y-1.5"
			>
				<span class="flex size-10 items-center justify-center rounded-xl bg-card-mid font-semibold"
					>2</span
				>
				<h3 class="m-0 mt-2 text-[1.375rem] font-medium tracking-tight">Refer borrowers</h3>
				<p class="m-0 text-[15px] leading-normal text-dot">
					Share client requirements through your partner link or our team. We handle lender matching
					and follow-up.
				</p>
			</div>
			<div
				class="flex min-h-55 flex-col gap-2.5 rounded-frame border border-line bg-surface p-7 text-heading transition-transform duration-300 hover:-translate-y-1.5"
			>
				<span
					class="flex size-10 items-center justify-center rounded-xl bg-primary-soft font-semibold text-primary-edge"
					>3</span
				>
				<h3 class="m-0 mt-2 text-[1.375rem] font-medium tracking-tight">Get paid fortnightly</h3>
				<p class="m-0 text-[15px] leading-normal text-muted">
					Commission is credited after the lender disburses the loan and qualifying conditions are
					met.
				</p>
			</div>
		</div>
	</div>
</section>

<section id="apply" class="border-b border-rail">
	<div class="rail flex flex-wrap items-start gap-8 px-6 py-18">
		<div class="flex min-w-0 flex-1 basis-85 flex-col gap-4">
			<h2 class="m-0 text-h2">
				Apply to <span class="serif text-h2-serif text-primary">partner</span> with us
			</h2>
			<p class="m-0 text-[17px] text-muted">
				Tell us a little about you. Our partnerships team will contact you to check eligibility and
				walk you through onboarding.
			</p>
			<ul class="m-0 mt-2 flex list-none flex-col gap-3 p-0 text-[15px]">
				{#each ['No joining fee [to confirm]', 'Dedicated partner manager', 'Transparent, agreement-based payouts'] as item (item)}
					<li class="flex gap-2.5">
						<Icons name="check" class="size-5 shrink-0 text-primary" />{item}
					</li>
				{/each}
			</ul>
		</div>
		<div class="min-w-0 flex-1 basis-140 rounded-frame bg-dark p-5">
			<div class="rounded-btn-lg bg-surface p-8">
				{#if !submitted}
					<form class="grid grid-cols-1 gap-4 sm:grid-cols-2" novalidate onsubmit={submit}>
						<div class="flex flex-col gap-1.5 sm:col-span-2">
							<label for="p-name" class="text-sm font-medium">Full name</label>
							<input
								id="p-name"
								class="field"
								type="text"
								autocomplete="name"
								bind:value={name}
								aria-invalid={errors.name ? 'true' : undefined}
							/>
							{#if errors.name}<span class="text-[13px] text-danger">{errors.name}</span>{/if}
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="p-mob" class="text-sm font-medium">Mobile number</label>
							<input
								id="p-mob"
								class="field"
								type="tel"
								inputmode="numeric"
								maxlength="10"
								autocomplete="tel-national"
								placeholder="10-digit mobile"
								bind:value={mobile}
								aria-invalid={errors.mobile ? 'true' : undefined}
							/>
							{#if errors.mobile}<span class="text-[13px] text-danger">{errors.mobile}</span>{/if}
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="p-email" class="text-sm font-medium">Email</label>
							<input
								id="p-email"
								class="field"
								type="email"
								autocomplete="email"
								placeholder="you@example.com"
								bind:value={email}
							/>
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="p-city" class="text-sm font-medium">City</label>
							<input
								id="p-city"
								class="field"
								type="text"
								autocomplete="address-level2"
								bind:value={city}
								aria-invalid={errors.city ? 'true' : undefined}
							/>
							{#if errors.city}<span class="text-[13px] text-danger">{errors.city}</span>{/if}
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="p-prof" class="text-sm font-medium">Profession</label>
							<select id="p-prof" class="field" bind:value={profession}>
								<option>Loan agent / DSA</option>
								<option>Chartered accountant</option>
								<option>Insurance advisor</option>
								<option>Real-estate professional</option>
								<option>Other</option>
							</select>
						</div>
						<div class="flex flex-col gap-1.5 sm:col-span-2">
							<label for="p-exp" class="text-sm font-medium">Experience in financial services</label
							>
							<select id="p-exp" class="field" bind:value={experience}>
								<option>Less than 1 year</option>
								<option>1–3 years</option>
								<option>3–5 years</option>
								<option>More than 5 years</option>
							</select>
						</div>
						<label class="sr-only" for="p-website">Website</label>
						<input
							id="p-website"
							class="sr-only"
							tabindex="-1"
							autocomplete="off"
							bind:value={honeypot}
						/>
						<label class="flex items-start gap-2.5 text-sm leading-normal text-muted sm:col-span-2">
							<input
								type="checkbox"
								class="mt-0.5 size-5 shrink-0 accent-primary"
								bind:checked={consent}
							/>
							<span
								>I agree to the <a href={resolve('/#privacy')}>Privacy Notice</a> and allow CredSpire
								to contact me about the partner programme.</span
							>
						</label>
						{#if errors.consent}<span class="text-[13px] text-danger sm:col-span-2"
								>{errors.consent}</span
							>{/if}
						<div class="pb-1 sm:col-span-2">
							<button
								type="submit"
								class="btn-3d flex min-h-14 w-full items-center justify-center gap-3 rounded-btn-lg border-0 bg-primary text-lg font-medium text-white"
								disabled={loading}
							>
								{#if loading}<span class="spin" aria-hidden="true"></span>{/if}
								{loading ? 'Submitting…' : 'Submit application →'}
							</button>
						</div>
					</form>
				{:else}
					<div class="flex flex-col items-start gap-3.5 px-1 py-3" role="status">
						<span
							class="flex size-14 items-center justify-center rounded-full bg-success-soft text-success"
						>
							<Icons name="check" class="size-7" />
						</span>
						<h3 class="m-0 text-3xl font-medium tracking-tight">Thanks, application received</h3>
						<p class="m-0 text-[17px] text-muted">
							Reference <strong class="text-foreground">[CSP-000045]</strong>. Our partnerships team
							will contact you within [response time] to discuss next steps.
						</p>
						<button
							type="button"
							class="btn-3d btn-3d-sm edge-dark min-h-11 rounded-btn border-0 bg-heading px-5 text-[15px] font-medium text-white"
							onclick={() => {
								submitted = false;
								errors = {};
							}}
						>
							Submit another application
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail flex flex-col items-center gap-6 px-6 py-18">
		<h2 class="m-0 text-[2.5rem] font-medium tracking-tight">Partner FAQs</h2>
		<div class="w-full max-w-190 rounded-card bg-surface px-7 py-2 shadow-lift">
			{#each partnerFaqs as item (item.question)}
				<details class="border-b border-row-line last:border-b-0">
					<summary class="flex items-center justify-between gap-4 py-4 text-base font-medium">
						{item.question}
						<Icons name="chevron" class="faq-chev size-4 shrink-0 text-muted" />
					</summary>
					<p class="m-0 pb-4 text-[15px] text-muted">{item.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	:global(details[open] .faq-chev) {
		transform: rotate(180deg);
	}
</style>
