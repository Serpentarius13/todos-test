const TODO_TEXT = "Something";

const TODO_TEXT_SEC = `${TODO_TEXT}x2`;

describe("todos", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.dataCy("add-todo").find("input").type(TODO_TEXT);

    cy.dataCy("add-todo").find("button").click();

    cy.dataCy("add-todo").find("input").type(TODO_TEXT_SEC);

    cy.dataCy("add-todo").find("button").click();

    cy.dataCy("complete-todo").eq(1).click();
  });
  it("should be adding todo", () => {
    cy.dataCy("todo-item").find("p").eq(0).should("have.text", TODO_TEXT);
  });

  it("should be showing all todos", () => {
    cy.dataCy("todo-list").children("li").should("have.length", 2);
  });

  it("should be showing active todos", () => {
    cy.dataCy("active").click();
    cy.dataCy("todo-list")
      .children("li")
      .should("have.length", 1)
      .contains(TODO_TEXT)
      .should("exist");
  });

  it("should be showing inactive todos", () => {
    cy.dataCy("completed").click();
    cy.dataCy("todo-list")
      .children("li")
      .should("have.length", 1)
      .contains(TODO_TEXT_SEC)
      .should("exist");
  });

  it("should be removing finished todos", () => {
    cy.dataCy("clear-completed-todos").click();

    cy.dataCy("completed").click();

    cy.dataCy("todo-list").children("li").should("have.length", 0);
  });
});

export {};
