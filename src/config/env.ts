import path from "node:path";
import dotenv from "dotenv";

export type TestEnv = "local" | "staging" | "prod";

export interface AppConfig {
	testEnv: TestEnv;
	baseUrl: string;
	apiBaseUrl: string;
	storageStatePath: string;
	timeouts: {
		action: number;
		navigation: number;
		expect: number;
		api: number;
	};
	auth: {
		username?: string;
		password?: string;
	};
}

const DEFAULT_BASE_URLS: Record<TestEnv, string> = {
	local: "http://localhost:3000",
	staging: "https://automationexercise.com",
	prod: "https://automationexercise.com",
};

let cachedConfig: AppConfig | null = null;

const resolveTestEnv = (value?: string): TestEnv => {
	if (value === "local" || value === "staging" || value === "prod") {
		return value;
	}
	return "staging";
};

export const getConfig = (): AppConfig => {
	if (cachedConfig) {
		return cachedConfig;
	}

	dotenv.config({ path: path.resolve(process.cwd(), ".env") });

	const testEnv = resolveTestEnv(process.env.TEST_ENV);
	const rawBaseUrl =
		process.env.BASE_URL ||
		process.env[`BASE_URL_${testEnv.toUpperCase()}`] ||
		DEFAULT_BASE_URLS[testEnv];
	const baseUrl = rawBaseUrl.replace(/\/$/, "");

	cachedConfig = {
		testEnv,
		baseUrl,
		apiBaseUrl: (process.env.API_BASE_URL || baseUrl).replace(/\/$/, ""),
		storageStatePath: process.env.AUTH_STORAGE_STATE || ".auth/user.json",
		timeouts: {
			action: Number(process.env.ACTION_TIMEOUT ?? 10_000),
			navigation: Number(process.env.NAVIGATION_TIMEOUT ?? 20_000),
			expect: Number(process.env.EXPECT_TIMEOUT ?? 5_000),
			api: Number(process.env.API_TIMEOUT ?? 10_000),
		},
		auth: {
			username: process.env.E2E_USERNAME,
			password: process.env.E2E_PASSWORD,
		},
	};

	return cachedConfig;
};
