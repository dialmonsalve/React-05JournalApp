import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm={}, formValidations = {}) => {

	const [formState, setFormState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState({});

	useEffect( () => {//*implementado
		createValidators();
	}, [formState]);

	useEffect( () =>{//*implementado
		setFormState(initialForm)
	}, [initialForm])

	const isFormValid = useMemo( () =>{//*implementado

		for (const formValue of Object.keys( formValidation )) {
			if( formValidation[formValue] !== null ) return false;
		}

		return true;
		
	},[formValidation])	

	const onInputChange = ({target:{name, value}}) => {//*implementado

		setFormState({
			...formState,
			[name]:value
		})
	};

	const onResetForm = () =>{//*implementado
		setFormState(initialForm);
	};

	const createValidators = () =>{

		const formCheckedValues = {};

		for (const formField of Object.keys(formValidations)) {

			const [ fn, errorMessage ] = formValidations[formField];

			formCheckedValues[`${formField}Valid`] = fn(formState[ formField ]) ? null : errorMessage
			
		}

		setFormValidation( formCheckedValues );
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