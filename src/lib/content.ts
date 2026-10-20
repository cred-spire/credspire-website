export const logo = '/assets/c745283713be1172a45023aca3adea8c.svg';
export const logoLight = '/assets/f8cded5265a0dbc757dda3336f02623d.svg';
export const mark = '/assets/046c6ac39ad268c7be3bdaff997cce9b.svg';
export const phoneArt = '/assets/f5ee202c0e50956c434048acc5c2e608.webp';
export const ledgerArt = '/assets/f76cf648fa09edc84bc7bafe93235b01.webp';

export const lenders = [
	{
		name: 'State Bank of India',
		src: '/assets/aa7441dc57b4bce8721b65db0ac16c68.svg',
		height: 'h-8'
	},
	{ name: 'HDFC Bank', src: '/assets/c45302a3cba936c62ebd8ccb5cf7cdc1.svg', height: 'h-6' },
	{ name: 'ICICI Bank', src: '/assets/4febb6290ba72b892e1fbe8c57d626e7.svg', height: 'h-7' },
	{
		name: 'Kotak Mahindra Bank',
		src: '/assets/1f4ea45e52d72d6f40ee7c9e78690004.svg',
		height: 'h-8'
	},
	{ name: 'Bank of Baroda', src: '/assets/e24c2fd36677ed8b75fbc066ab979683.svg', height: 'h-8' },
	{
		name: 'Punjab National Bank',
		src: '/assets/6fb2ec540319bf93f1b0049ac6848db6.svg',
		height: 'h-8'
	},
	{ name: 'Canara Bank', src: '/assets/23d37aca54e17faab8002a37dd3f1d96.svg', height: 'h-8' },
	{
		name: 'Union Bank of India',
		src: '/assets/7628717612c1563f67efd178b814eeb2.svg',
		height: 'h-8'
	},
	{ name: 'IndusInd Bank', src: '/assets/f5b24614a60cd66c9846077e1fc6f78e.svg', height: 'h-6' },
	{ name: 'IDFC FIRST Bank', src: '/assets/955626dbb745cda7b0a0250fec7dd768.svg', height: 'h-9' },
	{ name: 'Federal Bank', src: '/assets/93649150a74e2c2e5bc9c5da72b57f7d.svg', height: 'h-8' },
	{ name: 'Bank of India', src: '/assets/d16915fe3f9abd6fced2d02b3ffc0a7f.svg', height: 'h-9' },
	{ name: 'Indian Bank', src: '/assets/2d5341fda1eb028a1769b9414a00efaa.svg', height: 'h-8' },
	{ name: 'RBL Bank', src: '/assets/e6a08d5cbfd3930adc4f1f8cb547c451.svg', height: 'h-8' },
	{
		name: 'Standard Chartered',
		src: '/assets/ca3046f01a1378e283b47a627746c0a5.svg',
		height: 'h-9'
	},
	{ name: 'HSBC', src: '/assets/117fc70df16be6de77f07d7fc9f01658.svg', height: 'h-7' }
] as const;

export const loanCards = [
	{
		id: 'personal',
		pill: 'Personal',
		eyebrow: 'Personal loan',
		title: "Plan life's big moments",
		description:
			'Weddings, travel, medical bills or consolidating debt, all in one loan and one EMI.',
		image: '/assets/69add3c27ae97a755ed8c284341e36d1.webp',
		visualTop: '28px',
		surface: 'bg-pick'
	},
	{
		id: 'home',
		pill: 'Home',
		eyebrow: 'Home loan',
		title: 'Turn the key on your own home',
		description: 'Buy, build or renovate, or transfer an existing home loan for better terms.',
		image: '/assets/5d9e10f127618fe9cfb15ed1095ae432.webp',
		visualTop: '24px',
		surface: 'bg-primary-soft'
	},
	{
		id: 'business',
		pill: 'Business',
		eyebrow: 'Business loan',
		title: 'Fuel your next stage of growth',
		description: 'Expand, hire or invest in equipment with funding sized to your plans.',
		image: '/assets/212ccf262ad8415f84ca77b479f55768.webp',
		visualTop: '20px',
		surface: 'bg-dark'
	},
	{
		id: 'property',
		pill: 'Property',
		eyebrow: 'Loan against property',
		title: "Unlock the value you've built",
		description: 'Use residential or commercial property you own to fund larger needs.',
		image: '/assets/9ae45f587a8eda2385bfd544db62d09c.webp',
		visualTop: '24px',
		surface: 'bg-pick'
	},
	{
		id: 'gold',
		pill: 'Gold',
		eyebrow: 'Gold loan',
		title: 'Quick funds against your gold',
		description: 'Get money fast while your jewellery is kept safely with the lender.',
		image: '/assets/ccc3e0ae8ea8e15f2eec57f5a28e359c.webp',
		visualTop: '28px',
		surface: 'bg-primary-soft'
	}
] as const;

