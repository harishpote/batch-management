import { Part } from "./batch.type";

export interface Column {
    name: string;
    displayName: string;
    type: string;
}

export interface ActionEvent {
    action: string;
    row: Part;
}

export interface InputEvent {
    column: string;
    row: Part;
}