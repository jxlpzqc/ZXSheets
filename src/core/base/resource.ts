export interface IResource {
    id: string,
    name: string,
    get content(): Uint8Array
}

