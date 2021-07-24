import Head from "next/head";
import { Layout } from "../components/Layout";
import { styled } from "../stitches.config";
import { serverSidePropsHandler } from "../lib/utils/serverSidePropsHandler";

const Title = styled("h1", {
  margin: 0,
  lineHeight: "$1",
  fontSize: "$4",
  textAlign: "center",
  "& a": {
    color: "$primary",
    textDecoration: "none",
    "&:hover, &:focus, &:active": {
      textDecoration: "underline",
    },
  },
});

const Description = styled("p", {
  lineHeight: "$2",
  fontSize: "$3",
  textAlign: "center",
});

const Grid = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  maxWidth: "800px",
  marginTop: "$5",
  "@sm": {
    width: "100%",
    flexDirection: "column",
  },
});

const Card = styled("a", {
  margin: "$3",
  flexBasis: "45%",
  padding: "$4",
  textAlign: "left",
  color: "inherit",
  textDecoration: "none",
  border: "solid #eaeaea",
  borderWidth: "$1",
  borderRadius: "$2",
  transition: "color 0.15s ease, border-color 0.15s ease",
  "&:hover, &:focus, &:active": {
    color: "$primary",
    borderColor: "$primary",
  },
  "& h3": {
    margin: "0 0 $3 0",
    fontSize: "$3",
  },
  "& p": {
    margin: 0,
    fontSize: "$2",
    lineHeight: "$2",
  },
});

const Code = styled("code", {
  background: "#fafafa",
  borderRadius: "$1",
  padding: "$2",
  fontSize: "$1",
  fontFamily: "$mono",
});

function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <Title>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </Title>

      <Description>
        Get started by editing <Code>pages/index.js</Code>
      </Description>

      <Grid>
        <Card href="https://nextjs.org/docs">
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </Card>

        <Card href="https://nextjs.org/learn">
          <h3>Learn &rarr;</h3>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </Card>

        <Card href="https://github.com/vercel/next.js/tree/master/examples">
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </Card>

        <Card href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
          <h3>Deploy &rarr;</h3>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </Card>
      </Grid>
    </>
  );
}

// eslint-disable-next-line react/display-name
Home.getLayout = page => <Layout>{page}</Layout>;

export default Home;

export async function getServerSideProps(ctx) {
  return serverSidePropsHandler({ ctx, redirect: "none" });
}