export const comparisons = [
	{
		alone: 'Visit branch after branch',
		withUs: 'One enquiry, many lenders',
		detail: 'Share your need once. We connect you with suitable banks and NBFCs.'
	},
	{
		alone: 'Unclear rates and surprise charges',
		withUs: 'Know your numbers first',
		detail: 'See an indicative EMI and total interest before you talk to anyone.'
	},
	{
		alone: 'The same paperwork, again and again',
		withUs: 'One clear checklist',
		detail: 'Know which documents lenders usually ask for, up front.'
	},
	{
		alone: 'Waiting days for a callback',
		withUs: 'A call back within [response time]',
		detail: 'From an authorised representative, on working days.'
	},
	{
		alone: 'Confusing banking jargon',
		withUs: 'Plain-language guidance',
		detail: 'Options, terms and next steps explained simply.'
	},
	{
		alone: 'Your number shared everywhere',
		withUs: 'Your data, your consent',
		detail: 'Shared only with relevant lenders, for the purpose you agree to.'
	}
] as const;

export const testimonials = [
	{
		tag: 'Home loan · [City]',
		quote: '[Quote: how comparing lenders in one place helped them buy their first home.]',
		name: '[Customer name]',
		role: '[Profession]',
		card: 'bg-faq text-heading',
		tagClass: 'bg-surface text-heading',
		rule: 'border-heading/20',
		avatar: 'bg-surface text-ink-soft'
	},
	{
		tag: 'Business loan · [City]',
		quote: '[Quote: how quickly they got a call back and understood their options.]',
		name: '[Customer name]',
		role: '[Business owner]',
		card: 'bg-primary text-white',
		tagClass: 'bg-white/20 text-white',
		rule: 'border-white/35',
		avatar: 'bg-white/20 text-white'
	},
	{
		tag: 'Personal loan · [City]',
		quote: '[Quote: how the EMI estimate helped them plan a budget before applying.]',
		name: '[Customer name]',
		role: '[Salaried professional]',
		card: 'bg-dark text-on-dark',
		tagClass: 'bg-card-mid text-on-dark',
		rule: 'border-white/20',
		avatar: 'bg-card-mid text-faint'
	},
	{
		tag: 'Loan against property · [City]',
		quote: '[Quote: how plain-language guidance made a large loan feel less stressful.]',
		name: '[Customer name]',
		role: '[Profession]',
		card: 'bg-primary-soft text-heading',
		tagClass: 'bg-surface text-primary-edge',
		rule: 'border-primary-edge/25',
		avatar: 'bg-surface text-primary-edge'
	},
	{
		tag: 'Gold loan · [City]',
		quote: '[Quote: how they got quick funds and knew exactly what to bring.]',
		name: '[Customer name]',
		role: '[Profession]',
		card: 'bg-heading text-on-dark',
		tagClass: 'bg-primary text-white',
		rule: 'border-white/20',
		avatar: 'bg-dark text-faint'
	},
	{
		tag: 'Home loan transfer · [City]',
		quote: '[Quote: how they understood their options for moving an existing loan.]',
		name: '[Customer name]',
		role: '[Profession]',
		card: 'bg-faq text-heading',
		tagClass: 'bg-surface text-heading',
		rule: 'border-heading/20',
		avatar: 'bg-surface text-ink-soft'
	}
] as const;

export const guideTopics = [
	'All',
	'Home loans',
	'Personal loans',
	'Business',
	'EMI & planning'
] as const;

export type GuideTopic = (typeof guideTopics)[number];

export const guides = [
	{
		category: 'EMI & planning',
		title: 'How your EMI is calculated, and what changes it',
		minutes: 4,
		image: '/assets/d51114ad8650fbf7dc21eb55897d71e2.webp',
		card: 'bg-faq text-heading',
		pill: 'bg-surface text-heading',
		arrow: 'bg-heading text-white'
	},
	{
		category: 'Home loans',
		title: 'Home loan or loan against property: which fits?',
		minutes: 6,
		image: '/assets/3da1058ba3f90750f821338e19ce3a62.webp',
		card: 'bg-dark text-on-dark',
		pill: 'bg-card-mid text-on-dark',
		arrow: 'bg-primary text-white'
	},
	{
		category: 'Personal loans',
		title: 'Documents lenders usually ask for, by loan type',
		minutes: 5,
		image: '/assets/08e2794ac0d9dbd8b9ec565aaab6390f.webp',
		card: 'bg-primary-soft text-heading',
		pill: 'bg-surface text-primary-edge',
		arrow: 'bg-primary text-white'
	},
	{
		category: 'Business',
		title: 'Working capital or term loan: what does your business need?',
		minutes: 6,
		image: '/assets/dfe61278b735987d41516215c84c7b5b.webp',
		card: 'bg-heading text-on-dark',
		pill: 'bg-card-mid text-on-dark',
		arrow: 'bg-primary text-white'
	},
	{
		category: 'Home loans',
		title: 'First home? 7 costs to plan for beyond the down payment',
		minutes: 5,
		image: '/assets/27815842394191458154d25e3bc71386.webp',
		card: 'bg-faq text-heading',
		pill: 'bg-surface text-heading',
		arrow: 'bg-heading text-white'
	},
	{
		category: 'EMI & planning',
		title: 'Longer tenure, lower EMI? How total interest really changes',
		minutes: 4,
		image: '/assets/5565966517556ad47e37bdc24794cd43.webp',
		card: 'bg-primary-soft text-heading',
		pill: 'bg-surface text-primary-edge',
		arrow: 'bg-primary text-white'
	},
	{
		category: 'Personal loans',
		title: 'Gold loan or personal loan: when to choose which',
		minutes: 5,
		image: '/assets/938b73bfb4405d7eacfeac704ac0a551.webp',
		card: 'bg-dark text-on-dark',
		pill: 'bg-card-mid text-on-dark',
		arrow: 'bg-primary text-white'
	},
	{
		category: 'Business',
		title: 'Preparing your business for a conversation with a lender',
		minutes: 5,
		image: '/assets/0817f59e34e269bb0a4747906fc09c79.webp',
		card: 'bg-faq text-heading',
		pill: 'bg-surface text-heading',
		arrow: 'bg-heading text-white'
	}
] as const;

