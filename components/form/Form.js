import {
  Modal,
  Input,
  Row,
  Button,
  Text,
  Link,
  useTheme,
} from "@nextui-org/react";
import { Mail } from "../icons/Mail";
import { Password } from "../icons/Password";
import { Person } from "../icons/Person";
import { Discord } from "../icons/Discord";
import { useState } from "react";

const Form = ({ isLogin, errorMessage, onSubmit }) => {
  const { isDark } = useTheme();
  const color = isDark ? "gradient" : "gradient";
  const [visible, setVisible] = useState(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Modal
      preventClose
      blur
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18} b>
          Welcome
        </Text>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          {!isLogin && (
            <Input
              aria-label="Name"
              color={color}
              required
              clearable
              bordered
              fullWidth
              size="lg"
              placeholder="Name"
              name="name"
              contentLeft={<Person fill="currentColor" />}
            />
          )}

          <Input
            aria-label="Username"
            required
            clearable
            bordered
            fullWidth
            size="lg"
            placeholder="Username"
            name="email"
            contentLeft={<Mail fill="currentColor" />}
          />

          <Input.Password
            aria-label="Password"
            color={color}
            required
            clearable
            bordered
            fullWidth
            size="lg"
            placeholder="Password"
            name="password"
            type="password"
            contentLeft={<Password fill="currentColor" />}
          />

          {!isLogin && (
            <>
              <Input.Password
                aria-label="Repeat Password"
                color={color}
                required
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Repeat Password"
                name="rpassword"
                type="password"
                contentLeft={<Password fill="currentColor" />}
              />
              <Input
                aria-label="Discord UserID"
                color={color}
                required
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Discord UserID"
                name="discord"
                type="number"
                contentLeft={<Discord fill="currentColor" />}
              />
            </>
          )}

          {errorMessage && <Text color="error">{errorMessage}</Text>}
        </Modal.Body>
        <Modal.Footer>
          {isLogin ? (
            <>
              <Row justify="space-between">
                <Text block as={Link} href="/signup" color={color} size={14}>
                  don't have account ?
                </Text>
              </Row>
              <Button
                ghost
                auto
                flat
                color="error"
                as={Link}
                href="\"
                onPress={closeHandler}
              >
                Close
              </Button>
              <Button ghost auto type="submit" color={color}>
                Sign in
              </Button>
            </>
          ) : (
            <>
              <Row justify="space-between">
                <Text block as={Link} href="/login" color={color} size={14}>
                  Already have an account ?
                </Text>
              </Row>
              <Button
                ghost
                auto
                flat
                color="error"
                as={Link}
                href="/"
                onPress={closeHandler}
              >
                Close
              </Button>
              <Button ghost auto type="submit" color={color}>
                Signup
              </Button>
            </>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Form;
