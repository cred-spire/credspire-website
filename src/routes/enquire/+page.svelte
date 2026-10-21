<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		amountRanges,
		employmentTypes,
		enquiryLoans,
		incomeBands,
		phoneArt,
		timelines
	} from '#lib/content';
	import { formatInr } from '#lib/format';
	import Icons from '#lib/components/Icons.svelte';

	const steps = ['Loan', 'Amount', 'About you', 'Contact'] as const;
	const stepTime = ['', 'About 1 minute', 'About 45 seconds', 'About 30 seconds', 'Last step'];

	let step = $state(1);
	let loan = $state(-1);
	let amount = $state(-1);
	let when = $state(-1);
	let employment = $state(-1);
	let income = $state(-1);
	let exact = $state('');
	let city = $state('');
	let name = $state('');
	let mobile = $state('');
	let email = $state('');
	let consent = $state(false);
	let honeypot = $state('');
	let loading = $state(false);
	let submitted = $state(false);
	let errors = $state<
		Partial<
			Record<'loan' | 'amount' | 'employment' | 'city' | 'name' | 'mobile' | 'consent', string>
		>
	>({});

	const firstName = $derived(name.trim().split(' ')[0]);
	const exactNumber = $derived(Number(exact.replace(/[^0-9]/g, '')));
	const summaryAmount = $derived(
		exactNumber ? `₹${formatInr(exactNumber)}` : amount >= 0 ? amountRanges[amount] : '—'
	);

	function clear(key: keyof typeof errors) {
		if (!errors[key]) return;
		const next = { ...errors };
		delete next[key];
		errors = next;
	}

	function chooseLoan(index: number) {
		loan = index;
		clear('loan');
		if (step === 1) {
			window.setTimeout(() => {
				if (step === 1 && loan === index) step = 2;
			}, 280);
		}
	}

	function validate(): boolean {
		const next: typeof errors = {};
		if (step === 1 && loan < 0) next.loan = 'Please choose a loan type.';
		if (step === 2 && amount < 0 && !exact.replace(/[^0-9]/g, '')) {
			next.amount = 'Choose a range or enter an amount.';
		}
		if (step === 3) {
			if (employment < 0) next.employment = 'Please choose your employment type.';
			else if (!city.trim()) next.city = 'Please enter your city.';
		}
		if (step === 4) {
			if (!name.trim()) next.name = 'Please enter your full name.';
			if (!/^[6-9][0-9]{9}$/.test(mobile.replace(/\s/g, ''))) {
				next.mobile = 'Enter a valid 10-digit mobile number.';
			}
			if (!consent) next.consent = 'Please accept the Privacy Notice to continue.';
		}
		errors = next;
		return Object.keys(next).length === 0;
	}

	function back() {
		step = Math.max(1, step - 1);
		errors = {};
	}

	function nextStep() {
		if (loading || !validate()) return;
		if (step < 4) {
			step += 1;
			errors = {};
			return;
		}
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

	function reset() {
		step = 1;
		loan = -1;
		amount = -1;
		when = -1;
		employment = -1;
		income = -1;
		exact = '';
		city = '';
		name = '';
		mobile = '';
		email = '';
		consent = false;
		honeypot = '';
		errors = {};
		submitted = false;
	}
</script>

<svelte:head>
	<title>Loan enquiry — CredSpire</title>
	<meta
		name="description"
		content="Tell CredSpire what you need. An authorised representative calls you back with suitable lending options."
	/>
</svelte:head>

<section class="border-b border-rail">
	<div class="rail px-6 pt-10 pb-18">
		<div class="wiz-grid">
			<div class="flex flex-col gap-4 lg:sticky lg:top-24">
				<nav aria-label="Breadcrumb" class="text-sm text-muted">
					<a href={resolve('/')} class="text-muted no-underline hover:text-primary">Home</a>
					<span aria-hidden="true"> / </span> Loan enquiry
				</nav>
				<h1 class="m-0 text-h1 text-heading">
					Tell us what you <span class="serif text-h1-serif text-primary">need.</span>
				</h1>
				<p class="m-0 max-w-115 text-lead text-edge-dark">
					Four quick steps, about a minute. An authorised representative will call you back with
					suitable options from our lending partners.
				</p>
				<ul class="m-0 flex list-none flex-col gap-3 p-0 text-[15px]">
					{#each ['No credit check to submit an enquiry', 'Call back within [response time] on working days', 'Shared only with lenders you consent to'] as point (point)}
						<li class="flex items-center gap-2.5">
							<span
								class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
							>
								<Icons name="check" class="size-3" />
							</span>
							{point}
						</li>
					{/each}
				</ul>
				<div class="relative mt-3 min-h-37 overflow-hidden rounded-frame bg-primary-soft px-6 py-5">
					<img
						src={phoneArt}
						alt=""
						class="pointer-events-none absolute -right-4 -bottom-4 w-45 -rotate-6"
					/>
					<strong class="relative block text-[17px] font-semibold tracking-tight"
						>Prefer to speak now?</strong
					>
					<span class="relative mt-1 block max-w-55 text-sm text-muted"
						>Call [phone number], Mon–Sat, 9:30am–6:30pm</span
					>
					<span class="relative mt-2.5 block text-[13px] text-ink-soft"
						>We never ask for passwords, card details or OTPs.</span
					>
				</div>
			</div>

			<div class="wiz">
				{#if !submitted}
					<div class="mb-2.5 flex justify-between text-[13px] text-ink-soft">
						<span>Step {step} of 4</span>
						<span>{stepTime[step]}</span>
					</div>
					<div
						class="h-1.5 overflow-hidden rounded-sm bg-faq"
						role="progressbar"
						aria-valuemin="1"
						aria-valuemax="4"
						aria-valuenow={step}
						aria-label="Enquiry progress"
					>
						<span
							class="block h-full rounded-sm bg-primary transition-[width] duration-500"
							style:width="{(step / 4) * 100}%"
						></span>
					</div>
					<div class="mt-2.5 flex justify-between gap-2 text-xs text-legal">
						{#each steps as label, index (label)}
							<span
								class:text-heading={step === index + 1}
								class:font-semibold={step === index + 1}
								class:text-primary={step > index + 1}
							>
								{label}
							</span>
						{/each}
					</div>

					{#if step === 1}
						<div class="stepin">
							<h2
								class="mt-7 mb-1.5 text-3xl leading-tight font-medium tracking-tight text-heading"
							>
								What do you need a loan for?
							</h2>
							<p class="m-0 mb-5 text-[15px] text-ink-soft">
								Pick the closest match. You can change it on the call.
							</p>
							<div class="tiles" role="radiogroup" aria-label="Loan type">
								{#each enquiryLoans as label, index (label)}
									<button
										type="button"
										role="radio"
										class="tile"
										class:on={loan === index}
										aria-checked={loan === index}
										onclick={() => chooseLoan(index)}
									>
										<span>{label}</span>
										<span class="ck"><Icons name="check" class="size-3 text-white" /></span>
									</button>
								{/each}
							</div>
							{#if errors.loan}<span class="mt-1.5 block text-[13px] text-danger"
									>{errors.loan}</span
								>{/if}
						</div>
					{:else if step === 2}
						<div class="stepin">
							<h2
								class="mt-7 mb-1.5 text-3xl leading-tight font-medium tracking-tight text-heading"
							>
								How much do you need?
							</h2>
							<p class="m-0 mb-5 text-[15px] text-ink-soft">A rough range is fine.</p>
							<div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Amount range">
								{#each amountRanges as label, index (label)}
									<button
										type="button"
										role="radio"
										class="choice"
										class:on={amount === index}
										aria-checked={amount === index}
										onclick={() => {
											amount = index;
											clear('amount');
										}}
									>
										{label}
									</button>
								{/each}
							</div>
							<label class="mt-4 mb-2 block text-sm font-medium" for="q-exact"
								>Exact amount <span class="font-normal text-ink-soft">(optional)</span></label
							>
							<div class="flex">
								<span
									class="flex items-center rounded-l-xl border border-r-0 border-rail bg-field-muted px-3.5 text-muted"
									>₹</span
								>
								<input
									id="q-exact"
									class="field rounded-l-none"
									type="text"
									inputmode="numeric"
									placeholder="e.g. 5,00,000"
									bind:value={exact}
								/>
							</div>
							<span class="mt-4 mb-2 block text-sm font-medium">When do you need it?</span>
							<div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Timeline">
								{#each timelines as label, index (label)}
									<button
										type="button"
										role="radio"
										class="choice"
										class:on={when === index}
										aria-checked={when === index}
										onclick={() => (when = index)}
									>
										{label}
									</button>
								{/each}
							</div>
							{#if errors.amount}<span class="mt-1.5 block text-[13px] text-danger"
									>{errors.amount}</span
								>{/if}
						</div>
					{:else if step === 3}
						<div class="stepin">
							<h2
								class="mt-7 mb-1.5 text-3xl leading-tight font-medium tracking-tight text-heading"
							>
								Tell us a little about you
							</h2>
							<p class="m-0 mb-5 text-[15px] text-ink-soft">
								This helps us match you with suitable lenders.
							</p>
							<span class="mb-2 block text-sm font-medium">Employment type</span>
							<div class="tiles sm:grid-cols-3" role="radiogroup" aria-label="Employment type">
								{#each employmentTypes as label, index (label)}
									<button
										type="button"
										role="radio"
										class="tile"
										class:on={employment === index}
										aria-checked={employment === index}
										onclick={() => {
											employment = index;
											clear('employment');
										}}
									>
										<span>{label}</span>
										<span class="ck"><Icons name="check" class="size-3 text-white" /></span>
									</button>
								{/each}
							</div>
							<label class="mt-4 mb-2 block text-sm font-medium" for="q-city">City</label>
							<input
								id="q-city"
								class="field"
								type="text"
								autocomplete="address-level2"
								placeholder="e.g. Chennai"
								bind:value={city}
								aria-invalid={errors.city ? 'true' : undefined}
								oninput={() => clear('city')}
							/>
							<span class="mt-4 mb-2 block text-sm font-medium"
								>Monthly income <span class="font-normal text-ink-soft">(optional)</span></span
							>
							<div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Monthly income">
								{#each incomeBands as label, index (label)}
									<button
										type="button"
										role="radio"
										class="choice"
										class:on={income === index}
										aria-checked={income === index}
										onclick={() => (income = index)}
									>
										{label}
									</button>
								{/each}
							</div>
							{#if errors.employment || errors.city}
								<span class="mt-1.5 block text-[13px] text-danger"
									>{errors.employment || errors.city}</span
								>
							{/if}
						</div>
					{:else}
						<div class="stepin">
							<h2
								class="mt-7 mb-1.5 text-3xl leading-tight font-medium tracking-tight text-heading"
							>
								How can we reach you?
							</h2>
							<p class="m-0 mb-5 text-[15px] text-ink-soft">
								We'll call from [phone number]. No spam, ever.
							</p>
							<label class="mb-2 block text-sm font-medium" for="q-name">Full name</label>
							<input
								id="q-name"
								class="field"
								type="text"
								autocomplete="name"
								placeholder="As per PAN"
								bind:value={name}
								aria-invalid={errors.name ? 'true' : undefined}
								oninput={() => clear('name')}
							/>
							{#if errors.name}<span class="mt-1.5 block text-[13px] text-danger"
									>{errors.name}</span
								>{/if}
							<label class="mt-4 mb-2 block text-sm font-medium" for="q-mob">Mobile number</label>
							<div class="flex">
								<span
									class="flex items-center rounded-l-xl border border-r-0 border-rail bg-field-muted px-3.5 text-muted"
									>+91</span
								>
								<input
									id="q-mob"
									class="field rounded-l-none"
									type="tel"
									inputmode="numeric"
									maxlength="10"
									autocomplete="tel-national"
									placeholder="10-digit mobile"
									bind:value={mobile}
									aria-invalid={errors.mobile ? 'true' : undefined}
									oninput={() => clear('mobile')}
								/>
							</div>
							{#if errors.mobile}<span class="mt-1.5 block text-[13px] text-danger"
									>{errors.mobile}</span
								>{/if}
							<label class="mt-4 mb-2 block text-sm font-medium" for="q-email"
								>Email <span class="font-normal text-ink-soft">(optional)</span></label
							>
							<input
								id="q-email"
								class="field"
								type="email"
								autocomplete="email"
								placeholder="you@example.com"
								bind:value={email}
							/>
							<label class="sr-only" for="q-company">Company website</label>
							<input
								id="q-company"
								class="sr-only"
								tabindex="-1"
								autocomplete="off"
								bind:value={honeypot}
							/>
							<label class="mt-4 flex items-start gap-2.5 text-sm leading-normal text-muted">
								<input
									type="checkbox"
									class="mt-0.5 size-5 shrink-0 accent-primary"
									bind:checked={consent}
									onchange={() => clear('consent')}
								/>
								<span
									>I agree to the <a href={resolve('/#privacy')}>Privacy Notice</a> and allow CredSpire
									and its lending partners to contact me by call, SMS or WhatsApp about this enquiry.</span
								>
							</label>
							{#if errors.consent}<span class="mt-1.5 block text-[13px] text-danger"
									>{errors.consent}</span
								>{/if}
						</div>
					{/if}

					<div class="mt-auto flex items-center justify-between gap-3 pt-7">
						{#if step > 1}
							<button
								type="button"
								class="border-0 bg-transparent px-1 py-2.5 text-[15px] font-medium text-muted hover:text-heading"
								onclick={back}>← Back</button
							>
						{:else}
							<span class="text-[13px] text-legal">Takes about a minute</span>
						{/if}
						<button
							type="button"
							class="btn-3d inline-flex min-h-13 items-center gap-2.5 rounded-btn-lg border-0 bg-primary px-6 text-[17px] font-medium text-white"
							disabled={loading}
							onclick={nextStep}
						>
							{#if loading}<span class="spin" aria-hidden="true"></span>{/if}
							{loading ? 'Submitting…' : step === 4 ? 'Submit enquiry →' : 'Continue →'}
						</button>
					</div>
				{:else}
					<div class="stepin items-start gap-4" role="status">
						<span
							class="flex size-16 items-center justify-center rounded-full bg-success-soft text-success"
						>
							<Icons name="check" class="size-8" />
						</span>
						<h2 class="m-0 text-[2.125rem] leading-tight font-medium tracking-tight">
							Thanks{firstName ? `, ${firstName}` : ''}, we have your enquiry
						</h2>
						<p class="m-0 text-base text-muted">
							Reference <strong class="text-heading">[CS-000123]</strong>. An authorised
							representative will call you within [response time] on working days.
						</p>
						<div class="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
							<div class="rounded-2xl bg-background px-3.5 py-3">
								<span class="block text-xs text-ink-soft">Loan</span><strong
									class="text-[15px] font-semibold">{loan >= 0 ? enquiryLoans[loan] : '—'}</strong
								>
							</div>
							<div class="rounded-2xl bg-background px-3.5 py-3">
								<span class="block text-xs text-ink-soft">Amount</span><strong
									class="text-[15px] font-semibold">{summaryAmount}</strong
								>
							</div>
							<div class="rounded-2xl bg-background px-3.5 py-3">
								<span class="block text-xs text-ink-soft">Employment</span><strong
									class="text-[15px] font-semibold"
									>{employment >= 0 ? employmentTypes[employment] : '—'}</strong
								>
							</div>
							<div class="rounded-2xl bg-background px-3.5 py-3">
								<span class="block text-xs text-ink-soft">City</span><strong
									class="text-[15px] font-semibold">{city.trim() || '—'}</strong
								>
							</div>
						</div>
						<div class="mt-2 flex flex-wrap gap-3 pb-1">
							<a
								href={resolve('/emi')}
								class="btn-3d inline-flex min-h-12 items-center rounded-btn-lg bg-primary px-5 text-base font-medium text-white no-underline"
								>Estimate your EMI</a
							>
							<button
								type="button"
								class="btn-3d edge-dark min-h-12 rounded-btn-lg border-0 bg-heading px-5 text-base font-medium text-white"
								onclick={reset}>Start a new enquiry</button
							>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail flex flex-col gap-7 px-6 py-16">
		<h2 class="m-0 text-h2">
			What happens <span class="serif text-h2-serif text-primary">next</span>
		</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="flex min-h-50 flex-col gap-2.5 rounded-frame bg-primary p-7 text-white">
				<span class="flex size-10 items-center justify-center rounded-xl bg-white/20 font-semibold"
					>1</span
				>
				<h3 class="m-0 mt-1.5 text-[1.3rem] font-medium tracking-tight">We call you</h3>
				<p class="m-0 text-[15px] leading-normal text-white/90">
					Within [response time], an authorised representative calls to understand your need.
				</p>
			</div>
			<div class="flex min-h-50 flex-col gap-2.5 rounded-frame bg-dark p-7 text-on-dark">
				<span class="flex size-10 items-center justify-center rounded-xl bg-card-mid font-semibold"
					>2</span
				>
				<h3 class="m-0 mt-1.5 text-[1.3rem] font-medium tracking-tight">We explain your options</h3>
				<p class="m-0 text-[15px] leading-normal text-dot">
					Suitable lenders, indicative terms and the documents they usually ask for.
				</p>
			</div>
			<div
				class="flex min-h-50 flex-col gap-2.5 rounded-frame border border-line bg-surface p-7 text-heading"
			>
				<span
					class="flex size-10 items-center justify-center rounded-xl bg-primary-soft font-semibold text-primary-edge"
					>3</span
				>
				<h3 class="m-0 mt-1.5 text-[1.3rem] font-medium tracking-tight">
					You apply, if you choose
				</h3>
				<p class="m-0 text-[15px] leading-normal text-muted">
					You apply directly with the lender. They assess your application and make the decision.
				</p>
			</div>
		</div>
		<p class="m-0 text-[13px] text-ink-soft">
			An enquiry is not a loan application or approval. CredSpire does not lend money; approval,
			rate and terms are decided by the lending bank or NBFC.
		</p>
	</div>
</section>
