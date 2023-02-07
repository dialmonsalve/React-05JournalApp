export interface IUser {
	ok:boolean
	status?: null | string ,
	uid: null | string ,
	email: null | string ,
	displayName: null | string,
	photoURL : null | string,
	errorMessage: null |string | undefined,
}