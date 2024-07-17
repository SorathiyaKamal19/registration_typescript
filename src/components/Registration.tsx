import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "../styles/registration.css";
import { Register } from "../model/Register";
import React, { useState } from "react";
import { validate } from "../validations/Validation";

const Registration: React.FC = () => {
  const [user, setUser] = useState<Register>({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    dob: "",
    file: null,
    cpassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onhandleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    const newErrors = { ...errors };
    const validationResult = validate({ ...user, [name]: value });
    if (!validationResult[name]) {
      delete newErrors[name];
    } else {
      newErrors[name] = validationResult[name];
    }
    setErrors(newErrors);

  };
  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setUser({
      ...user,
      file,
    });
    const newErrors = { ...errors };
    const validationResult = validate({ ...user, file });
    if (!validationResult.file) {
      delete newErrors.file;
    } else {
      newErrors.file = validationResult.file;
    }
    setErrors(newErrors);

  };


  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newErrors = validate(user);
    if (Object.keys(newErrors).length === 0) {
      console.log(user);
    } else {
      setErrors(newErrors);

    }
  };
  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Row>
          <Col md={12}>
            <div
              className="login-card"
              style={{
                maxWidth: "500px",
                width: "100vw",
                padding: "40px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                borderRadius: "15px",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                Registration
              </h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  controlId="formBasicfirstName"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="firstName"
                    style={{ borderRadius: "50px", padding: "15px" }}
                    // required
                    value={user.firstName}
                    onChange={onhandleChange}
                    isInvalid={!!errors.firstName}
                    
                  />
                  {
                    errors.firstName && (
                        <Form.Control.Feedback type="invalid" >
                            {errors.firstName}
                        </Form.Control.Feedback>
                    )
                  }
                </Form.Group>
                <Form.Group
                  controlId="formBasiclastName"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="lastName"
                    style={{ borderRadius: "50px", padding: "15px" }}
                    // required
                    value={user.lastName}
                    onChange={onhandleChange}
                    isInvalid={!!errors.lastName}
                  />
                {
                    errors.lastName && (
                        <Form.Control.Feedback type="invalid" >
                            {errors.lastName}
                        </Form.Control.Feedback>
                    )
                  }
                </Form.Group>
                <Form.Group
                  controlId="formBasicphoneNumber"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Control
                    name="number"
                    type="number"
                    placeholder="PhoneNumber"
                    style={{ borderRadius: "50px", padding: "15px" }}
                    // required
                    onChange={onhandleChange}
                    value={user.number}
                    isInvalid={!!errors.number}
                  />
                {
                    errors.number && (
                        <Form.Control.Feedback type="invalid" >
                            {errors.number}
                        </Form.Control.Feedback>
                    )
                  }
                </Form.Group>
                <Form.Group
                  controlId="formBasicEmail"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    style={{ borderRadius: "50px", padding: "15px" }}
                    // required
                    onChange={onhandleChange}
                    value={user.email}
                    isInvalid={!!errors.email}
                  />
                {
                    errors.email && (
                        <Form.Control.Feedback type="invalid" >
                            {errors.email}
                        </Form.Control.Feedback>
                    )
                  }
                </Form.Group>
                <Form.Group
                  controlId="formBasicDob"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Control
                    type="date"
                    name="dob"
                    placeholder="select your dov"
                    style={{ borderRadius: "50px", padding: "15px" }}
                    // required
                    onChange={onhandleChange}
                    value={user.dob}
                    isInvalid={!!errors.dob}
                  />
                {
                    errors.dob && (
                        <Form.Control.Feedback type="invalid" >
                            {errors.dob}
                        </Form.Control.Feedback>
                    )
                  }
                </Form.Group>

                <Form.Group
                  controlId="formBasicFile"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Control
                    name="file"
                    type="file"
                    placeholder="File"
                    style={{ borderRadius: "50px", padding: "15px" }}
                    // required
                    onChange={onFileChange}
                    isInvalid={!!errors.file}
                  />
                {
                    errors.file && (    
                        <Form.Control.Feedback type="invalid" >
                            {errors.file}
                        </Form.Control.Feedback>
                    )
                  }
                </Form.Group>

                <Form.Group
                  controlId="formBasicCurrentPassword"
                  style={{ position: "relative", marginBottom: "30px" }}
                >
                  <Form.Control
                    name="cpassword"
                    type="password"
                    placeholder="Enter your password"
                    style={{ borderRadius: "50px", padding: "15px" }}
                    // required
                    value={user.cpassword}
                    onChange={onhandleChange}
                    isInvalid={!!errors.cpassword}
                  />
                {
                    errors.cpassword && (
                        <Form.Control.Feedback type="invalid"  >
                            {errors.cpassword}
                        </Form.Control.Feedback>
                    )
                  }
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
