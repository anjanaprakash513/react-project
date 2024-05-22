import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ViewMedicine() {
    const { postId } = useParams();
    const [post, setPost] = useState({ name: '', company: '', expiry_date: '' });
    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";

    useEffect(() => {
        axios.get('https://medicalstore.mashupstack.com/api/medicine/' + postId, {
            headers: { Authorization: "Bearer " + token },
        }).then(response => {
            setPost(response.data);
        }).catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [postId, token]);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header"><h3>{post.name}</h3></div>
                            <div className="card-body">
                                <p>Company: {post.company}</p>
                                <p>Expiry Date: {post.expiry_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(ViewMedicine);
