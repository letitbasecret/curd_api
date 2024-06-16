import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";

export default function Show() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`);
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.address}</p>
      </div>
    </div>
  );
}
