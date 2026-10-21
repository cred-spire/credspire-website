<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { logo } from '#lib/content';

	let open = $state(false);
	const path = $derived(page.url.pathname);
	const variant = $derived(
		path.startsWith('/enquire') ? 'enquire' : path.startsWith('/partner') ? 'partner' : 'home'
	);

	function close() {
		open = false;
	}
</script>

<header class="sticky top-0 z-20 border-b border-rail bg-background/90 backdrop-blur-md">
	<div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-3 md:gap-7">
		<a href={resolve('/')} aria-label="Credspire home" class="flex items-center" onclick={close}>
			<img src={logo} alt="Credspire" class="h-8 w-auto" />
		</a>

		<button
			type="button"
			class="ml-auto inline-flex h-10 items-center rounded-btn border border-chip bg-surface px-3 text-sm font-medium text-heading md:hidden"
			aria-expanded={open}
			aria-controls="site-nav"
			onclick={() => (open = !open)}
		>
			{open ? 'Close' : 'Menu'}
		</button>

		<nav
			id="site-nav"
			aria-label="Main"
			class="w-full flex-col gap-1 text-[15px] md:flex md:w-auto md:flex-1 md:flex-row md:flex-wrap md:gap-x-6 {open
				? 'flex'
				: 'hidden'}"
		>
			<a
				class="nav-link"
				class:text-heading={path === '/'}
				href={resolve('/#loans')}
				onclick={close}>Loans</a
			>
			<a
				class="nav-link"
				href={resolve('/emi')}
				aria-current={path.startsWith('/emi') ? 'page' : undefined}
				onclick={close}>EMI calculator</a
			>
			<a
				class="nav-link"
				href={resolve('/partner')}
				aria-current={path.startsWith('/partner') ? 'page' : undefined}
				onclick={close}>Partners</a
			>
			<a class="nav-link" href={resolve('/#guides')} onclick={close}>Resources</a>
			<a class="nav-link" href={resolve('/#faq')} onclick={close}>Company</a>
		</nav>

		<div class="flex items-center gap-2.5 pb-1 {open ? 'w-full' : 'max-md:hidden'} md:w-auto">
			{#if variant === 'enquire'}
				<a
					href={resolve('/emi')}
					class="btn-3d btn-3d-sm edge-dark inline-flex min-h-10 items-center rounded-btn bg-heading px-4 text-[15px] font-medium text-white no-underline"
					>Calculate EMI</a
				>
			{:else if variant === 'partner'}
				<a
					href={resolve('/partner#apply')}
					class="btn-3d btn-3d-sm inline-flex min-h-10 items-center rounded-btn bg-primary px-4 text-[15px] font-medium text-white no-underline"
					onclick={close}>Become a partner</a
				>
			{:else}
				<a
					href={resolve('/enquire')}
					class="btn-3d btn-3d-sm edge-dark inline-flex min-h-10 items-center rounded-btn bg-heading px-4 text-[15px] font-medium text-white no-underline"
					onclick={close}>Talk to us</a
				>
				<a
					href={resolve('/enquire')}
					class="btn-3d btn-3d-sm inline-flex min-h-10 items-center rounded-btn bg-primary px-4 text-[15px] font-medium text-white no-underline"
					onclick={close}>Enquire now</a
				>
			{/if}
		</div>
	</div>
</header>

<style>
	.nav-link {
		display: flex;
		align-items: center;
		padding-block: 0.625rem;
		color: var(--color-foreground);
		text-decoration: none;
	}

	.nav-link[aria-current='page'] {
		font-weight: 600;
	}
</style>
