import { useState } from "react";
import "./Users.scss";
import { Form, Row, Col, Modal } from "react-bootstrap";
import UsersTable from "../UsersTable/UsersTable";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:3001/users";

const Users: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModaltable, setShowModaltable] = useState(false); // Modal üçün state
  const [labelData, setLabelData] = useState({
    name: "",
    surname: "",
    address: "",
    payment: "",
    car: "",
    date: "",
  });
  const queryClient = useQueryClient();
  const handleShowModaltable = () => setShowModaltable(true);
  const handleCloseModaltable = () => setShowModaltable(false);
  const addUsers= useMutation({
    mutationFn: async (newData: typeof labelData) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error("Əlavə etmək mümkün olmadı");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      setLabelData({
        name: "",
        surname: "",
        address: "",
        payment: "",
        car: "",
        date: "",
      });
      handleCloseModaltable();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelData({ ...labelData, [e.target.id]: e.target.value });
  };

  const handleSaveas = (event: React.FormEvent) => {
    event.preventDefault();
    addUsers.mutate(labelData); // v5-də mutate hələ eyni qalır
  };
  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    setShowModaltable(false);
  };

  return (
    <div className="box-one col-lg-12 col-md-12 col-sm-10 col-12">
      <div className="row ">
        <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
          <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            NM SOFT
          </div>

          <ul className="menu">
            <li>
              <Link to="/registr" className="menu-a">
                {isOpen && <span>Registration</span>}
              </Link>
            </li>
             <li>
              {isOpen && (
                <Link to="/users" className="menu-a">
                  <span>Users</span>
                </Link>
              )}
            </li>
           <li>
              {isOpen && (
                <Link to="/payment" className="menu-a">
                  <span>Payment</span>
                </Link>
              )}
            </li>
            <li>
              {isOpen && (
                <Link to="/hikvision" className="menu-a">
                  <span>Hikvision</span>
                </Link>
              )}
            </li>
            <li>
              {isOpen && (
                <Link to="/date" className="menu-a">
                  <span>Date</span>
                </Link>
              )}
            </li>
            <li>
              {isOpen && (
                <Link to="/prices" className="menu-a">
                  <span>Prices</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="box-two">
        <div className="about col-lg-11 col-md-10 col-sm-7 col-4">
          <Row  >
            <Col xs={12} sm={12} md={12} lg={2} >
              <Button
                type="primary"
                className="button-onetable"
                onClick={handleShowModaltable}
              >
                New
              </Button>
            </Col>

            
          </Row>
        </div>

        <div className="about  col-lg-11 col-md-10 col-sm-7 col-4">
          <Col lg={11} md={9} sm={12} xs={9}>
           <UsersTable/>
          </Col>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModaltable}
        onHide={handleCloseModaltable}
        centered
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title >Yeni Qeydiyyat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
 
      <Form onSubmit={handleSaveas}>
            {["name", "surname", "address", "payment", "car", "date"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field[0].toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  type="text"
                  id={field}
                  value={labelData[field as keyof typeof labelData]}
                  onChange={handleChange}
                  placeholder={`Click your ${field}`}
                  required
                />
              </Form.Group>
            ))}
            <Button type="primary" htmlType="submit" className="button">
              Save as
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Users;
