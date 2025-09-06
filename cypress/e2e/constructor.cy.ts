/// <reference types="cypress" />

describe('тест функциональности страницы «Конструктор»', () => {
	beforeEach(() => {
		cy.prepareApp();
		cy.initVariables();
	});

	it('страница должна открыться', () => {
		cy.get('body').should('exist');
	});

	it('собирает бургер с булкой, соусами и основными ингредиентами', () => {
		cy.wait('@getIngredients');

		cy.openIngredientModal('@bun');
		cy.get('[data-cy="ingredient-title"]').should('contain.text', 'Моя булочка Nimbus-3000');
		cy.closeModal();

		cy.dragAndDrop('@bun', '@bunConstructor');
		cy.dragAndDrop('@sauce', '@burgerConstructor');
		cy.dragAndDrop('@main', '@burgerConstructor');

		cy.get('[data-cy=constructor-item]').as('constructorItems');
		cy.get('@constructorItems').should('have.length', 4);
		cy.get('@constructorItems').eq(0).should('have.attr', 'data-type', 'bun');
		cy.get('@constructorItems').eq(1).should('have.attr', 'data-type', 'sauce');
		cy.get('@constructorItems').eq(2).should('have.attr', 'data-type', 'main');
		cy.get('@constructorItems').eq(3).should('have.attr', 'data-type', 'bun');

		cy.get('@totalPrice').should(($price) => {
			const total = parseInt($price.text().replace(/\s/g, ''));
			expect(total).to.eq(1769);
		});

		cy.get('[data-cy=place-order-btn]').as('placeOrderBtn').click();
		cy.wait('@createOrder');

		cy.get('@modal').should('be.visible');
		cy.get('[data-cy=order-number]').should('contain.text', '87773');

		cy.closeModal();
		cy.get('@constructorItems').should('have.length', 0);
		cy.get('@totalPrice').should('contain.text', '0');
	});
});
