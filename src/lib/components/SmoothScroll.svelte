<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Lenis from 'lenis';
	import 'lenis/dist/lenis.css';

	let lenis: Lenis | undefined;
	let anchorOffset = 0;

	$effect(() => {
		const probe = document.querySelector('[id]');
		const margin = probe ? Number.parseFloat(getComputedStyle(probe).scrollMarginTop) : 0;
		anchorOffset = Number.isFinite(margin) ? -margin : 0;

		const instance = new Lenis({
			autoRaf: true,
			autoToggle: true,
			allowNestedScroll: true,
			naiveDimensions: true,
			stopInertiaOnNavigate: true,
			anchors: { offset: anchorOffset }
		});
		lenis = instance;

		return () => {
			instance.destroy();
			if (lenis === instance) lenis = undefined;
		};
	});

	afterNavigate((navigation) => {
		const instance = lenis;
		if (!instance) return;
		instance.resize();

		const from = navigation.from?.url;
		const to = navigation.to?.url;
		if (!from || !to || from.pathname === to.pathname || !to.hash) return;

		requestAnimationFrame(() => {
			instance.scrollTo(decodeURIComponent(to.hash), { offset: anchorOffset });
		});
	});
</script>
