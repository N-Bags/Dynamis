export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class AppError extends Error {
  code: string;
  status: number;
  details?: any;

  constructor(message: string, code: string, status: number = 500, details?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
    };
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      message: error.response.data.message || 'An error occurred',
      code: error.response.data.code || 'UNKNOWN_ERROR',
      status: error.response.status,
      details: error.response.data.details,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'No response received from server',
      code: 'NETWORK_ERROR',
      status: 0,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      status: 500,
    };
  }
};

export const getErrorMessage = (error: ApiError): string => {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Unable to connect to the server. Please check your internet connection.';
    case 'UNAUTHORIZED':
      return 'Your session has expired. Please log in again.';
    case 'FORBIDDEN':
      return 'You do not have permission to perform this action.';
    case 'NOT_FOUND':
      return 'The requested resource was not found.';
    case 'VALIDATION_ERROR':
      return 'Please check your input and try again.';
    case 'SERVER_ERROR':
      return 'An error occurred on the server. Please try again later.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};

export const isNetworkError = (error: ApiError): boolean => {
  return error.code === 'NETWORK_ERROR' || (error.status ?? 0) === 0;
};

export const isAuthError = (error: ApiError): boolean => {
  return error.code === 'UNAUTHORIZED' || (error.status ?? 0) === 401;
};

export const isValidationError = (error: ApiError): boolean => {
  return error.code === 'VALIDATION_ERROR' || (error.status ?? 0) === 422;
};

export const isNotFoundError = (error: ApiError): boolean => {
  return error.code === 'NOT_FOUND' || (error.status ?? 0) === 404;
};

export const isServerError = (error: ApiError): boolean => {
  return error.code === 'SERVER_ERROR' || ((error.status ?? 0) >= 500);
};

export const shouldRetry = (error: ApiError): boolean => {
  return isNetworkError(error) || isServerError(error);
};

export const getRetryDelay = (attempt: number): number => {
  // Exponential backoff with jitter
  const baseDelay = 1000; // 1 second
  const maxDelay = 30000; // 30 seconds
  const exponentialDelay = baseDelay * Math.pow(2, attempt - 1);
  const jitter = Math.random() * 1000; // Random delay between 0-1 seconds
  return Math.min(exponentialDelay + jitter, maxDelay);
}; 