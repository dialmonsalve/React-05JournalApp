export interface IJournal{
	isSaving:boolean;
	messagedSaved:string;
	notes:INote[];
	active:null | INote ;
}

export interface INote {
	id:string;
	title:string;
	body:string, 
	date: number,
	imageUrls:string[]
}
