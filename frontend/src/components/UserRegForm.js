import { useState } from "react"
import { useUsersContext } from "../hooks/useUsersContext"


const UserRegForm = () => {
    const {dispatch} = useUsersContext()
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [nic, setNIC] = useState('')
    const [mobile, setMobile] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    

    const handleSubmit = async(e) => {
        e.preventDefault()

        const user = {firstName,lastName,age,address,email,nic,mobile}

        const response = await fetch('/api/users',{
            method:'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type':'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setfirstName('')
            setlastName('')
            setAge('')
            setAddress('')
            setEmail('')
            setNIC('')
            setMobile('')
            setError(null)
            setEmptyFields([])
            console.log('User Registered!!!',json)
            dispatch({type:'CREATE_USER',payload:json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Student Register Form </h3>

            <label> First name :</label>
            <input
              type = "text"
              onChange={(e) => setfirstName(e.target.value)} 
              value={firstName}
              className={emptyFields.includes('firstName')? 'error' : ''}
            />

            <label> Last name :</label>
            <input
              type = "text"
              onChange={(e) => setlastName(e.target.value)} 
              value={lastName}
              className={emptyFields.includes('lastName')? 'error' : ''}
            />

            <label> Age :</label>
            <input
              type = "number"
              onChange={(e) => setAge(e.target.value)} 
              value={age}
              className={emptyFields.includes('age')? 'error' : ''}
            />

            <label> Address :</label>
            <input
              type = "text"
              onChange={(e) => setAddress(e.target.value)} 
              value={address}
              className={emptyFields.includes('address')? 'error' : ''}
            />

            <label> Email :</label>
            <input
              type = "text"
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              className={emptyFields.includes('email')? 'error' : ''}
            />

            <label> NIC :</label>
            <input
              type = "text"
              onChange={(e) => setNIC(e.target.value)} 
              value={nic}
              className={emptyFields.includes('nic')? 'error' : ''}
            />

            <label> Mobile :</label>
            <input
              type = "text"
              onChange={(e) => setMobile(e.target.value)} 
              value={mobile}
              className={emptyFields.includes('mobile')? 'error' : ''}
            />


            <button > REGISTER </button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}
export default UserRegForm
