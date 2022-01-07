import { ICellReference } from "./reference";

export enum FloatObjectType {
    Picture = "pic",
    Video = "video",
    Chart = "chart"
}

export interface IFloatObject {
    id: number;
    anchor: ICellReference;
    type: FloatObjectType;
}