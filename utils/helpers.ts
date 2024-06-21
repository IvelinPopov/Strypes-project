import { WebActionTimeouts } from "../data/webActionTimeoutsEnum";
import { Page } from "@playwright/test";

// The utility helps with avoiding things like missing opening " or closing "
export const byAttributeName = (attribute: string, value: string): string => `[${attribute}="${value}"]`;

// The utility helps with sync on first element of a page/component,
// despite the fact playwright cliams autowait
export const waitAndClick = async (
	page: Page,
	selector: string,
	clickOptions = { force: false },
	timeout: WebActionTimeouts = WebActionTimeouts.VERY_SHORT
) => {
	await page.waitForSelector(selector, {
		timeout,
	});
	await page.click(selector, clickOptions);
};

export const waitClickType = async (page: Page, selector: string, text: string, clickOptions = { force: false }) => {
	await page.waitForSelector(selector);
	await page.click(selector, clickOptions);
	await page.type(selector, text);
};