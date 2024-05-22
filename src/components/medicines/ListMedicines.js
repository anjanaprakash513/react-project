import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostListMedicine from "./PostListMedicine";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ListMedicine() {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredPosts(allPosts);
    } else {
      const filteredItems = allPosts.filter((item) =>
        item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredPosts(filteredItems);
    }
  };
  

  const user = useSelector((store) => store.auth.user);
  const token = user?.token || "";

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    axios
      .get('https://medicalstore.mashupstack.com/api/medicine', {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setAllPosts(response.data);
        setFilteredPosts(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // You might want to handle this error more gracefully
        // setLoading(false);
      });
  }

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
            <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <form className="form-inline my-3" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control mr-sm-2"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <button className="btn btn-primary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Medicines</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/add" className="btn btn-info mb-2">
              Add Medicine
            </Link>
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Name</th>
                  <th>Company</th>
                  <th>Expiry Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <PostListMedicine key={post.id} post={post} refresh={fetchPosts} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListMedicine);

