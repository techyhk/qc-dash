import * as React from "react";
import {
  useTheme,
  Image,
  Spacer,
  Text,
  Link,
  Button,
  Modal,
  Loading,
  Grid,
  Badge,
  Card,
} from "@nextui-org/react";
import { useUser } from "../lib/hooks";
import { SecurityIcon } from "../public/icon/securityIcon";
import { Chart as ChartJS, registerables, scales } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(...registerables);

const buttonCss = {
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
};

const chartData = {
  labels: [],
  datasets: [
    {
      label: "Total Visits",
      data: [],
      backgroundColor: [
        "rgb(47, 105, 253)",
        "rgb(47, 105, 253)",
        "rgb(47, 105, 253)",
      ],
      borderWidth: 1,
      maxBarThickness: 60,
      borderRadius: 10,
    },
  ],
};

const chartOptions = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  maintainAspectRatio: false,
};

const trafficSourcesData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "#1dcdf6",
        "#fc3771",
        "#c24dfc",
        "#feb72b",
        "#d2dce8",
        "#195afe",
      ],
      hoverBackgroundColor: [
        "#1dcdf6",
        "#fc3771",
        "#c24dfc",
        "#feb72b",
        "#d2dce8",
        "#195afe",
      ],
    },
  ],
};

const TopCountrySharesData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "#1dcdf6",
        "#fc3771",
        "#c24dfc",
        "#feb72b",
        "#d2dce8",
        "#195afe",
      ],
      hoverBackgroundColor: [
        "#1dcdf6",
        "#fc3771",
        "#c24dfc",
        "#feb72b",
        "#d2dce8",
        "#195afe",
      ],
    },
  ],
};

const similarWebCountryData = {
  356: "India",
  840: "United States",
  124: "Canada",
  392: "Japan",
  156: "China",
  276: "Germany",
  250: "France",
  380: "Italy",
  826: "United Kingdom",
  554: "New Zealand",
  528: "Netherlands",
  702: "Singapore",
  36: "Australia",
  458: "Malaysia",
  410: "South Korea",
  344: "Hong Kong",
  446: "Macau",
  840: "United States",
  682: "Saudi Arabia",
  784: "United Arab Emirates",
  704: "Vietnam",
  643: "Russia",
  50: "Bangladesh",
  752: "Sweden",
  76: "Brazil",
  634: "Qatar",
  414: "Kuwait",
  616: "Poland",
  40: "Austria",
  203: "Czech Republic",
  208: "Denmark",
  233: "Estonia",
  246: "Finland",
  250: "France",
  276: "Germany",
  300: "Greece",
  348: "Hungary",
  352: "Iceland",
  372: "Ireland",
  380: "Italy",
  428: "Latvia",
  440: "Lithuania",
  442: "Luxembourg",
  528: "Netherlands",
  578: "Norway",
  616: "Poland",
  620: "Portugal",
  642: "Romania",
  703: "Slovakia",
  705: "Slovenia",
  724: "Spain",
  752: "Sweden",
  756: "Switzerland",
  710: "South Africa",
  404: "Kenya",
  894: "Zambia",
  818: "Egypt",
  566: "Nigeria",
  144: "Sri Lanka",
  170: "Colombia",
  484: "Mexico",
  604: "Peru",
  591: "Panama",
  764: "Thailand",
  118: "Cambodia",
  188: "Costa Rica",
  32: "Argentina",
  104: "Myanmar",
  360: "Indonesia",
};

