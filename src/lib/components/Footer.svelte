<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { logoLight } from '#lib/content';

	const path = $derived(page.url.pathname);
	const full = $derived(path === '/' || path.startsWith('/partner'));
</script>

<footer class="ft" id="privacy">
	{#if full}
		<div class="ft-top">
			<div class="flex flex-col gap-4">
				<img src={logoLight} alt="Credspire" class="h-8 w-auto self-start" />
				<p class="m-0 max-w-xs text-[15px] leading-normal text-muted-dark">
					A loan discovery and referral platform connecting borrowers with banks and NBFCs across
					India.
				</p>
				<p class="m-0 text-[13px] leading-relaxed text-legal">
					[Registered office address]<br />[Email] · [Phone]
				</p>
			</div>
			<nav aria-label="Loans" class="flex flex-col gap-3 text-sm">
				<span class="mb-1 font-semibold text-white">Loans</span>
				<a class="foot" href={resolve('/#loans')}>Personal loan</a>
				<a class="foot" href={resolve('/#loans')}>Home loan</a>
				<a class="foot" href={resolve('/#loans')}>Business loan</a>
				<a class="foot" href={resolve('/#loans')}>Loan against property</a>
				<a class="foot" href={resolve('/#loans')}>Gold loan</a>
			</nav>
			<nav aria-label="Tools" class="flex flex-col gap-3 text-sm">
				<span class="mb-1 font-semibold text-white">Tools</span>
				<a class="foot" href={resolve('/emi')}>EMI calculator</a>
				<a class="foot" href={resolve('/enquire')}>Loan enquiry</a>
				<a class="foot" href={resolve('/#guides')}>Guides</a>
				<a class="foot" href={resolve('/#faq')}>FAQs</a>
			</nav>
			{#if path.startsWith('/partner')}
				<nav aria-label="Partners" class="flex flex-col gap-3 text-sm">
					<span class="mb-1 font-semibold text-white">Partners</span>
					<a class="foot" href={resolve('/partner#calc')}>Earnings estimate</a>
					<a class="foot" href={resolve('/partner#tiers')}>Partner tiers</a>
					<a class="foot" href={resolve('/partner#apply')}>Apply now</a>
					<a class="foot" href={resolve('/#privacy')}>Partner terms</a>
				</nav>
			{:else}
				<nav aria-label="Company" class="flex flex-col gap-3 text-sm">
					<span class="mb-1 font-semibold text-white">Company</span>
					<a class="foot" href={resolve('/#top')}>About us</a>
					<a class="foot" href={resolve('/partner')}>Partner programme</a>
					<a class="foot" href={resolve('/enquire')}>Contact</a>
					<a class="foot" href={resolve('/#top')}>Careers</a>
				</nav>
			{/if}
			<nav aria-label="Legal" class="flex flex-col gap-3 text-sm">
				<span class="mb-1 font-semibold text-white">Legal</span>
				<a class="foot" href={resolve('/#privacy')}>Privacy notice</a>
				<a class="foot" href={resolve('/#privacy')}>Terms of use</a>
				<a class="foot" href={resolve('/#privacy')}>Lending partners</a>
				<a class="foot" href={resolve('/#privacy')}>Grievance redressal</a>
				{#if !path.startsWith('/partner')}
					<a class="foot" href={resolve('/#privacy')}>Disclaimers</a>
				{/if}
			</nav>
		</div>
		<p
			class="mx-auto max-w-7xl border-t border-footer-line px-6 py-6 text-xs leading-relaxed text-muted-dark"
		>
			{#if path.startsWith('/partner')}
				All earnings figures, tiers and bonuses on this page are mock data for design purposes.
				Commission rates (up to 2.5%), bonuses, payout timing and eligibility depend on the product,
				lender and your signed partner agreement, and are paid only on qualifying disbursals. Not a
				guarantee of earnings. CredSpire does not lend money or approve loans.
			{:else}
				CredSpire is a loan discovery and referral platform and does not lend money or approve
				loans. Loan approval, interest rate, amount and terms are decided solely by the lending bank
				or NBFC. EMI and eligibility results are indicative estimates only.
			{/if}
			<span class="mt-2 block text-legal">© 2026 [Legal entity name] · [CIN]</span>
		</p>
	{:else}
		<div
			class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 pt-10 pb-5"
		>
			<img src={logoLight} alt="Credspire" class="h-7 w-auto" />
			<nav aria-label="Footer" class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
				<a class="foot" href={resolve('/')}>Home</a>
				<a class="foot" href={resolve('/emi')}>EMI calculator</a>
				<a class="foot" href={resolve('/partner')}>Partners</a>
				<a class="foot" href={resolve('/#privacy')}>Privacy</a>
				<a class="foot" href={resolve('/#privacy')}>Terms</a>
			</nav>
		</div>
		<p
			class="mx-auto max-w-7xl border-t border-footer-line px-6 py-5 text-xs leading-relaxed text-muted-dark"
		>
			CredSpire is a loan discovery and referral platform and does not lend money or approve loans.
			Loan approval, interest rate, amount and terms are decided solely by the lending bank or NBFC.
			{path.startsWith('/emi') ? 'EMI results are indicative estimates only. ' : ''}© 2026 [Legal
			entity name].
		</p>
	{/if}
	<div class="ft-word" aria-hidden="true">Credspire</div>
</footer>

<style>
	.foot {
		color: var(--color-muted-dark);
		text-decoration: none;
		transition: color 0.2s;
	}

	.foot:hover {
		color: var(--color-primary-on-dark);
	}
</style>
