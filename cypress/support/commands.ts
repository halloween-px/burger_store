/// <reference types="cypress" />

Cypress.Commands.add('prepareApp', () => {
	cy.intercept('GET', 'api/auth/user', {
		body: { success: true, user: { email: 'test@mail.ru', name: 'Igor' } },
	}).as('getUser');

	cy.intercept('GET', 'api/ingredients', {
		fixture: 'ingredients.json',
	}).as('getIngredients');

	cy.intercept('POST', 'api/orders', {
		fixture: 'order.json',
	}).as('createOrder');

	cy.viewport(1280, 800);
	cy.visit('/', {
		onBeforeLoad(win) {
			win.localStorage.setItem('refreshToken', 'test-refresh');
			win.localStorage.setItem('accessToken', 'test-access');
		},
	});
});

Cypress.Commands.add('initVariables', () => {
	cy.get('[data-cy="ingredient-bun"]').first().as('bun');
	cy.get('[data-cy="ingredient-sauce"]').first().as('sauce');
	cy.get('[data-cy="ingredient-main"]').first().as('main');
	cy.get('[data-cy="bun-constructor"]').first().as('bunConstructor');
	cy.get('[data-cy="burger-constructor"]').as('burgerConstructor');
	cy.get('[data-cy=total-price]').find('span[itemProp="price"]').as('totalPrice');
});

Cypress.Commands.add('dragAndDrop', (source, target) => {
	const dataTransfer = new DataTransfer();
	cy.get(source).trigger('dragstart', { dataTransfer });
	cy.get(target)
		.trigger('dragenter', { dataTransfer })
		.trigger('dragover', { dataTransfer })
		.trigger('drop', { dataTransfer })
		.trigger('dragend');
});

Cypress.Commands.add('openIngredientModal', (ingredientAlias) => {
	cy.get(ingredientAlias).click();
	cy.get('[data-cy=modal]').as('modal').should('be.visible');
	cy.get('[data-cy=close-modal]').as('closeModal');
});

Cypress.Commands.add('closeModal', () => {
	cy.get('@closeModal').click('topLeft');
	cy.get('@modal').should('not.exist');
});
