declare module "detect-touch-events" {
  const browserSupportsApi: boolean | undefined;
  const hasSupport: boolean | undefined;
  const update: () => void;
}
