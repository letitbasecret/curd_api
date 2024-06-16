import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //    .then((res) => res.json())
  //    .then((data) => setUsers(data));
  // }, []);

  const handleInput = (e) => {
    e.preventDefault();
    const newInput = { ...input };
    newInput[e.target.name] = e.target.value;
    setInput(newInput);
    console.log(setInput);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (response.status === 201) {
        // setLoading(false);
        console.log("form submitted successfully");
        const res = await response.json();
        console.log(res);
        let data = setUsers([...users, data]);

        setInput({
          name: "",
          email: "",
          phone: "",
        });
      } else {
        console.error("form submittion failed!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      navigate("/home", { replace: true });
    }
  };

  return (
    <div>
      <Header />
      <div className="contain">
        <h1>Add</h1>
        <div className="heading">
          {loading}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </div>
        <form
          className="  col-lg-4 offset-lg-3 mt-5"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="Name"
            className="form-control m-1"
            name="name"
            value={input.name}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Email"
            className="form-control m-1"
            name="email"
            value={input.email}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Phone"
            className="form-control m-1"
            name="phone"
            value={input.phone}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Address"
            className="form-control m-1"
            name="address"
            value={input.address}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <br />
          <input type="submit" value="Submit" className="btn btn-dark " />
          <br />
        </form>
      </div>
      <Footer />
    </div>
  );
}
