import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export const initializeMonitoring = () => {
  if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      beforeSend(event) {
        if (process.env.NODE_ENV !== 'production') {
          return null;
        }
        return event;
      },
    });
  }
};

export const logError = (error: Error, context?: Record<string, any>) => {
  console.error(error);
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context,
    });
  }
}; 