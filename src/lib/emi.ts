import { formatInr } from './format';

export type LoanPreset = {
	label: string;
	rate: number;
	amount: number;
	years: number;
};

export const loanPresets: LoanPreset[] = [
	{ label: 'Home', rate: 8.5, amount: 2_500_000, years: 20 },
	{ label: 'Personal', rate: 12, amount: 300_000, years: 3 },
	{ label: 'Business', rate: 14, amount: 1_000_000, years: 5 },
	{ label: 'Property (LAP)', rate: 9.5, amount: 3_000_000, years: 12 },
	{ label: 'Gold', rate: 9, amount: 200_000, years: 1 },
	{ label: 'Vehicle', rate: 9.5, amount: 800_000, years: 5 },
	{ label: 'Education', rate: 10, amount: 1_200_000, years: 7 }
];

export function monthlyEmi(principal: number, annualRate: number, years: number): number {
	const months = years * 12;
	const monthlyRate = annualRate / 1200;
	if (monthlyRate === 0) return principal / months;
	const factor = (1 + monthlyRate) ** months;
	return (principal * monthlyRate * factor) / (factor - 1);
}

export type YearRow = {
	year: number;
	principalLabel: string;
	interestLabel: string;
	balanceLabel: string;
	principalShare: string;
	interestShare: string;
	tip: string;
};

export function repaymentSchedule(principal: number, annualRate: number, years: number): YearRow[] {
	const emi = monthlyEmi(principal, annualRate, years);
	const monthlyRate = annualRate / 1200;
	let balance = principal;
	const rows: Array<{ year: number; principal: number; interest: number; balance: number }> = [];
	let peak = 0;

	for (let year = 1; year <= years; year += 1) {
		let principalPaid = 0;
		let interestPaid = 0;
		for (let month = 0; month < 12; month += 1) {
			const interest = balance * monthlyRate;
			let principalPart = emi - interest;
			if (principalPart > balance) principalPart = balance;
			interestPaid += interest;
			principalPaid += principalPart;
			balance -= principalPart;
		}
		if (principalPaid + interestPaid > peak) peak = principalPaid + interestPaid;
		rows.push({ year, principal: principalPaid, interest: interestPaid, balance });
	}

	return rows.map((row) => ({
		year: row.year,
		principalLabel: formatInr(row.principal),
		interestLabel: formatInr(row.interest),
		balanceLabel: formatInr(row.balance),
		principalShare: `${((row.principal / peak) * 100).toFixed(1)}%`,
		interestShare: `${((row.interest / peak) * 100).toFixed(1)}%`,
		tip: `Year ${row.year} · Principal ₹${formatInr(row.principal)} · Interest ₹${formatInr(row.interest)}`
	}));
}

export type TenureComparison = {
	years: number;
	months: number;
	emiLabel: string;
	interestLabel: string;
	totalLabel: string;
	interestWidth: string;
};

export function compareTenures(
	principal: number,
	annualRate: number,
	selectedYears: number
): TenureComparison[] {
	const options = [3, 5, 10, 15, 20, 25, 30];
	if (!options.includes(selectedYears)) options.push(selectedYears);
	options.sort((left, right) => left - right);
	const chosen = options.slice(0, 7);
	const computed = chosen.map((years) => {
		const emi = monthlyEmi(principal, annualRate, years);
		const interest = emi * years * 12 - principal;
		return { years, emi, interest, total: emi * years * 12 };
	});
	const peakInterest = Math.max(...computed.map((row) => row.interest), 0);

	return computed.map((row) => ({
		years: row.years,
		months: row.years * 12,
		emiLabel: formatInr(row.emi),
		interestLabel: formatInr(row.interest),
		totalLabel: formatInr(row.total),
		interestWidth: `${(peakInterest ? (row.interest / peakInterest) * 100 : 0).toFixed(1)}%`
	}));
}

const DONUT = 2 * Math.PI * 70;

export function principalDash(principal: number, total: number): string {
	const length = total > 0 ? (principal / total) * DONUT : 0;
	return `${length.toFixed(1)} ${DONUT.toFixed(1)}`;
}
