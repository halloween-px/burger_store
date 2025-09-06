/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Cypress {
	interface Chainable {
		prepareApp(): Chainable<void>;
		initVariables(): Chainable<void>;
		dragAndDrop(source: string, target: string): Chainable<void>;
		openIngredientModal(ingredientAlias: string): Chainable<void>;
		closeModal(): Chainable<void>;
	}
}
