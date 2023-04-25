import { Element } from 'src/app/shared/models/element';
import { Relation } from 'src/app/shared/models/relation';

export interface Model {
	elements: Element[],
	relations: Relation[]
}

export interface ModelNode {
	name: string;
	children: ModelNode[];
}