import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

/**
 * Express module.
 * @module express
 */
const express = require('express');
const logError = require('./logger'); // Import the logger function

const app = express();

app.get('/test', (req: express.Request, res: express.Response) => {
  try {
    throw new Error('Something went wrong!');
  } catch (error) {
    logError(error); 
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
// logger.js
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: 'info', // Set default log level
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.json(), // Structured log format for easier parsing
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d', // Keep logs for 30 days
      level: 'info'
    })
  ]
});

// Security consideration - Anonymize sensitive data in logs
const anonymizeSensitiveData = (logData) => {
  if (logData && logData.userId) {
    logData.userId = `anonymized-${logData.userId.slice(-4)}`; // Simple anonymization example
  }
  return logData;
};

const secureLog = (level, message, logData = {}) => {
  const sanitizedData = anonymizeSensitiveData(logData);
  logger.log({
    level: level,
    message: message,
    ...sanitizedData,
  });
};

module.exports = { logger, secureLog };