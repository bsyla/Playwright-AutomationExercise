import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { AppConfig } from "../config";
import type { User } from "../types/user";

export interface ApiResult {
	ok: boolean;
	status: number;
	responseCode?: number;
	body: string;
}

export class AccountApi {
	private readonly request: APIRequestContext;
	private readonly config: AppConfig;

	constructor(request: APIRequestContext, config: AppConfig) {
		this.request = request;
		this.config = config;
	}

	async createAccount(user: User): Promise<ApiResult> {
		const response = await this.request.post(
			`${this.config.apiBaseUrl}/api/createAccount`,
			{
				form: {
					name: user.firstName,
					email: user.email,
					password: user.password,
					title: user.title,
					birth_date: user.birthDay,
					birth_month: user.birthMonth,
					birth_year: user.birthYear,
					firstname: user.firstName,
					lastname: user.lastName,
					company: user.company,
					address1: user.address,
					address2: user.address2 ?? "",
					country: user.country,
					zipcode: user.zipcode,
					state: user.state,
					city: user.city,
					mobile_number: user.mobile,
				},
				timeout: this.config.timeouts.api,
			},
		);

		return this.parseResponse(response);
	}

	async deleteAccount(email: string, password: string): Promise<ApiResult> {
		const response = await this.request.delete(
			`${this.config.apiBaseUrl}/api/deleteAccount`,
			{
				form: { email, password },
				timeout: this.config.timeouts.api,
			},
		);

		return this.parseResponse(response);
	}

	private async parseResponse(response: APIResponse): Promise<ApiResult> {
		const body = await response.text();
		let responseCode: number | undefined;

		try {
			const json = JSON.parse(body) as { responseCode?: number };
			if (json.responseCode) {
				responseCode = Number(json.responseCode);
			}
		} catch {
			responseCode = undefined;
		}

		const ok =
			response.ok() &&
			(responseCode === undefined || [200, 201].includes(responseCode));

		return {
			ok,
			status: response.status(),
			responseCode,
			body,
		};
	}
}
