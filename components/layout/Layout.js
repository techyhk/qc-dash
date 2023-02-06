import Head from "next/head";
import { NavBar } from "../navBar/NavBar";
import { Box } from "./Box.js";
import { Container, Spacer } from "@nextui-org/react";
import { WrapperLayout } from './layout.styles';
import { SSRProvider } from 'react-bootstrap';

const Layout = (props) => (
  <SSRProvider>
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Box
        css={{
          maxW: "100%",
        }}
      >
        <WrapperLayout>
          <Container fluid responsive>
            <NavBar dashboard={props.navDashboard} home={props.navHome} />
            <div align="center">
              {props.children}
            </div>
          </Container>
        </WrapperLayout>
        <Spacer y={4} />
      </Box>
    </>
  </SSRProvider>
);

export default Layout;