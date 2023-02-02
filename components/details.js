import * as React from "react";
import {
  Image,
  Spacer,
  Text,
  Link,
  Button,
  Modal,
  Loading,
  Grid,
} from "@nextui-org/react";
import { useUser } from "../lib/hooks";

const Details = (props) => {
  const user = useUser();
  const [screenshotModalIsOpen, setScreenshotModalIsOpen] = React.useState(false);
  const [screenshotData, setScreenshotData] = React.useState(null);
  let domain = (props.site).replace(/(^\w+:|^)\/\//, '').replace("www.", '');
  domain = domain.split(".")[0];

  return (
    <>
      <Spacer y={2} />
      <Text h1> Website :{props.site}</Text>
      <Spacer y={1.5} />
      {console.log(props.data)}
      <Grid.Container gap={2} justify="center">
        <Grid>
          <Text b size={15}>
            HomePage :{" "}
            <Link href={props.data.homepageUrl} target="_blank">
              Go to Link
            </Link>
          </Text>
          <Spacer y="1" />
          <Button
            auto
            css={{
              borderRadius: "$xl", // radii.xs
              border: "$space$1 solid transparent",
              background: "$blue100", // colors.pink800
              color: "$blue900",
              height: "$12", // space[12]
              boxShadow: "$md", // shadows.md
              "&:hover": {
                background: "$blue500",
                color: "$blue900",
              },
              "&:active": {
                background: "$blue200",
              },
              "&:focus": {
                borderColor: "$blue400",
              },
            }}
            onPress={() => {
              setScreenshotData(null);
              setScreenshotModalIsOpen(true);
              setScreenshotData(`${domain}/homepage.png`);
            }}
          >
            View Screenshot
          </Button>
        </Grid>
        {props.data.categoryUrl != "Not Found" ? (
          <Grid>
            <Text b size={15}>
              Category :{" "}
              <Link href={props.data.categoryUrl} target="_blank">
                Go to Link
              </Link>
            </Text>
            <Spacer y="1" />
            <Button
              auto
              css={{
                borderRadius: "$xl", // radii.xs
                border: "$space$1 solid transparent",
                background: "$blue100", // colors.pink800
                color: "$blue900",
                height: "$12", // space[12]
                boxShadow: "$md", // shadows.md
                "&:hover": {
                  background: "$blue500",
                  color: "$blue900",
                },
                "&:active": {
                  background: "$blue200",
                },
                "&:focus": {
                  borderColor: "$blue400",
                },
              }}
              onPress={() => {
                setScreenshotData(null);
                setScreenshotModalIsOpen(true);
                setScreenshotData(`${domain}/category.png`);
              }}
            >
              View Screenshot
            </Button>
          </Grid>) : null}
        {props.data.categoryUrl != "Not Found" ? (
          <Grid>
            <Text b size={15} css={{}}>
              Article :{" "}
              <Link href={props.data.articleUrl} target="_blank">
                Go to Link
              </Link>
            </Text>
            <Spacer y="1" />
            <Button
              auto
              css={{
                borderRadius: "$xl", // radii.xs
                border: "$space$1 solid transparent",
                background: "$blue100", // colors.pink800
                color: "$blue900",
                height: "$12", // space[12]
                boxShadow: "$md", // shadows.md
                "&:hover": {
                  background: "$blue500",
                  color: "$blue900",
                },
                "&:active": {
                  background: "$blue200",
                },
                "&:focus": {
                  borderColor: "$blue400",
                },
              }}
              onPress={() => {
                setScreenshotData(null);
                setScreenshotModalIsOpen(true);
                setScreenshotData(`${domain}/article.png`);
              }}
            >
              View Screenshot
            </Button>
          </Grid>) : null}
      </Grid.Container>
      <Spacer y={1.5} />
      <div>
        <Text css={{ alignContent: "flex-start" }}>
          Privacy Policy :
          <Link href={props.data.privacyPolicy} target="_blank">
            {props.data.privacyPolicy}
          </Link>
        </Text>
        <Text>
          Terms and conditions :
          <Link href={props.data.termsAndConditions} target="_blank">
            {props.data.termsAndConditions}
          </Link>
        </Text>
        <Spacer y={1} />
        {Object.keys(props.data.socialLinks).map((url) => {
          return (
            <Text key={url}>
              {url} :
              <Link href={props.data.socialLinks[url]} target="_blank">
                {props.data.socialLinks[url]}
              </Link>
            </Text>
          );
        })}
      </div>

      <Modal
        autoMargin
        closeButton
        width="800px"
        animated={true}
        aria-labelledby="Screenshot"
        open={screenshotModalIsOpen}
        onClose={() => setScreenshotModalIsOpen(false)}
        blur
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Screenshot
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          {!screenshotData ? (
            <Loading type="points" color="default" size={"xl"} />
          ) : (
            <Image src={myLoader(screenshotData)} alt="screenshot of page" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            ghost
            auto
            flat
            color="error"
            onPress={() => setScreenshotModalIsOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const myLoader = (src) => {
  console.log(src);
  return `http://127.0.0.1:8000/${src}`;
};

export default Details;