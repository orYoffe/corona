/// <reference types="cypress" />

context('Window', () => {
  it('cy.document() - get the document object', () => {
    cy.visit('http://localhost:3000/corona');
    // https://on.cypress.io/document
    cy.document()
      .should('have.property', 'charset')
      .and('eq', 'UTF-8');
  });

  it('cy.title() - get the title', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'Corona count');
  });

  it('Link renders', () => {
    cy.get('a[href="https://github.com/CSSEGISandData/COVID-19"]').contains(
      'COVID-19 data provided by Johns Hopkins CSSE',
    );
  });
  it('Map renders ', () => {
    cy.get('.leaflet-container');
    cy.get('a.leaflet-control-zoom-in').click();
    cy.get('a.leaflet-control-zoom-out').click();
  });
  it('search works', () => {
    cy.get('a[href="/corona/country/US"]').should('exist');
    cy.get('input').type('israel');
    cy.get('a[href="/corona/country/Israel"]').find(
      'img[alt="Set Country as a favourite"]',
    );
    cy.get('a[href="/corona/country/US"]').should('not.exist');
    cy.get('a[href="/corona/country/Israel"]').click();
    cy.url().should('eq', 'http://localhost:3000/corona/country/Israel');
    cy.get('.r-borderBottomColor-10bl8iw > .r-fontSize-ubezar').contains(
      'Israel',
    );
  });
});
