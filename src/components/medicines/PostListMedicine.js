import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function PostListMedicine(props) {
    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";
  
    const [showModal, setShowModal] = useState(false);

    function deletePost() {
        axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setShowModal(false); // Close the modal on successful deletion
            props.refresh();
        })
        .catch(error => {
            console.error('Error deleting post:', error);
            setShowModal(false); // Close the modal on error
        });
    }

    return (
        <tr>
            <td>{props.post.name}</td>
            <td>{props.post.company}</td>
            <td>{props.post.expiry_date}</td>
            <td>
                {/* Button to open the modal */}
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Delete</button>

                {/* Edit and View links */}
                <Link to={"/blog/posts/" + props.post.id + "/edit"} className="btn btn-primary">Edit</Link>
                <Link to={"/blog/posts/" + props.post.id} className="btn btn-info">View</Link>

                {/* Modal for confirmation */}
                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirmation</h5>
                                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p style={{color:"black"}}>Are you sure you want to delete this {props.post.name}?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={deletePost}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
}

export default PostListMedicine;
