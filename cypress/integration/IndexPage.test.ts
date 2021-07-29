describe("The index page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Displays children", async () => {
    const layout = cy.findByTestId("layout");
    layout.should("exist");
    layout.should("contain.text", "Hello world");
  });
});
