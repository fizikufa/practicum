/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types="cypress" />


import "@4tw/cypress-drag-drop";

describe("Работает DnD", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Cодержит заголовок Соберите бургер", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("Cписок ингредиентов содержит булки", () => {
    cy.get("[class^=burger-ingredients-item_name__]").first().as("firstBun");
    cy.get("@firstBun").contains("булка").should('exist');
    cy.get("[class^=burger-ingredients-item_name__]").eq(1).as("secondBun");
    cy.get("@secondBun").contains("булка").should('exist');
  });

  it("Работает DnD, замена, логин, отправка и подтверждение заказа", () => {
    cy.get("[class^=burger-ingredients-item_name__]").as("ingredient");
    cy.get("[class^=burger-constructor_element__list__]").as("elementList");  

    cy.get("@ingredient").eq(0).drag("@elementList");
    cy.get("@ingredient").eq(3).drag("@elementList");
    cy.get("@ingredient").eq(7).drag("@elementList");
    cy.get("@ingredient").eq(11).drag("@elementList");
    cy.get("@ingredient").eq(13).drag("@elementList");
    cy.get("@ingredient").eq(14).drag("@elementList");
    cy.get("@ingredient").eq(1).drag("@elementList");
  });

});