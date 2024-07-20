import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import "../styles/registration.css";
import { Register } from "../model/Register";
import React, { useState } from "react";
import { validate } from "../validations/Validation";

const Registration: React.FC = () => {
  const initialUserState: Register = {
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    date: {dateB:"",attachemnet:null},
    file: null,
    cpassword: "",
  };

  const [user, setUser] = useState<Register>(initialUserState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status
  const [fileKey, setFileKey] = useState(Date.now()); // State for file input key


  const onhandleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    let newUser = { ...user };

    if (name === "dateB" || name === "attachemnet") {
      newUser = {
        ...newUser,
        date: {
          ...newUser.date,
          [name]: value,
        
        },
      };
    } else {
      newUser = {
        ...newUser,
        [name]: value,
      };
    }

    setUser(newUser);
    const validationResult = validate(newUser);
    setErrors(validationResult);

  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const newUser = { ...user, file };
    setUser(newUser)
    const validationResult = validate(newUser);
    setErrors(validationResult);

  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationResult = validate(user);
    setErrors(validationResult);

    if (Object.keys(validationResult).length === 0) {
      console.log(user);
      setIsSubmitted(true); // Set submission status to true
      setUser(initialUserState); // Clear the form fields
      setErrors({}); // Clear the errors
      setFileKey(Date.now())
    } else {
      setIsSubmitted(false); // Set submission status to false if there are errors
    }
  };

  return (
    <>
      <Container className="container">
        <Row>
          <Col md={12}>
            <div className="login-card">
              <h3 className="title">Registration</h3>
              <Form onSubmit={handleSubmit}>
                {isSubmitted && (
                  <Alert variant="success" onClose={() => setIsSubmitted(false)} dismissible>
                    Registration successful!
                  </Alert>
                )}
                <Form.Group controlId="formBasicfirstName" className="mb-4">
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="firstName"
                    value={user.firstName}
                    className="input"
                    onChange={onhandleChange}
                    isInvalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasiclastName" style={{ marginBottom: "20px" }}>
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="lastName"
                    className="input"
                    value={user.lastName}
                    onChange={onhandleChange}
                    isInvalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicphoneNumber" className="mb-4">
                  <Form.Control
                    name="number"
                    type="number"
                    placeholder="PhoneNumber"
                    className="input"
                    onChange={onhandleChange}
                    value={user.number}
                    isInvalid={!!errors.number}
                  />
                  {errors.number && (
                    <Form.Control.Feedback type="invalid">
                      {errors.number}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-4">
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input"
                    onChange={onhandleChange}
                    value={user.email}
                    isInvalid={!!errors.email}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicDob" className="mb-4">
                  <Form.Control
                    type="date"
                    name="dateB"
                    placeholder="select your dob"
                    className="input"
                    onChange={onhandleChange}
                    value={user.date.dateB}
                    isInvalid={!!errors.dateB}
                  />
                  {errors.dateB && (
                    <Form.Control.Feedback type="invalid">
                      {errors.dateB}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                 <Form.Group controlId="formBasicDobAttach" className="mb-4">
                  <Form.Label>Birth Certificate</Form.Label>
                  <Form.Control
                  key={fileKey}
                    name="attachemnet"
                    type="file"
                    placeholder="File"
                    className="input"
                    onChange={onhandleChange}
                    isInvalid={!!errors.dobfile}
                  />
                  {errors.dobfile && (
                    <Form.Control.Feedback type="invalid">
                      {errors.dobfile}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group controlId="formBasicFile" className="mb-4">
                  <Form.Control
                  key={fileKey}
                    name="file"
                    type="file"
                    placeholder="File"
                    className="input"
                    onChange={onFileChange}
                    isInvalid={!!errors.file}
                  />
                  {errors.file && (
                    <Form.Control.Feedback type="invalid">
                      {errors.file}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicCurrentPassword" className="mb-4">
                  <Form.Control
                    name="cpassword"
                    type="password"
                    placeholder="Enter your password"
                    className="input"
                    value={user.cpassword}
                    onChange={onhandleChange}
                    isInvalid={!!errors.cpassword}
                  />
                  {errors.cpassword && (
                    <Form.Control.Feedback type="invalid">
                      {errors.cpassword}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button
                  variant="danger"
                  type="submit"
                  style={{
                    width: "100%",
                    borderRadius: "50px",
                    padding: "15px",
                    backgroundColor: "#ff416c",
                    border: "none",
                  }}
                >
                  Register
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Registration;
