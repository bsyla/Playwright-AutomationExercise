export const parsePrice = (priceText: string): number => {
	const digits = priceText.replace(/[^0-9]/g, "");
	return Number(digits);
};

export const formatPrice = (amount: number): string => `Rs. ${amount}`;
