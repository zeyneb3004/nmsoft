import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Login.scss";
import { Container, Row, Col } from "react-bootstrap";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "name" && password === "1234") {
      navigate("/registration"); 
    } else {
      alert("Try again!!!");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={submit} className="d-flex flex-column">
            <input
              type="text"
              placeholder="Click your name"
              value={name}
              onChange={handleName}
              className="form-control mb-3"
            />
            <input
              type="password"
              placeholder="Click your password"
              value={password}
              onChange={handlePassword}
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
