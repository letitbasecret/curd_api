// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const navigate=useNavigate();

  const handleDelete= async (id)=>{
    console.log(id);
    setLoading(true);
    try {
       const response =await fetch ("api"+id,{
        method:"delete",
       }) ;
       if(!response.ok){
        throw new Error("failed to delete the item")
       }
       setUser(user.filter((item)=>{(item.id!==id)}));
    } catch (error) {
        setError(error.message)
        
    }finally{
        setLoading(false);
        navigate("/")
    }

  }

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  if (user.data < 0) {
    return <h1>no data found</h1>;
  } else {
    return (
      <div>
        {loading}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Header />
        <div className="contain">
          <h1>USERS-LIST</h1>
          <table className="table-secondary">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">PHONE</th>
                <th scope="col">ADDRESS</th>
                <th scope="col">OPERATION</th>
                <th scope="col">OPERATION</th>
              </tr>
            </thead>
            <tbody>
              {user?.map((item, index) => {
                
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address.city}</td>
                    <td>
                      <Link to={`/edit/${item.id}`}>Edit</Link>
                    </td>
                    <td>
                      <Link to={`/delete/${item.id}`}><span onClick={handleDelete}>Delete</span></Link>
                    </td>
                  <tr/>
                
              });}
              </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  
}
}