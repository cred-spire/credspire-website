<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import DemoLinks from './demo/DemoLinks.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import SmoothScroll from '#lib/components/SmoothScroll.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	const demo = $derived(page.url.pathname.startsWith('/demo'));
</script>

<svelte:head>
	<link rel="icon" href="/assets/046c6ac39ad268c7be3bdaff997cce9b.svg" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
	/>
</svelte:head>

{#if demo}
	{@render children()}
	<DemoLinks />
{:else}
	<a
		href="#content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-btn focus:bg-surface focus:px-3 focus:py-2"
		>Skip to content</a
	>
	<SmoothScroll />
	<Header />
	<main id="content">
		{@render children()}
	</main>
	<Footer />
{/if}
