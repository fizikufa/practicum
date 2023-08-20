/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types="cypress" />
// @ts-check
import "@4tw/cypress-drag-drop";

describe("Работает конструктор заказа бургера", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Cодержит заголовок 'Соберите бургер'", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("Cодержит ингредиент, открывает и закрывает попап", () => {
    cy.get("[class^=burger-ingredients-item_item]").first().as("ingredient");
    cy.get("@ingredient").click();
    cy.get("[class^=modal_container__]").as("modal");
    cy.get("@modal").find("p").contains("Детали ингредиента");
    cy.get("@modal").find("svg").click();
  });

});