import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

type Document = {
	id:string;
}

export const loadNotes = async (uid:string) =>{
	if(!uid) throw new Error('El uid del usuario no existe')

	const collectionRef = collection( FirebaseDB, `${uid}/journal/notes`);
	const docs  = await getDocs( collectionRef );
	const notes:Document[] = []

	docs.forEach( doc =>{
		
		notes.push({id: doc.id, ...doc.data() })
	});

	return notes;

}