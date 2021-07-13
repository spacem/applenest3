import { getHeader } from '../support/app.po';

describe('apple-nest-3', () => {
  beforeEach(() => cy.visit('/'));

  it('should display title', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getHeader().contains('Apple Nest');
  });
});
