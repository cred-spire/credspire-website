export function formatInr(value: number): string {
	return Math.round(Math.max(0, value)).toLocaleString('en-IN');
}

export function clampNumber(raw: string, min: number, max: number): number | null {
	const value = Number(raw.replace(/[^0-9.]/g, ''));
	if (!Number.isFinite(value) || value === 0) return null;
	return Math.min(max, Math.max(min, value));
}
