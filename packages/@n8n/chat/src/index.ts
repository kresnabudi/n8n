import './main.scss';

import { createApp } from 'vue';
// import { Tooltip, vTooltip } from 'floating-vue';
import {
	// Directives
	vTooltip,
	vClosePopper,
	// Components
	Dropdown,
	Tooltip,
	Menu,
} from 'floating-vue';
import App from './App.vue';
import type { ChatOptions } from '@n8n/chat/types';
import { defaultMountingTarget, defaultOptions } from '@n8n/chat/constants';
import { createDefaultMountingTarget } from '@n8n/chat/utils';
import { ChatPlugin } from '@n8n/chat/plugins';

export function createChat(options?: Partial<ChatOptions>) {
	const resolvedOptions: ChatOptions = {
		...defaultOptions,
		...options,
		webhookConfig: {
			...defaultOptions.webhookConfig,
			...options?.webhookConfig,
		},
		i18n: {
			...defaultOptions.i18n,
			...options?.i18n,
			en: {
				...defaultOptions.i18n?.en,
				...options?.i18n?.en,
			},
		},
		theme: {
			...defaultOptions.theme,
			...options?.theme,
		},
	};

	const mountingTarget = resolvedOptions.target ?? defaultMountingTarget;
	if (typeof mountingTarget === 'string') {
		createDefaultMountingTarget(mountingTarget);
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const app = createApp(App);
	app.use(ChatPlugin, resolvedOptions);
	app.mount(mountingTarget);
	// app.directive('tooltip', vTooltip);
	app.directive('tooltip', vTooltip);
	app.directive('close-popper', vClosePopper);

	app.component('VDropdown', Dropdown);
	app.component('VTooltip', Tooltip);
	app.component('VMenu', Menu);
	return app;
}
