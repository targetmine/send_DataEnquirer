export interface ModelNode {
	name: string;
	children: ModelNode[];
}

export interface ModelFlatNode {
	name: string;
	level: number;
	expandable: boolean;
}