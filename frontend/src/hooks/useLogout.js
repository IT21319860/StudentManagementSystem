import { useAuthContext} from './useAuthContext'


export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {

        //remove student from local storage
        localStorage.removeItem('student')

        //dispatch logout action

        dispatch({type:'LOGOUT'})
    }

    return {logout}
}