import "./Date.scss";
import { useState } from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import MyScrollableTable from "../MyScrollableTable/MyScrollableTable";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Date: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal üçün state

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveas = (event: React.FormEvent) => {
    event.preventDefault();
  };
  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    setShowModal(false);
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
              {isOpen && (
                <Link to="/registration" className="menu-a">
                  <span>Registration</span>
                </Link>
              )}
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

  {/* 1-ci about bölməsi */}
  <div className="about-date">
    <Row className="col-lg-11 col-md-10 col-sm-7 col-4 ">
      
      <Col xs={12} sm={12} md={12} lg={3}>
        <Form.Group controlId="car">
          <Form.Label>Car No</Form.Label>
          <Form.Control type="text" placeholder="Click" />
        </Form.Group>
      </Col>

      <Col xs={12} sm={12} md={12} lg={3}>
        <Form.Group controlId="date">
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control type="text" placeholder="Click" />
        </Form.Group>
      </Col>

      <Col xs={12} sm={12} md={12} lg={3}>
        <Form.Group controlId="parking">
          <Form.Label>Parking No</Form.Label>
          <Form.Control type="text" placeholder="Click" />
        </Form.Group>
      </Col>

      <Col xs={12} sm={12} md={12} lg={3}>
        <Form.Group controlId="payment">
          <Form.Label>Payment Status</Form.Label>
          <Form.Control type="text" placeholder="Click" />
        </Form.Group>
      </Col>

      <Col xs={12} sm={12} md={12} lg={3}>
        <Button
          variant="primary"
          className="about-button-click w-100"
          onClick={handleShowModal}
        >
          Search
        </Button>
      </Col>

    </Row>
  </div>

  {/* 2-ci about bölməsi */}
  <div className="about-date">
    <Row className="col-lg-11 col-md-10 col-sm-7 col-4 ">
      <Col lg={11} md={9} sm={12} xs={12}>
        <MyScrollableTable />
      </Col>
    </Row>
  </div>

</div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title className="title-modal">Yeni Qeydiyyat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveas}>
            {["name", "surname", "parking", "payment", "car", "date"].map(
              (field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>
                    {field[0].toUpperCase() + field.slice(1)}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id={field}
                    placeholder={`Click your ${field}`}
                    required
                  />
                </Form.Group>
              )
            )}
            <Button variant="primary" type="submit" className="button">
              Save as
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Date;
