import { render, screen, cleanup } from "@testing-library/react";
import { Layout } from "./Layout";

afterEach(cleanup);

describe("<Layout />", () => {
  it("Renders the default Layout with children", () => {
    const { asFragment } = render(<Layout>Hello world</Layout>);

    expect(screen.getByTestId("layout")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
