/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types="cypress" />
// @ts-check
import "@4tw/cypress-drag-drop";

describe("Работает конструктор заказа бургера", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("содержит заголовок Соберите бургер", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("содержит ингредиент, открывает и закрывает попап", () => {
    cy.get("[class^=burger-ingredients-item_name__]").first().as("ingredient");
    cy.get("@ingredient").click();
    cy.get("[class^=modal_container__]").as("modal");
    cy.get("@modal").find("p").contains("Детали ингредиента");
    cy.get("@modal").find("svg").click();
  });

  it("список ингредиентов содержит булки", () => {
    cy.get("[class^=burger-ingredients-item_name__]").first().as("firstBun");
    cy.get("@firstBun").contains("булка").should('exist');
    cy.get("[class^=burger-ingredients-item_name__]").eq(1).as("secondBun");
    cy.get("@secondBun").contains("булка").should('exist');
  });

  it("Кнопка заказа не активна, если конструктор пуст", () => {
    cy.get("p").contains("Добавьте ингредиенты");
    cy.get('[id^=orderButton]').should('not.exist');
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
    cy.get("[class^=burger-constructor_containerTotal]").should('exist');
    cy.get("@ingredient").eq(1).drag("@elementList");
    cy.get("button").contains("Оформить заказ").click();
    cy.get("form").find("h1").contains("Вход");
    cy.get('input[type="email"]').type("fizikufa@gmail.com").should("have.value", "fizikufa@gmail.com");
    cy.get('input[type="password"]').type("555555").should("have.value", "555555");
    cy.get("form").find("button").contains("Войти").as("loginBtn");
    cy.get("@loginBtn").click();
    cy.get("button").contains("Оформить заказ").click();
    cy.get("[class^=modal_container__]", { timeout: 40000 }).as("modal");
    cy.get("@modal").find("p").contains("Ваш заказ начали готовить");    
    cy.get("@modal").find('[id^=closeSvg]').click();
  });

});