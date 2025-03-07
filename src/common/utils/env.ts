export const isProductionEnv = (): boolean =>
  import.meta.env.NODE_ENV === 'production';

export const getSentryEnv = (): string => {
  if (location.host === 'zerodex.vercel.app') {
    return 'production';
  }
  if (location.host === 'test.spectrum.fi') {
    return 'test';
  }
  if (location.host === 'dev.spectrum.fi') {
    return 'dev';
  }
  return 'local';
};
