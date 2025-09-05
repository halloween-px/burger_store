/// <reference types="cypress" />

const dataTransfer = new DataTransfer();

describe('тест функциональности страницы «Конструктор»', () => {
	beforeEach(() => {
		cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
			body: { success: true, user: { email: 'test@mail.ru', name: 'Igor' } },
		}).as('getUser');

		cy.intercept('GET', '**/api/ingredients*', {
			fixture: 'ingredients.json',
		}).as('getIngredients');

		cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
			fixture: 'order.json',
		}).as('createOrder');

		cy.viewport(1280, 800);
		cy.visit('/', {
			onBeforeLoad(win) {
				win.localStorage.setItem('refreshToken', 'test-refresh');
				win.localStorage.setItem('accessToken', 'test-access');
			},
		});

		cy.wait('@getIngredients');
	});

	it('страница должна открыться', () => {
		cy.get('body').should('exist');
	});

	it('собирает бургер с булкой, соусами и основными ингредиентами', () => {
		cy.wait('@getIngredients');

		cy.get('[data-cy="ingredient-bun"]').first().click();
		cy.get('[data-cy=modal]').should('be.visible');
		cy.get('[data-cy="ingredient-title"]').should('contain.text', 'Моя булочка Nimbus-3000');
		cy.get('[data-cy=close-modal]').click('topLeft');

		cy.get('[data-cy="ingredient-bun"]').first().trigger('dragstart', { dataTransfer });
		cy.get('[data-cy="bun-constructor"]')
			.first()
			.trigger('dragenter', { dataTransfer })
			.trigger('dragover', { dataTransfer })
			.trigger('drop', { dataTransfer })
			.trigger('dragend');

		cy.get('[data-cy="ingredient-sauce"]').first().trigger('dragstart', { dataTransfer });
		cy.get('[data-cy="burger-constructor"]')
			.trigger('dragenter', { dataTransfer })
			.trigger('dragover', { dataTransfer })
			.trigger('drop', { dataTransfer })
			.trigger('dragend');

		cy.get('[data-cy="ingredient-main"]').first().trigger('dragstart', { dataTransfer });
		cy.get('[data-cy="burger-constructor"]')
			.trigger('dragenter', { dataTransfer })
			.trigger('dragover', { dataTransfer })
			.trigger('drop', { dataTransfer })
			.trigger('dragend');

		cy.get('[data-cy=constructor-item]').should('have.length', 4);
		cy.get('[data-cy=constructor-item]').eq(0).should('have.attr', 'data-type', 'bun');
		cy.get('[data-cy=constructor-item]').eq(1).should('have.attr', 'data-type', 'sauce');
		cy.get('[data-cy=constructor-item]').eq(2).should('have.attr', 'data-type', 'main');
		cy.get('[data-cy=constructor-item]').eq(3).should('have.attr', 'data-type', 'bun');

		cy.get('[data-cy=total-price]')
			.find('span[itemProp="price"]')
			.should(($price) => {
				const total = parseInt($price.text().replace(/\s/g, ''));
				expect(total).to.eq(1769);
			});

		cy.get('[data-cy=place-order-btn]').click();

		cy.wait('@createOrder');
		cy.get('[data-cy=modal]').should('be.visible');
		cy.get('[data-cy=order-number]').should('contain.text', '87773');

		cy.get('[data-cy=close-modal]').click('topLeft');
		cy.get('[data-cy=order-modal]').should('not.exist');
		cy.get('[data-cy=constructor-item]').should('have.length', 0);
		cy.get('[data-cy=total-price]').find('span[itemProp="price"]').should('contain.text', '0');
	});
});
