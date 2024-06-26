import { useState } from 'react'
import { useAuthContext} from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (mail, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/student/signup',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({mail, password})
        })

        const json = await response.json()


        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('student',JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN', payload: json})


            setIsLoading(false)

        }

    }

    return { signup, isLoading, error }
}