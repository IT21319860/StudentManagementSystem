import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'




const Navbar = () => {
    const { logout } = useLogout()
    const { student } = useAuthContext()

    const handleClick = () => {
        logout()

    }

    return(
        <header>
            <div className="container">

                <Link to="/">
                    <h1>Rovista Higher Education Institute</h1>
                </Link>
                <nav>
                    {student && ( 
                     <div>
                        <span>{student.mail}</span>
                        <button onClick={handleClick}>LOGOUT</button>
                     </div>
                    )}
                    {!student && (
                     <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                     </div>
                    )}
                </nav>

            </div>
        </header>
    )
}


export default Navbar