import { useState } from 'react'
import { useAuthContext} from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async(mail,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/student/login',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({mail,password})
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
            dispatch({type:'LOGIN', payload:json})
            setIsLoading(false)

        }

    }

    return {login,isLoading,error}
}