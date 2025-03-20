interface Config {
  apiUrl: string;
  sentryDsn: string | undefined;
  environment: string;
  features: {
    analytics: boolean;
    notifications: boolean;
    teamCollaboration: boolean;
  };
}

const config: Config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  sentryDsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  features: {
    analytics: process.env.REACT_APP_FEATURE_ANALYTICS === 'true',
    notifications: process.env.REACT_APP_FEATURE_NOTIFICATIONS === 'true',
    teamCollaboration: process.env.REACT_APP_FEATURE_TEAM_COLLABORATION === 'true',
  },
};

export default config; 