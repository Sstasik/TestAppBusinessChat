
interface Question{
	id: string;
	type: string;
	data: { label: string; value: string };
	measured?: { width: number; height: number };
	position: { x: number; y: number };
};

interface Answer {
	id: string;
	type: string;
	data: { label: string; value: string };
	source: string;
	target: string;
	selected: boolean;
};

export interface BotTree{
	nodes: Question[];
	edges: Answer[];
};