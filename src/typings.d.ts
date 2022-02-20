// declare picture files.
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';


interface IPreloadObject {
  closeMainWindow(): void;
  maximizeOrRestoreMainWindow(): void;
  minimizeMainWindow(): void;
  bindWindowMaximizedChange(event: (maximized: boolean) => void): void;
}

// declare ElectronPreload.
interface Window {
  ElectronPreload?: IPreloadObject;
}

// declare vars from webpack define plugin.
declare let ZXSHEETS_PLATFORM: 'electron' | 'web';

