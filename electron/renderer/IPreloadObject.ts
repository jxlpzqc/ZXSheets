export interface IPreloadObject {
  closeMainWindow(): void;
  maximizeOrRestoreMainWindow(): void;
  minimizeMainWindow(): void;
  bindWindowMaximizedChange(event: (maximized: boolean) => void): void;
  // __ipcSendMessage(channel: string, ...args: any[]): void;
  // __ipcOn(channel: string, ...args: any[]): void;
  // __ipcOnce(channel: string, ...args: any[]): void;
}