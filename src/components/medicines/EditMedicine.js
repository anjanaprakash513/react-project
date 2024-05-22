import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function EditMedicine() {
    const { postId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_Date] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    
    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";

    useEffect(() => {
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry_Date(response.data.expiry_date);
        })
        .catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [postId, token]);

    function updatePost() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine/' + postId, {
            name: name,
            company: company,
            expiry_date: expiry_date
        }, {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            setShowModal(true);
        })
        .catch(error => {
            console.error('Error updating post:', error);
        });
    }

    function handleCloseModal() {
        setShowModal(false);
        navigate('/list');
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center mt-5">Edit Medicine</h1>
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
                            <button className="btn btn-primary float-right" onClick={updatePost}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bootstrap Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmation</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>do you want to update this medicine?</p>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleCloseModal}>update</button>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default checkAuth(EditMedicine);

