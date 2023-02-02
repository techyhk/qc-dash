import Head from "next/head";
import { NavBar } from "../navBar/NavBar";
import { Box } from "./Box.js";
import { Container } from "@nextui-org/react";
import { WrapperLayout } from './layout.styles';

const Layout = (props) => (
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
    </Box>
  </>
);

export default Layout;