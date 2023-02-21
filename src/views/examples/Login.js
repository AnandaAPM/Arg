/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React,{ useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { login } from "../../network/API";


const Login = props => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");

  const tryLogin = async () => {
    const response = await login(email, password).catch((e)=>{
      setPassword("")
      setError(e.response.data.message)
      // console.log(e.response.data.message)
    })
    const { data } = response
    if (response.status === 200) {
      setError("")
      localStorage.setItem("id_token", data.message.id_token)
      localStorage.setItem("refresh_token", data.message.refresh_token)
      props.history.push("/");

    } 
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-0">
            <div className="text-muted text-center mt-0 mb-3">
              <large>SIGN IN</large>
            </div>

          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" autoComplete="email" value={email}
                    onChange={e => setEmail(e.target.value)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" autoComplete="password" value={password}
                    onChange={e => setPassword(e.target.value)} />
                </InputGroup>
              </FormGroup>
              {/*<div className="custom-control custom-control-alternative custom-checkbox">*/}
              {/*    <input*/}
              {/*        className="custom-control-input"*/}
              {/*        id=" customCheckLogin"*/}
              {/*        type="checkbox"*/}
              {/*    />*/}
              {/*    <label*/}
              {/*        className="custom-control-label"*/}
              {/*        htmlFor=" customCheckLogin"*/}
              {/*    >*/}
              {/*        <span className="text-muted">Remember me</span>*/}
              {/*    </label>*/}
              {/*</div>*/}
              {error ?
                <div className="text-muted font-italic">
                  <small>
                    error:{" "}
                    <span className="text-red font-weight-700">{error}</span>
                  </small>
                </div> : null}
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={tryLogin}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
