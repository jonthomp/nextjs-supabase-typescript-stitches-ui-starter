import Head from "next/head";
import { styled } from "../stitches.config";

const StyledLayout = styled("div", {
  minHeight: "100vh",
  padding: "0 $1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const StyledMain = styled("div", {
  padding: "$6 0",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const StyledFooter = styled("div", {
  width: "100%",
  height: 100,
  borderWidth: "$1",
  borderTop: "solid #eaeaea",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& img": {
    marginLeft: "$1",
  },
  "& a": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
});

export const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <StyledMain>{children}</StyledMain>

      <StyledFooter>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
        </a>
      </StyledFooter>
    </StyledLayout>
  );
};
