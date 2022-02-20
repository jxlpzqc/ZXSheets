export function isRunInElectron(): boolean {
  return !!(ZXSHEETS_PLATFORM === 'electron');
}
