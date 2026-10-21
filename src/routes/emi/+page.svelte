<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		compareTenures,
		loanPresets,
		monthlyEmi,
		principalDash,
		repaymentSchedule
	} from '#lib/emi';
	import { emiFaqs } from '#lib/content';
	import { clampNumber, formatInr } from '#lib/format';

	let preset = $state(0);
	let amount = $state(loanPresets[0].amount);
	let rate = $state(loanPresets[0].rate);
	let years = $state(loanPresets[0].years);

	const months = $derived(years * 12);
	const emi = $derived(monthlyEmi(amount, rate, years));
	const total = $derived(emi * months);
	const interest = $derived(total - amount);
	const schedule = $derived(repaymentSchedule(amount, rate, years));
	const tenures = $derived(compareTenures(amount, rate, years));
	const principalShare = $derived(total > 0 ? `${Math.round((amount / total) * 100)}%` : '0%');
	const dash = $derived(principalDash(amount, total));

	function choosePreset(index: number) {
		const next = loanPresets[index];
		preset = index;
		rate = next.rate;
		amount = next.amount;
		years = next.years;
	}

	function commitAmount(raw: string) {
		const next = clampNumber(raw, 50_000, 20_000_000);
		if (next) amount = Math.round(next);
	}

	function commitRate(raw: string) {
		const next = clampNumber(raw, 1, 30);
		if (next) rate = Math.round(next * 100) / 100;
	}

	function commitYears(raw: string) {
		const next = clampNumber(raw, 1, 30);
		if (next) years = Math.round(next);
	}

	function blurOnEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') (event.currentTarget as HTMLInputElement).blur();
	}
</script>

<svelte:head>
	<title>EMI calculator — CredSpire</title>
	<meta
		name="description"
		content="Estimate a monthly EMI, total interest and a year-by-year repayment schedule. Figures are indicative."
	/>
</svelte:head>

