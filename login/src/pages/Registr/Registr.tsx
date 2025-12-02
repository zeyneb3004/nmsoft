import { useState } from "react";
import "./Registr.scss";
import { Form, Row, Col, Modal } from "react-bootstrap";
import MyScrollableTable from "../MyScrollableTable/MyScrollableTable";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://api-park.nmtech.az/e-parking/api/v0/resident/search";
const TOKEN =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJzZXNzaW9uIjoiNjVjNmFlNWQtOWM5MS00MjljLTgwYjQtZjExNTY0NjdkNzgzIiwiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJzdWIiOiJlQmluYSIsImlhdCI6MTc2NDY1Nzg1NCwiZXhwIjoxODUxMDU3ODU0fQ.Wm-25PIr8drznSCD2VShVp-m8RMIZ9GZls6_FFCsiFFqNRjgOQczHGh2iv5kTII_13I3yImHjUDZgJ6gxEkpew"; // swagger-dən aldığın token-i buraya qoy

const Registr: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Modal üçün form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    fullName: "",
    password: "",
    repeatedPassword: "",
  });

  // Search üçün form
  const [searchData, setSearchData] = useState({
    username: "",
    email: "",
    mobile: "",
    fullName: "",
    password: "",
    repeatedPassword: "",
  });

  const queryClient = useQueryClient();

  // ✓ Baza məlumatlarını yükləyirik
  const { data: registrations = [] } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const res = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      return res.json();
    },
  });

  // ✓ Yeni qeydiyyat əlavə etmək
  const addRegistration = useMutation({
    mutationFn: async (newData: typeof formData) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error("Əlavə etmək mümkün olmadı");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      setFormData({
        username: "",
        email: "",
        mobile: "",
        fullName: "",
        password: "",
        repeatedPassword: "",
      });
      setShowModal(false);
    },
  });

  // ✓ Modal input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✓ Search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({ ...searchData, [e.target.id]: e.target.value });
  };

  // ✓ Save as
  const handleSaveas = (event: React.FormEvent) => {
    event.preventDefault();
    addRegistration.mutate(formData);
  };

  // ✓ Filterlənmiş data
  const filteredData = registrations.filter((item: any) => {
    return (
      item.name.toLowerCase().includes(searchData.username.toLowerCase()) &&
      item.parking.toLowerCase().includes(searchData.mobile.toLowerCase()) &&
      item.payment.toLowerCase().includes(searchData.fullName.toLowerCase()) &&
      item.date.toLowerCase().includes(searchData.password.toLowerCase())
    );
  });

  return (
    <div className="box-one col-lg-12 col-md-12 col-sm-10 col-12">
      {/* SIDEBAR */}
      <div className="row">
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
              <Link to="/users" className="menu-a">
                {isOpen && <span>Users</span>}
              </Link>
            </li>
            <li>
              <Link to="/payments" className="menu-a">
                {isOpen && <span>Payments</span>}
              </Link>
            </li>
            <li>
              <Link to="/hikvision" className="menu-a">
                {isOpen && <span>Hikvision</span>}
              </Link>
            </li>
            <li>
              <Link to="/date" className="menu-a">
                {isOpen && <span>Date</span>}
              </Link>
            </li>
            <li>
              <Link to="/prices" className="menu-a">
                {isOpen && <span>Prices</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="box-two">
        {/* TOP FILTERS */}
        <div className="about-page">
          <Row className="col-lg-11 col-md-10 col-sm-7 col-4">
            {/* NEW BUTTON */}
            <Col xs={12} sm={12} md={12} lg={2}>
              <Button
                type="primary"
                className="about-button w-100 mb-3 p-3"
                onClick={() => setShowModal(true)}
              >
                New
              </Button>
            </Col>

            {/* SEARCH INPUTS */}
            <Col xs={12} sm={6} md={4} lg={2}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Click"
                  id="name"
                  value={searchData.username}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={2}>
              <Form.Group controlId="parking">
                <Form.Label>Parking</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Click"
                  id="parking"
                  value={searchData.email}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={2}>
              <Form.Group controlId="payment">
                <Form.Label>Payment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Click"
                  id="payment"
                  value={searchData.mobile}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={2}>
              <Form.Group controlId="date">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Click"
                  id="date"
                  value={searchData.fullName}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>

            {/* SEARCH BUTTON */}
            <Col xs={12} sm={12} md={12} lg={2}>
              <Button type="primary" className="about-button w-100 mt-4 p-3">
                Search
              </Button>
            </Col>
          </Row>
        </div>

        {/* TABLE SECTION */}
        <div className="about-page">
          <Row className="col-lg-11 col-md-10 col-sm-7 col-4">
            <Col lg={11} md={9} sm={12} xs={12}>
              <MyScrollableTable data={filteredData} />
            </Col>
          </Row>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
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
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={`Click your ${field}`}
                    required
                  />
                </Form.Group>
              )
            )}

            <Button type="primary" htmlType="submit" className="button">
              Save as
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Registr;
