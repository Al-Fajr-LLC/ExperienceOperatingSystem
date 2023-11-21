import type { Side } from "../common";

export interface ActionElement {
    type: ElementType.Action,
    label: string,
    side: Side,
    action: () => void
}

export interface LabelElement {
    type: ElementType.Label,
    label: string,
    side: Side
}

export type Element = ActionElement
    | LabelElement;

export enum ElementType {
    Label,
    Action
}