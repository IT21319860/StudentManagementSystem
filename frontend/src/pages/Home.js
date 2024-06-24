import { useEffect} from 'react'
import { useUsersContext } from "../hooks/useUsersContext"


//components
import UserRegForm from '../components/UserRegForm'
import UserDetails from '../components/UserDetails'

const Home = () => { 
    const {users, dispatch} = useUsersContext()
    
    useEffect(() => {
        const fetchUsers = async() => {
            const response = await fetch('/api/users')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_USERS', payload: json})
                       
            }
        }

        fetchUsers()
    }, [])
    return(
        <div className="home">
            <div className="workouts">
                {users && users.map(user => (
                    <UserDetails user={user} key={user._id} />
                 ))}
            </div>




            <UserRegForm />
        </div>
    )
}

export default Home