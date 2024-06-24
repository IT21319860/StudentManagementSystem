import { useState } from 'react'
import { useSignup } from "../hooks/useSignup"



const Signup = () => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
    
         signup(mail, password)

         
      }



    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up...</h3>
            <label>Email:</label>
            <input 
             type="email"
             onChange={(e) => setMail(e.target.value)} 
             value={mail}
            />

            <label>Password:</label>
            <input 
             type="password"
             onChange={(e) => setPassword(e.target.value)} 
             value={password}
            />

            <button disabled={isLoading}>SIGN UP</button>
            {error && <div className='error'> {error}</div>}
        </form>
    )
}
export default Signup