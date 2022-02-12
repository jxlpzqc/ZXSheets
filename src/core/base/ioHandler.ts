
export interface IFileDescriptor {
    filePointer: number;
    seekable: boolean;
}

export interface IIOHandler {

    open: (filename: string) => IFileDescriptor;
    read: (fd: IFileDescriptor, content: Uint8Array) => void;
    write: (fd: IFileDescriptor, content: Uint8Array) => void;
    seek: (fd: IFileDescriptor, position: number) => void;

}