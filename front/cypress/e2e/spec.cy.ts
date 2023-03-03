describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Gérer efficacement votre stock');
    cy.get('footer').contains('Mentions Légales');
    cy.get('main').get('a').contains('Voir le stock').click();
    cy.contains('Liste des articles');
    cy.get('nav').get('a[title="Ajouter"]').click();
    cy.contains("Ajout d'un article");
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const testname = `o${id}`;
    cy.get('input').first().type(testname);
    cy.get('input').eq(1).clear().type('45');
    cy.get('input').eq(2).clear().type('32');
    cy.get('button').contains('Ajouter').click();
    cy.get('tbody').get('tr').contains(testname).click();
    cy.get('button[title="Supprimer"').click();
    cy.get('tr').contains(testname).should('not.exist');
  });
});