export const homeFaqs = [
	{
		question: 'Does CredSpire give loans?',
		answer:
			'No. CredSpire is a loan discovery and referral platform. We help you understand options and connect you with banks and NBFCs. The lender decides approval, interest rate, amount and terms.'
	},
	{
		question: 'Is there a fee to use CredSpire?',
		answer: '[Fee statement to be confirmed by the business before launch.]'
	},
	{
		question: 'Is the EMI shown my final EMI?',
		answer:
			'No. It is an estimate from the amount, rate and tenure you enter. Your actual EMI depends on the rate and terms the lender offers.'
	},
	{
		question: 'Will checking my options affect my credit score?',
		answer:
			'Using the EMI calculator or submitting an enquiry does not involve a credit check. A lender may check your credit report if you choose to apply with them, and they will ask for your consent first.'
	},
	{
		question: 'Who will see my details?',
		answer:
			'Our authorised team and the lending partners relevant to your enquiry, only for the purpose you agreed to. See our Privacy Notice for details.'
	},
	{
		question: 'How long until someone calls me?',
		answer: 'Usually within [response time] on working days.'
	},
	{
		question: 'What documents will I need?',
		answer:
			'It depends on the loan and lender. Typically identity and address proof, income proof and bank statements. Your representative will share the exact list.'
	},
	{
		question: 'How do I become a partner?',
		answer:
			'Visit the partner programme page and submit the application. Our team will check eligibility and take you through onboarding and the partner agreement.',
		href: '/partner',
		linkLabel: 'partner programme'
	}
] as const;

export const emiFaqs = [
	{
		question: 'How can I lower my EMI?',
		answer:
			'A longer tenure lowers the monthly EMI but increases total interest. A larger down payment or a lower rate reduces both.'
	},
	{
		question: 'Does the EMI include processing fees?',
		answer:
			'No. Fees, insurance and other charges vary by lender and are not included in this estimate.'
	},
	{
		question: 'Where do the indicative rates come from?',
		answer:
			'They are example starting points for each loan type, not offers. Change the rate to match a quote you have received.'
	},
	{
		question: 'Will my actual EMI match this?',
		answer:
			'Only if the lender offers the same amount, rate and tenure. The final figure is in your loan sanction letter.'
	}
] as const;

export const enquiryLoans = [
	'Personal loan',
	'Home loan',
	'Business loan',
	'Loan against property',
	'Gold loan',
	'Working capital',
	'Education loan',
	'Vehicle loan'
] as const;

export const amountRanges = [
	'Under ₹5 lakh',
	'₹5–25 lakh',
	'₹25 lakh–1 crore',
	'Above ₹1 crore',
	'Not sure yet'
] as const;

export const timelines = [
	'Within a week',
	'This month',
	'In 1–3 months',
	'Just exploring'
] as const;

export const employmentTypes = ['Salaried', 'Self-employed', 'Business owner'] as const;

export const incomeBands = ['Under ₹25K', '₹25K–75K', '₹75K–2L', 'Above ₹2L'] as const;

export const partnerRates = [
	{ label: 'Personal · 2.5%', rate: 2.5 },
	{ label: 'Business · 2.0%', rate: 2.0 },
	{ label: 'LAP · 1.0%', rate: 1.0 },
	{ label: 'Home · 0.5%', rate: 0.5 },
	{ label: 'Gold · 0.5%', rate: 0.5 }
] as const;

export const partnerFaqs = [
	{
		question: 'When is commission paid?',
		answer:
			'After the lender disburses the loan and the qualifying conditions in your agreement are met. Payouts are planned fortnightly [to confirm].'
	},
	{
		question: 'How much commission can I earn?',
		answer:
			'Rates vary by product and lender, up to [X]%. Your exact rates are set out in your partner agreement.'
	},
	{
		question: 'Do I need to collect documents from borrowers?',
		answer:
			"You share the client's requirement. Our team and the lender guide the borrower through documents and KYC directly."
	},
	{
		question: 'Can I track my referrals?',
		answer:
			'Your partner manager shares regular status updates. A self-serve partner dashboard is planned for a later phase.'
	}
] as const;
