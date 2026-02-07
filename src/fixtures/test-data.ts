import type { Product } from "../types/product";

export const products: Product[] = [
	{ id: "1", name: "Blue Top", price: "Rs. 500" },
	{ id: "2", name: "Men Tshirt", price: "Rs. 400" },
];

export const invalidLoginCases = [
	{
		title: "rejects unknown email",
		email: "unknown.user@example.com",
		password: "Password123!",
		error: "Your email or password is incorrect!",
	},
	{
		title: "rejects wrong password",
		email: "qa.valid@example.com",
		password: "WrongPassword1!",
		error: "Your email or password is incorrect!",
	},
	{
		title: "rejects empty password",
		email: "qa.valid@example.com",
		password: "",
		error: "Your email or password is incorrect!",
	},
];
