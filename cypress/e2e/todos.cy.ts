const TODO_TEXT = "Something";

describe("todos", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.dataCy("add-todo").find("input").type(TODO_TEXT);

    cy.dataCy("add-todo").find("button").click();
  });
  it("should be adding todo", () => {
    cy.dataCy("todo-item").find("p").should("have.text", TODO_TEXT);
  });

  it("should be completing and uncompleting todos", () => {
    cy.dataCy("complete-todo").click();

    cy.dataCy("todo-item").get('p').should("have.class", "line-through");

    cy.dataCy("complete-todo").click();

    cy.dataCy("todo-item").get('p').should("not.have.class", "line-through");
  });

  it("should be removing todos", () => {
    cy.dataCy("remove-todo").click();

    cy.dataCy("todo-item").should("not.exist");
  });
});
