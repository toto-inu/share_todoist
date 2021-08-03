import styles from "./index.module.scss";
import { LoginButton } from "~/components/atoms/LoginButton/index";
import { Button } from 'react-bootstrap';
import { Nav, Container, Row, Col } from 'react-bootstrap';

import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div className={styles.Header}>
      <div className={styles.Header__wrapper}>
        <Container>
          <Row>
            <Col xs={1}></Col>
            <Col xs={5}>
              <Nav className="justify-content-start" activeKey="/home">
                <Nav.Item>
                  <Nav.Link href="/">Top</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/app">App</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xs={5}>
              <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                  {!isAuthenticated ? (
                    <Button
                      variant="outline-light"
                      size="lg"
                      onClick={loginWithRedirect}
                    >ログイン</Button>
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

export default Header;
