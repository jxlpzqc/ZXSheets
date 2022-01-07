import { ICell } from "./cell";
import { IFloatObject } from "./floatObject";
import { IResource } from "./resource";
import { ISheet } from "./sheet";

export enum RefType {
    SheetRef = 0,
    CellRef = 1,
    FloatObjectRef = 2,
    ResourceRef = 3,
    OtherRef = 4,
}

export interface IReference {
    objID: string;
    type: RefType;
}

export interface ICellReference extends IReference {
    getCellName(): string;
    getCell(): ICell;
    getSheetName(): string;
    getSheet(): ISheet;
}

export interface IFloatObjectReference extends IReference {
    getFloatObject(): IFloatObject;
}

export interface ISheetReference extends IReference {
    getSheetName(): string;
    getSheet(): ISheet;
}

export interface IResourceReference extends IReference {
    getResource(): IResource;
}

