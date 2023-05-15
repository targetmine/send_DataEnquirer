export interface Model{
	elements: Element[],
	relations: Relation[]
}

export interface Element{
	name: string;
	attributes: Attribute[];
}

export const ATTRIBUTE_TYPES = ['varchar(40)', 'text', 'integer', 'double precision'] as const;
export type AttributeType = typeof ATTRIBUTE_TYPES[number];
export interface Attribute{
	name: string;
	type: AttributeType;
	unique: boolean;
}

export const CARDINALITY = ['one to one', 'one to many', 'many to many'] as const; 
export type Cardinality = typeof CARDINALITY[number];
export interface Relation{
	name: string;
	srcElement: string;
	srcAttribute: string;
	srcType: AttributeType;
	trgElement: string;
	trgAttribute: string;
	trgType: AttributeType;
	cardinality: Cardinality;
}

export interface ModelNode {
	name: string;
	children: ModelNode[];
}