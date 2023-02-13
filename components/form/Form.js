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
import { useState, useMemo } from "react";

const Form = ({ isLogin, errorMessage, onSubmit }) => {
  const { isDark } = useTheme();
  const color = isDark ? "gradient" : "gradient";
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const closeHandler = () => {
    setVisible(false);
  };

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const validatePassword = (value) => {
    return value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
  };

  const validateRepeatPassword = (value) => {
    return (
      value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/) &&
      value === password
    );
  };

  const helper = useMemo(() => {
    if (!email)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(email);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [email]);

  const passwordhelper = useMemo(() => {
    if (!password)
      return {
        text: "",
        color: "",
      };
    const isValid = validatePassword(password);
    return {
      color: isValid ? "success" : "error",
    };
  }, [password, repeatPassword]);

  const repeatPasswordhelper = useMemo(() => {
    if (!repeatPassword)
      return {
        text: "",
        color: "",
      };
    const isValid = validateRepeatPassword(repeatPassword);
    return {
      color: isValid ? "success" : "error",
    };
  }, [repeatPassword, password]);

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
            aria-label="email"
            required
            clearable
            bordered
            fullWidth
            size="lg"
            placeholder="Email"
            name="username"
            contentLeft={<Mail fill="currentColor" />}
            status={helper.color}
            color={helper.color}
            helperColor={helper.color}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            aria-label="Password"
            required
            clearable
            bordered
            fullWidth
            size="lg"
            placeholder="Password"
            name="password"
            type="password"
            contentLeft={<Password fill="currentColor" />}
            status={passwordhelper.color}
            color={passwordhelper.color}
            helperColor={passwordhelper.color}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <>
              <Input.Password
                aria-label="Repeat Password"
                required
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Repeat Password"
                name="rpassword"
                type="password"
                contentLeft={<Password fill="currentColor" />}
                status={repeatPasswordhelper.color}
                color={repeatPasswordhelper.color}
                helperColor={repeatPasswordhelper.color}
                onChange={(e) => setRepeatPassword(e.target.value)}
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