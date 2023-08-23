/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types="cypress" />


import "@4tw/cypress-drag-drop";
import { burgerConstrucrorElementClass, burgerIngredientClass } from "../constants";


describe("Работает DnD", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("Cодержит заголовок Соберите бургер", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("Cписок ингредиентов содержит булки", () => {
    cy.get(burgerIngredientClass).first().as("firstBun");
    cy.get("@firstBun").contains("булка").should('exist');
    cy.get(burgerIngredientClass).eq(1).as("secondBun");
    cy.get("@secondBun").contains("булка").should('exist');
  });

  it("Работает DnD, замена, логин, отправка и подтверждение заказа", () => {
    cy.get(burgerIngredientClass).as("ingredient");
    cy.get(burgerConstrucrorElementClass).as("elementList");  

    cy.get("@ingredient").eq(0).drag("@elementList");
    cy.get("@ingredient").eq(3).drag("@elementList");
    cy.get("@ingredient").eq(7).drag("@elementList");
    cy.get("@ingredient").eq(11).drag("@elementList");
    cy.get("@ingredient").eq(13).drag("@elementList");
    cy.get("@ingredient").eq(14).drag("@elementList");
    cy.get("@ingredient").eq(1).drag("@elementList");
  });

});