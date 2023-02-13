import * as React from "react";
import { Button, Input, Loading, Spacer, Text } from "@nextui-org/react";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout/Layout";
import Details from "../components/details";
import axios from "axios";
import { SSRProvider } from "react-bootstrap";

let socialUrls = {};

const Home = () => {
  const user = useUser({ redirectTo: "/login" });
  const [search, setSearch] = React.useState("");
  const [enable, setEnable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState("");
  const [inputState, setInputState] = React.useState("enabled");
  const [similarWebData, setSimilarWebData] = React.useState(null);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setEnable(false);
    setData({});
    setError(null);
  };

  return (
    <SSRProvider>
      <Layout>
        {user && (
          <>
            <div>
              <Text b h2>
                Enter Website
              </Text>
              <div css={{ maxHeight: "100vh" }}>
                <Input
                  readOnly={inputState === "disabled" ? true : false}
                  className="search"
                  width="50%"
                  placeholder="Search"
                  clearable={inputState === "disabled" ? false : true}
                  color="warning"
                  onChange={searchHandler}
                  value={search}
                  aria-label="Search"
                  rounded
                  size="lg"
                />
                <Spacer y={0.5} />
                <Button
                  auto
                  color="gradient"
                  ghost
                  rounded
                  disabled={inputState === "disabled" ? true : false}
                  onPress={async () => {
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
                  }}
                >
                  Search
                </Button>

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
            </div>
          </>
        )}
      </Layout>
    </SSRProvider>
  );
};

export default Home;