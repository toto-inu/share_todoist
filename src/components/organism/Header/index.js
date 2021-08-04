import styles from "./index.module.scss";
import { LoginButton } from "~/components/atoms/LoginButton/index";
import { Button } from 'react-bootstrap';
import { Nav, Container, Row, Col } from 'react-bootstrap';

import { useAuth0 } from "@auth0/auth0-react";
import { withRouter } from 'react-router';

function Header(props) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div className={styles.Header}>
      <div className={styles.Header__wrapper}>
        <Container>
          <Row lg>
            <Col xs={1}></Col>
            <Col xs={5}>
              <Nav fill variant="tabs" className="justify-content-start">
                <Nav.Item>
                  <Nav.Link eventKey="top" onClick={()=>{props.history.push("/")}}>Top</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="app" onClick={()=>{props.history.push("/app")}}>App</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xs={5}>
              <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                  {!isAuthenticated ? (
                    <>
                      <Button
                        variant="outline-light"
                        size="lg"
                        onClick={loginWithRedirect}
                      >ログイン</Button>
                      <Button
                        variant="outline-light"
                        size="lg"
                        onClick={() => {
                          logout({ returnTo: window.location.origin });
                        }}
                      >ログアウト</Button>
                    </>
                  ) : (
                    <Button
                      variant="outline-light"
                      size="lg"
                      onClick={() => {
                        logout({ returnTo: window.location.origin });
                      }}
                    >ログアウト</Button>
                  )}
                  
                </Nav.Item>
              </Nav>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default withRouter(Header);
