import * as React from "react";
import { Button, Input, Loading, Spacer, Text } from "@nextui-org/react";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout/Layout";
import Details from "../components/details";
import axios from "axios";

let socialUrls = {};

const Home = () => {
  const user = useUser();
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

  return (
    <Layout>
      <Spacer y={4} />
      <div css={{ maxHeight: "100vh" }}>
        <Input
          readOnly={inputState === "disabled" ? true : false}
          className="search"
          width="50%"
          labelPlaceholder="Search"
          clearable={inputState === "disabled" ? false : true}
          bordered
          color="warning"
          onChange={searchHandler}
          value={search}
          aria-label="Search"
        />
        <Spacer y={0.5} />
        <Button
          onPress={async () => {
            console.log("searchData", search);
            setEnable(false);
            setError(null);
            setData({});
            setLoading(true);
            setInputState("disabled");
            try {
              socialUrls = await axios.post(`/api/pptr`, {
                url: search,
              });
              setData(socialUrls.data);
              setEnable(true);
            } catch (err) {
              setError(err.response.data.error);
            } finally {
              setLoading(false);
              setInputState("enabled");
            }
          }}
        >
          Search
        </Button>

        {loading ? <Spacer y="5"><Loading type="points-opacity" size="xl" /><Text>Fetching Data....</Text></Spacer> : null}
        {error ? <Text>{error}</Text> : null}
        {enable ? (
          <Details
            site={search}
            data={data}
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default Home;