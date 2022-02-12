export function isRunInElectron(): boolean {
  return !!(window?.process?.versions?.electron);
}