<section class="border-b border-rail">
	<div class="rail flex flex-col items-center gap-3.5 px-6 pt-10 pb-8 text-center">
		<nav aria-label="Breadcrumb" class="self-start text-sm text-muted">
			<a href={resolve('/')} class="text-muted no-underline hover:text-primary">Home</a>
			<span aria-hidden="true"> / </span> EMI calculator
		</nav>
		<h1 class="m-0 mt-2 text-h1 text-heading">
			Know your EMI <span class="serif text-h1-serif text-primary">before you borrow</span>
		</h1>
		<p class="m-0 max-w-155 text-lead text-edge-dark">
			Pick a loan type, adjust the amount, rate and tenure, and see your monthly instalment, total
			interest and repayment over time.
		</p>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail px-6 pt-10 pb-16">
		<div class="calc">
			<div class="panel">
				<div class="flex flex-col gap-3">
					<span class="text-[15px] font-medium">
						Loan type <span class="font-normal text-ink-soft"
							>· sets an indicative rate you can change</span
						>
					</span>
					<div class="flex flex-wrap gap-2">
						{#each loanPresets as item, index (item.label)}
							<button
								type="button"
								class="chip"
								class:on={preset === index}
								onclick={() => choosePreset(index)}
							>
								{item.label}
							</button>
						{/each}
					</div>
				</div>

				<div>
					<div class="mb-1 flex items-center justify-between gap-3">
						<label for="amt" class="text-[15px] font-medium">Loan amount</label>
						<div class="num">
							<span class="text-base text-ink-soft">₹</span>
							<input
								id="amt-n"
								type="text"
								inputmode="numeric"
								aria-label="Loan amount in rupees"
								value={formatInr(amount)}
								onblur={(event) => commitAmount(event.currentTarget.value)}
								onkeydown={blurOnEnter}
							/>
						</div>
					</div>
					<input
						id="amt"
						type="range"
						min="50000"
						max="20000000"
						step="50000"
						bind:value={amount}
					/>
					<div class="flex justify-between font-mono text-[11px] text-legal">
						<span>₹50K</span><span>₹50L</span><span>₹1Cr</span><span>₹1.5Cr</span><span>₹2Cr</span>
					</div>
				</div>

				<div>
					<div class="mb-1 flex items-center justify-between gap-3">
						<label for="rate" class="text-[15px] font-medium">Interest rate (p.a.)</label>
						<div class="num">
							<input
								id="rate-n"
								class="w-17"
								type="text"
								inputmode="decimal"
								aria-label="Interest rate percent"
								value={rate}
								onblur={(event) => commitRate(event.currentTarget.value)}
								onkeydown={blurOnEnter}
							/>
							<span class="text-base text-ink-soft">%</span>
						</div>
					</div>
					<input id="rate" type="range" min="6" max="24" step="0.25" bind:value={rate} />
					<div class="flex justify-between font-mono text-[11px] text-legal">
						<span>6%</span><span>10.5%</span><span>15%</span><span>19.5%</span><span>24%</span>
					</div>
				</div>

				<div>
					<div class="mb-1 flex items-center justify-between gap-3">
						<label for="ten" class="text-[15px] font-medium">Tenure</label>
						<div class="num">
							<input
								id="ten-n"
								class="w-12"
								type="text"
								inputmode="numeric"
								aria-label="Tenure in years"
								value={years}
								onblur={(event) => commitYears(event.currentTarget.value)}
								onkeydown={blurOnEnter}
							/>
							<span class="text-base text-ink-soft">years</span>
						</div>
					</div>
					<input id="ten" type="range" min="1" max="30" step="1" bind:value={years} />
					<div class="flex justify-between font-mono text-[11px] text-legal">
						<span>1 yr</span><span>8</span><span>15</span><span>23</span><span>30 yrs</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-5 rounded-panel bg-dark p-8 text-on-dark">
				<span class="text-[15px] text-faint">Your monthly EMI</span>
				<div class="big-emi text-emi text-white">
					₹{formatInr(emi)}<small class="ml-1.5 text-xl font-normal tracking-tight text-muted-dark"
						>/month</small
					>
				</div>
				<div class="flex flex-wrap items-center gap-7">
					<svg
						width="170"
						height="170"
						viewBox="0 0 170 170"
						role="img"
						aria-label="Principal {principalShare} of total payable"
					>
						<circle
							cx="85"
							cy="85"
							r="70"
							fill="none"
							stroke="var(--color-chart-2)"
							stroke-width="22"
						/>
						<circle
							cx="85"
							cy="85"
							r="70"
							fill="none"
							stroke="var(--color-primary)"
							stroke-width="22"
							stroke-dasharray={dash}
							transform="rotate(-90 85 85)"
						/>
						<text
							x="85"
							y="82"
							text-anchor="middle"
							fill="var(--color-white)"
							font-size="24"
							font-weight="600">{principalShare}</text
						>
						<text x="85" y="104" text-anchor="middle" fill="var(--color-muted-dark)" font-size="12"
							>principal</text
						>
					</svg>
					<div class="flex min-w-50 flex-1 flex-col gap-3 text-[15px]">
						<div class="flex justify-between gap-3">
							<span
								><span class="mr-2 inline-block size-3 rounded-sm bg-primary align-[-1px]"
								></span>Principal</span
							>
							<strong class="font-semibold">₹{formatInr(amount)}</strong>
						</div>
						<div class="flex justify-between gap-3">
							<span
								><span class="mr-2 inline-block size-3 rounded-sm bg-chart-2 align-[-1px]"
								></span>Total interest</span
							>
							<strong class="font-semibold">₹{formatInr(interest)}</strong>
						</div>
						<div class="flex justify-between gap-3 border-t border-card-mid pt-3">
							<span class="text-faint">Total payable</span>
							<strong class="font-semibold">₹{formatInr(total)}</strong>
						</div>
						<div class="flex justify-between gap-3">
							<span class="text-faint">Instalments</span>
							<strong class="font-semibold">{months}</strong>
						</div>
					</div>
				</div>
				<div class="mt-auto flex flex-col gap-3">
					<a
						href={resolve('/enquire')}
						class="btn-3d flex min-h-14 items-center justify-center gap-2.5 rounded-btn-lg bg-primary text-lg font-medium text-white no-underline"
						>Enquire for this amount →</a
					>
					<p class="m-0 text-xs leading-normal text-muted-dark">
						Indicative estimate. The lender decides the actual rate, EMI and terms. Processing fees
						and other charges are not included.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail flex flex-col gap-7 px-6 py-16">
		<div class="flex max-w-170 flex-col gap-2.5">
			<h2 class="m-0 text-h2">
				Compare <span class="serif text-h2-serif text-primary">tenures</span>
			</h2>
			<p class="m-0 text-lg text-muted">
				A longer tenure lowers your EMI but adds to the interest you pay. Tap a row to use it.
			</p>
		</div>
		<div class="flex flex-col gap-2.5">
			{#each tenures as row (row.years)}
				<button
					type="button"
					class="tenure-row"
					class:on={row.years === years}
					onclick={() => (years = row.years)}
				>
					<span class="tenure-meta flex flex-col">
						<strong class="text-lg font-semibold">{row.years} years</strong>
						<span class="text-[13px] text-ink-soft">{row.months} EMIs</span>
					</span>
					<span class="tenure-bar flex flex-col gap-2">
						<span class="text-[13px] text-muted">Interest ₹{row.interestLabel}</span>
						<span class="h-2 overflow-hidden rounded bg-chip">
							<span class="block h-full rounded bg-chart-2" style:width={row.interestWidth}></span>
						</span>
					</span>
					<span class="tenure-emi flex flex-col items-end">
						<strong class="text-[1.375rem] font-semibold tracking-tight">
							₹{row.emiLabel}<span class="text-[13px] font-normal text-ink-soft">/mo</span>
						</strong>
						<span class="text-[13px] text-muted">Total ₹{row.totalLabel}</span>
					</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail flex flex-col gap-6 px-6 py-16">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div class="flex max-w-160 flex-col gap-2.5">
				<h2 class="m-0 text-h2">
					Your loan <span class="serif text-h2-serif text-primary">over time</span>
				</h2>
				<p class="m-0 text-lg text-muted">
					Each bar is one year of EMIs. Early years go mostly to interest; later years mostly repay
					principal.
				</p>
			</div>
			<div class="flex gap-4 text-sm">
				<span
					><span class="mr-2 inline-block size-3 rounded-sm bg-primary"></span>Principal repaid</span
				>
				<span
					><span class="mr-2 inline-block size-3 rounded-sm bg-chart-2"></span>Interest paid</span
				>
			</div>
		</div>
		<div class="rounded-panel border border-line bg-surface px-7 pt-7 pb-4">
			<div class="chart">
				{#each schedule as row (row.year)}
					<button type="button" class="bar" aria-label={row.tip}>
						<span class="tip">{row.tip}</span>
						<i class="bg-chart-2" style:height={row.interestShare}></i>
						<i class="bg-primary" style:height={row.principalShare}></i>
					</button>
				{/each}
			</div>
			<div class="flex justify-between pt-2 font-mono text-[11px] text-legal">
				<span>Year 1</span><span>Year {years}</span>
			</div>
		</div>
		<details class="rounded-[1.375rem] border border-line bg-surface">
			<summary class="flex items-center justify-between px-6 py-5 text-base font-medium">
				View year-by-year table <span class="text-primary" aria-hidden="true">+</span>
			</summary>
			<div class="overflow-x-auto px-2 pb-3">
				<table class="w-full min-w-140 border-collapse text-[15px]">
					<thead>
						<tr class="text-right">
							<th
								scope="col"
								class="border-b border-line px-4 py-3 text-left font-medium text-ink-soft">Year</th
							>
							<th scope="col" class="border-b border-line px-4 py-3 font-medium text-ink-soft"
								>Principal paid</th
							>
							<th scope="col" class="border-b border-line px-4 py-3 font-medium text-ink-soft"
								>Interest paid</th
							>
							<th scope="col" class="border-b border-line px-4 py-3 font-medium text-ink-soft"
								>Balance</th
							>
						</tr>
					</thead>
					<tbody>
						{#each schedule as row (row.year)}
							<tr class="text-right">
								<td class="border-b border-table-line px-4 py-3 text-left font-medium"
									>Year {row.year}</td
								>
								<td class="border-b border-table-line px-4 py-3 font-mono">₹{row.principalLabel}</td
								>
								<td class="border-b border-table-line px-4 py-3 font-mono">₹{row.interestLabel}</td>
								<td class="border-b border-table-line px-4 py-3 font-mono">₹{row.balanceLabel}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</details>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail flex flex-wrap items-center gap-6 px-6 py-16">
		<div class="flex min-w-0 flex-1 basis-105 flex-col gap-3.5">
			<h2 class="m-0 text-h2">
				How EMI is <span class="serif text-h2-serif text-primary">calculated</span>
			</h2>
			<p class="m-0 max-w-130 text-base text-muted">
				Banks and NBFCs use the reducing-balance method. Each month, part of your EMI pays interest
				on the outstanding amount and the rest reduces the principal.
			</p>
			<div class="rounded-[1.125rem] bg-dark p-5 font-mono text-lg text-white">
				EMI = P × r × (1+r)<sup>n</sup> ÷ [(1+r)<sup>n</sup> − 1]
			</div>
			<div class="grid grid-cols-3 gap-2.5">
				<div class="rounded-btn-lg border border-line bg-surface p-4">
					<span class="text-2xl font-semibold text-primary">P</span>
					<span class="block text-[13px] text-muted">Loan amount</span>
				</div>
				<div class="rounded-btn-lg border border-line bg-surface p-4">
					<span class="text-2xl font-semibold text-primary">r</span>
					<span class="block text-[13px] text-muted">Annual rate ÷ 12 ÷ 100</span>
				</div>
				<div class="rounded-btn-lg border border-line bg-surface p-4">
					<span class="text-2xl font-semibold text-primary">n</span>
					<span class="block text-[13px] text-muted">Tenure in months</span>
				</div>
			</div>
		</div>
		<div class="flex min-w-0 flex-1 basis-90 justify-center">
			<img
				src="/assets/d51114ad8650fbf7dc21eb55897d71e2.webp"
				alt=""
				class="h-auto w-full max-w-95 drop-shadow-[0_18px_22px_rgb(25_25_25_/_12%)]"
			/>
		</div>
	</div>
</section>

<section class="border-b border-rail">
	<div class="rail flex flex-col items-center gap-6 px-6 py-16">
		<h2 class="m-0 text-[2.5rem] font-medium tracking-tight">
			EMI <span class="serif text-[2.875rem] text-primary">questions</span>
		</h2>
		<div class="faq-list w-full max-w-190">
			{#each emiFaqs as item, index (item.question)}
				<details class="faq-item" open={index === 0}>
					<summary>{item.question}<span class="faq-ic" aria-hidden="true"></span></summary>
					<p>{item.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<section>
	<div class="rail px-6 pt-6 pb-18">
		<div
			class="flex flex-col items-center gap-4 rounded-cta bg-primary px-6 py-16 text-center text-white"
		>
			<h2 class="m-0 text-[3.25rem] leading-tight font-medium tracking-tight">
				Happy with the numbers? <span class="serif text-6xl text-heading">Let's talk.</span>
			</h2>
			<p class="m-0 text-lg text-white/90">
				Share your requirement and an authorised representative will call you back.
			</p>
			<a
				href={resolve('/enquire')}
				class="btn-3d edge-black inline-flex min-h-14 items-center gap-2.5 rounded-btn-lg bg-heading px-7 text-lg font-medium text-white no-underline"
				>Start your enquiry →</a
			>
		</div>
	</div>
</section>
