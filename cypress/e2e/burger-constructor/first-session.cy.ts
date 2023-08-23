/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types="cypress" />
// @ts-check
import "@4tw/cypress-drag-drop";
import { burgerConstrucrorElementClass, burgerIngredientClass } from "../constants";

describe("Работает DnD", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("содержит заголовок Соберите бургер и ингредиенты", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("Cписок ингредиентов содержит булки", () => {
    cy.get(burgerIngredientClass).first().as("firstBun");
    cy.get("@firstBun").contains("булка").should('exist');
    cy.get(burgerIngredientClass).eq(1).as("secondBun");
    cy.get("@secondBun").contains("булка").should('exist');
  });

  it("Кнопка заказа не активна, если конструктор пуст", () => {
    cy.get("p").contains("Добавьте ингредиенты");
    cy.get('[id^=orderButton]').should('not.exist');;
  });

 it("Работает DnD, замена, появляется тотал и кнопка", () => {
    cy.get("[class^=burger-ingredients-item_item]").as("ingredient");
    cy.get(burgerConstrucrorElementClass).as("elementList"); 
    cy.get("@ingredient").eq(0).drag("@elementList");
    cy.get("@ingredient").eq(3).drag("@elementList");
    cy.get("@ingredient").eq(11).drag("@elementList");
    cy.get("@ingredient").eq(14).drag("@elementList");
    cy.get("[class^=burger-constructor_containerTotal]").should('exist');
    cy.get("@ingredient").eq(1).drag("@elementList");
    cy.get("button").contains("Оформить заказ").should('exist');
  });

});