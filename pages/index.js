import * as React from "react";
import { Button, Input, Loading, Spacer, Text, Grid } from "@nextui-org/react";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout/Layout";
import Details from "../components/details";
import axios from "axios";
import { SSRProvider } from "react-bootstrap";

const Home = () => {
  const user = useUser({ redirectTo: "/login" });
  const [search, setSearch] = React.useState("");
  const [enable, setEnable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState("");
  const [inputState, setInputState] = React.useState("enabled");

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setEnable(false);
    setData({});
    setError(null);
  };

  const searchSite = async () => {
    console.log("searchData", search);
    if (search != "") {
      setEnable(false);
      setError(null);
      setData({});
      setLoading(true);
      setInputState("disabled");
      try {
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };

        let reqOptions = {
          url: `/api/crawler/${search.replace(/(^\w+:|^)\/\//, "")}`,
          method: "GET",
          headers: headersList,
        };

        let response = await axios.request(reqOptions);
        setData(response.data);
        setEnable(true);
      } catch (err) {
        setError(err.response.data.error);
      } finally {
        setLoading(false);
        setInputState("enabled");
      }
    } else {
      setError("Please enter a valid url");
    }
  };

  return (
    <SSRProvider>
      <Layout>
        {user && (
          <>
            <Spacer y={1} />
            <div>
              <Grid.Container justify="center" css={{ maxWidth: "100vw" }}>
                <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Input
                    readOnly={inputState === "disabled" ? true : false}
                    className="search"
                    width="100%"
                    placeholder="Enter a valid url"
                    clearable={inputState === "disabled" ? false : true}
                    color="warning"
                    onChange={searchHandler}
                    aria-label="search"
                    rounded
                    size="lg"
                  />
                </Grid>
                <Spacer x={0.5} />
                <Grid>
                  <Button
                    auto
                    color="gradient"
                    ghost
                    rounded
                    type="submit"
                    disabled={inputState === "disabled" ? true : false}
                    onPress={searchSite}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid.Container>
              {loading ? (
                <>
                  <Spacer y="5" />
                  <Loading type="points-opacity" size="xl" />
                </>
              ) : null}
              {error ? (
                <>
                  <Spacer y="2" />
                  <Text color="error" b>
                    Error : {error}
                  </Text>
                </>
              ) : null}
              {enable ? <Details site={search} data={data} /> : null}
            </div>
          </>
        )}
      </Layout>
    </SSRProvider>
  );
};

export default Home;