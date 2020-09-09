import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
	dsn: 'https://68462983d4e24810a6c43b059011c203@o446005.ingest.sentry.io/5423731',
	integrations: [
	  new Integrations.BrowserTracing({
		tracingOrigins: ['localhost', 'https://yourserver.io/api'],
		routingInstrumentation: Sentry.routingInstrumentation,
	  }),
	],
	tracesSampleRate: 1.0,
  });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
