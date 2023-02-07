import { useEffect, useMemo, useState } from "react";

export const useForm = <T extends Form>(initialForm:T , formValidations:validField) => {

	const [formState, setFormState] = useState<T >(initialForm)
	const [formValidation, setFormValidation] = useState<validField | IFormValidations>(formValidations)

	useEffect( () =>{
		createValidators();
	}, [formState])

	useEffect( () =>{
		setFormState(initialForm)
	}, [initialForm])
	
	const isFormValid = useMemo(() => {

		for (const formValue of Object.keys( formValidation)) {
			if (formValidation[formValue] !== null) return false			
		}
		return true;
	
	}, [formValidation])

	const onInputChange = ({target}:React.ChangeEvent<HTMLInputElement>)=>{
		const {name, value} = target;
		setFormState({
			...formState,
			[name] : value
		})
	}

	const onResetForm = ()=>{

		setFormState(initialForm)
	}

	const createValidators = () => {
		const formCheckedValues:IFormValidations = {} 

		for (const formField of Object.keys(formValidations)){
			const [fn, errorMessage ] = formValidations[formField];

			formCheckedValues[`${formField}Valid`] = fn (formState[formField]) ? null :errorMessage
		}

		setFormValidation( formCheckedValues )

	}

	return {
		formState,
		...formState,
		
		onInputChange,
		onResetForm,

		...formValidation,
		isFormValid
	}
}


export type Form = {
	[name:string]:string 
}

export type validField = {
	[field:string]:[(value:string)=>boolean, null | string]
}

export type IFormValidations = {
	[field:string]:string | null
}