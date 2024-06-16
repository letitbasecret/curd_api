import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Home.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  //   const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInput(data);
        console.log(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const newInput = { ...input };
    newInput[e.target.name] = e.target.value;
    setInput(newInput);
    console.log(setInput);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (response.status === 200) {
        // setLoading(false);
        console.log("form submitted successfully");
        const res = await response.json();
        console.log(res);
        let data = setInput([...input, data]);
        console.log("form submitted successfully");
      } else {
        console.error("form submittion failed!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    } finally {
      navigate("/");
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="contain">
        <h1> update- user</h1>
        {loading}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form className="col-lg-4 offset-lg-4  mt-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="form-control m-1"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            className="form-control m-1"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="phone"
            className="form-control m-1"
            name="phone"
            value={input.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            className="form-control m-1"
            name="address"
            value={input.address}
            onChange={handleChange}
          />
          <input type="submit" value="Submit" className="btn btn-dark" />
        </form>
      </div>
      <Footer />
    </div>
  );
}
