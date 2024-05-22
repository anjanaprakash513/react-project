import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function AddMedicine() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_Date] = useState('');
    const navigate = useNavigate();

    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";
  

    function addPost() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine', {
            name: name,
            company: company,
            expiry_date: expiry_date
        }, {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            navigate('/list');
        })
        .catch(error => {
            console.error('Error adding post:', error);
        });
    }
    

    return (
        <div>

            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Add medicine</h1>
                        <div className="form-group">
                            <label>Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={company} 
                                onChange={(event) => setCompany(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                value={expiry_date} 
                                onChange={(event) => setExpiry_Date(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={addPost}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(AddMedicine);
