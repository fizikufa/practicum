/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types="cypress" />
// @ts-check
import "@4tw/cypress-drag-drop";
import { burgerIngredientClass, modalContainerClass } from "../constants";

describe("Работает конструктор заказа бургера", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Cодержит заголовок 'Соберите бургер'", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("Cодержит ингредиент, открывает и закрывает попап", () => {
    cy.get(burgerIngredientClass).first().as("ingredient");
    cy.get("@ingredient").click();
    cy.get(modalContainerClass).as("modal");
    cy.get("@modal").find("p").contains("Детали ингредиента");
    cy.get("@modal").find("svg").click();
  });

});