const Details = (props) => {
  const user = useUser();
  const [screenshotModalIsOpen, setScreenshotModalIsOpen] =
    React.useState(false);
  const [screenshotData, setScreenshotData] = React.useState(null);
  const pageViews = ((props.data.similarWebData?.Engagments?.PagePerVisit *
    props.data.similarWebData?.Engagments?.Visits));

  let domain = props.site.replace(/(^\w+:|^)\/\//, "").replace("www.", "");
  domain = domain.split(".")[0];

  let totalCountryShares = 0;

  const screenshot = {
    homePage: {
      url: `${props.data.homepageUrl}`,
      desktopScreenShot: `${domain}/homepage.png`,
      mobileScreenShot: `${domain}/homepage_mobile.png`,
    },
    category: {
      url: `${props.data.categoryUrl}`,
      desktopScreenShot: `${domain}/category.png`,
      mobileScreenShot: `${domain}/category_mobile.png`,
    },
    article: {
      url: `${props.data.articleUrl}`,
      desktopScreenShot: `${domain}/article.png`,
      mobileScreenShot: `${domain}/article_mobile.png`,
    },
  };

  function secondsToMinutes(seconds) {
    const hour = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${hour} hr ${minutes} m ${secondsLeft} s`;
  }

  function ConvertDate(date) {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    switch (month) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
    }
  }
  chartData.labels = [];
  chartData.datasets[0].data = [];
  trafficSourcesData.labels = [];
  trafficSourcesData.datasets[0].data = [];
  TopCountrySharesData.labels = [];
  TopCountrySharesData.datasets[0].data = [];

  function securiStatus(status) {
    switch (status) {
      case "minimal":
        return "success";
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "error";
      case "critical":
        return "error";
    }
  }

  return (
    <>
      {Object.keys(props.data.similarWebData.EstimatedMonthlyVisits).forEach(
        (key) => {
          chartData.labels.push(ConvertDate(key));
          chartData.datasets[0].data.push(
            props.data.similarWebData.EstimatedMonthlyVisits[key]
          );
        }
      )}
      {Object.keys(props.data.similarWebData.TrafficSources).forEach((key) => {
        trafficSourcesData.labels.push(key);
        trafficSourcesData.datasets[0].data.push(
          props.data.similarWebData.TrafficSources[key] * 100
        );
      })}
      {Object.keys(props.data.similarWebData.TopCountryShares).forEach(
        (key) => {
          TopCountrySharesData.labels.push(
            similarWebCountryData[
            props.data.similarWebData.TopCountryShares[key].Country
            ]
          );
          TopCountrySharesData.datasets[0].data.push(
            props.data.similarWebData.TopCountryShares[key].Value * 100
          );
          totalCountryShares =
            totalCountryShares +
            props.data.similarWebData.TopCountryShares[key].Value * 100;
        }
      )}
      <Spacer y={1.5} />
      <Badge
        variant="flat"
        size="lg"
        color={securiStatus(props.data.securiData)}
        content={
          <>
            <SecurityIcon />
            {(
              props.data.securiData.charAt(0).toUpperCase() +
              props.data.securiData.slice(1)
            ).replace(/_/g, " ")}
          </>
        }
      >
        <Text
          h2
          css={{
            textGradient: "45deg, #4ee1ff -20.3%, #0037f5 70.46%",
            paddingTop: "0.5rem",
          }}
          weight="bold"
        >
          Website : {props.data.similarWebData.SiteName}
        </Text>
      </Badge>
      <Spacer y={1} />
      <Card isHoverable css={{ mw: "1200px", p: "$10" }}>
        <Text h4>Traffic & Engagement Last Month</Text>
        <Grid.Container gap={5} justify="center">
          <Grid>
            <Text size={15}>
              Tier
              <br />
              <Text b size={20}>
                {pageViews > 2500000
                  ? "Tier 1"
                  : pageViews > 500000 &&
                    pageViews < 2500000
                    ? "Tier 2"
                    : "Tier 3"}
              </Text>
            </Text>
          </Grid>
          <Grid>
            <Text size={15}>
              Bounce Rate
              <br />
              <Text b size={20}>
                {(
                  props.data.similarWebData?.Engagments?.BounceRate * 100
                ).toFixed(2)}{" "}
                %
              </Text>
            </Text>
          </Grid>
          <Grid>
            <Text size={15}>
              Page Views
              <br />
              <Text b size={20}>
                {(pageViews / 1000000).toFixed(3)} M
              </Text>
            </Text>
          </Grid>
          {/*           <Grid>
            <Text size={15}>
              Page Per Visit
              <br />
              <Text b size={20}>
                {(
                  props.data.similarWebData?.Engagments?.PagePerVisit * 1
                ).toFixed(2)}
              </Text>
            </Text>
          </Grid>
          <Grid>
            <Text size={15}>
              Visits
              <br />
              <Text b size={20}>
                {(
                  props.data.similarWebData?.Engagments?.Visits / 1000000
                ).toFixed(2)}{" "}
                M
              </Text>
            </Text>
          </Grid> */}
          <Grid>
            <Text size={15}>
              Last Month Change
              <br />
              <Text b size={20}>
                {(
                  ((Object.values(
                    props.data.similarWebData.EstimatedMonthlyVisits
                  )[
                    Object.values(
                      props.data.similarWebData.EstimatedMonthlyVisits
                    ).length - 1
                  ] -
                    Object.values(
                      props.data.similarWebData.EstimatedMonthlyVisits
                    )[
                    Object.values(
                      props.data.similarWebData.EstimatedMonthlyVisits
                    ).length - 2
                    ]) /
                    Object.values(
                      props.data.similarWebData.EstimatedMonthlyVisits
                    )[
                    Object.values(
                      props.data.similarWebData.EstimatedMonthlyVisits
                    ).length - 2
                    ]) *
                  100
                ).toFixed(2)}{" "}
                %
              </Text>
            </Text>
          </Grid>
          <Grid>
            <Text size={15}>
              Avg Visit Duration
              <br />
              <Text b size={20}>
                {secondsToMinutes(
                  Math.round(props.data.similarWebData?.Engagments?.TimeOnSite)
                )}{" "}
              </Text>
            </Text>
          </Grid>
        </Grid.Container>

        <Grid.Container gap={1} justify="space-evenly">
          <Grid>
            <Text h4>Traffic Sources</Text>
            <Pie data={trafficSourcesData} width={300} height={300} />
          </Grid>
          <Grid>
            <Text h4>Total Visits Last 3 Months</Text>
            <div>
              <Bar
                data={chartData}
                width={300}
                height={300}
                options={chartOptions}
              />
            </div>
          </Grid>
          <Grid>
            <Text h4>Geography & Country Targeting</Text>
            {totalCountryShares < 100
              ? (TopCountrySharesData.labels.push("Others"),
                TopCountrySharesData.datasets[0].data.push(
                  100 - totalCountryShares
                ))
              : null}
            <Pie data={TopCountrySharesData} width={300} height={300} />
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          {Object.keys(props.data.socialLinks).map((url) => {
            return (
              <Grid key={url}>
                <Link href={props.data.socialLinks[url]} target="_blank">
                  <img
                    src={`/social/${url}.svg`}
                    alt={url}
                    width={30}
                    height={"auto"}
                  />
                </Link>
              </Grid>
            );
          })}
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          <Grid>
            <Text>
              Privacy Policy :{" "}
              {props.data.privacyPolicy.includes("No") ? (
                <Text color="error">{props.data.privacyPolicy}</Text>
              ) : (
                <Link href={props.data.privacyPolicy} target="_blank">
                  {props.data.privacyPolicy}
                </Link>
              )}
            </Text>
          </Grid>
          <Grid>
            <Text>
              Terms and conditions :{" "}
              {props.data.termsAndConditions.includes("No") ? (
                <Text color="error">{props.data.termsAndConditions}</Text>
              ) : (
                <Link href={props.data.termsAndConditions} target="_blank">
                  {props.data.termsAndConditions}
                </Link>
              )}
            </Text>
          </Grid>
          <Spacer y={1} />
        </Grid.Container>
      </Card>

      <Spacer y={1} />
      <Card isHoverable css={{ mw: "1200px", p: "$10" }}>
        <Text h3>Page Screenshots</Text>
        <Grid.Container gap={2} justify="center">
          {Object.keys(screenshot).map((key) => {
            return (
              <div key={key}>
                {screenshot[key].url != "Not Found" ? (
                  <Grid key={key}>
                    <Text b size={15}>
                      {key.toUpperCase()} :{" "}
                      <Link href={screenshot[key].url} target="_blank">
                        Go to Link
                      </Link>
                    </Text>
                    <Spacer y="1" />
                    <Text>Desktop</Text>
                    <Button
                      auto
                      type
                      css={buttonCss}
                      onPress={() => {
                        setScreenshotData(null);
                        setScreenshotModalIsOpen(true);
                        setScreenshotData(screenshot[key].desktopScreenShot);
                      }}
                    >
                      View Screenshot
                    </Button>
                    <Spacer y="1" />
                    <Text>Mobile</Text>
                    <Button
                      auto
                      css={buttonCss}
                      onPress={() => {
                        setScreenshotData(null);
                        setScreenshotModalIsOpen(true);
                        setScreenshotData(screenshot[key].mobileScreenShot);
                      }}
                    >
                      View Screenshot
                    </Button>
                  </Grid>
                ) : null}
              </div>
            );
          })}
        </Grid.Container>
      </Card>

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
  return `http://${process.env.HOSTNAME}:8000/${src}`;
};

export default Details;