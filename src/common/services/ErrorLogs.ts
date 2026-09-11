const jsonReplacer = (_, value) =>
  typeof value === 'bigint' ? value.toString() : value;

export const captureOperationError = (
  error: Error | string,
  network: 'ergo',
  operation: string,
  context?: object,
): void => {
  const message = typeof error === 'string' ? error : error.message;

  console.error(`[${network}] ${operation} failed: ${message}`, {
    context: context ? JSON.stringify(context, jsonReplacer, 2) : undefined,
  });
};
