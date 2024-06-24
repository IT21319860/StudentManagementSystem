import jsPDF from "jspdf";
import "jspdf-autotable";
import { useUsersContext } from "../hooks/useUsersContext"

const UserDetails = ({ user }) => {
    const{dispatch} = useUsersContext() 

    const handleClick = async () => {
        const response = await fetch('/api/users/' + user._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
           dispatch({type: 'DELETE_USER', payload:json}) 
        }
    }
    const exportUserDetails = () => {
        console.log("Export PDF")


        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Student Details Report ";
        const headers = [["firstName", "lastName", "age", "address","email","nic","mobile"]];

        const fed = [
            [
                user.firstName,
                user.lastName,
                user.age,
                user.address,
                user.email,
                user.nic,
                user.mobile

            ]
        ];
        let content = {
            startY: 50,
            head: headers,
            body: fed
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("StudentDetails-Report.pdf")
}

    return(
        <div className="workout-details">
            <h4>{user.email}</h4>
            <p><strong>FirstName: </strong>{user.firstName}</p>
            <p><strong>lastName: </strong>{user.lastName}</p>
            <p><strong>Age: </strong>{user.age}</p>
            <p><strong>Address: </strong>{user.address}</p>
            <p><strong>NIC: </strong>{user.nic}</p>
            <p><strong>Mobile: </strong>{user.mobile}</p>

            <button onClick={exportUserDetails}>Generate Report</button>
            <button> Add Feedback </button>

            <span onClick={handleClick}>Delete</span>
            
        </div>
    )

}
export default UserDetails
