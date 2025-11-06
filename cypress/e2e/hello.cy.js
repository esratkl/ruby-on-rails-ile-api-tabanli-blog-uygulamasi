describe('Hello Utils Test', () => {
  before(() => {
    // Sayfayı ziyaret et (görsel arayüz için)
    cy.visit('/tests/hello.html', { failOnStatusCode: false, timeout: 10000 });

    // Sayfanın tamamen yüklendiğinden emin ol
    cy.get('body', { timeout: 10000 }).should('be.visible');
    cy.wait(1000); // Görsel efektler için kısa bekleme
  });

  it('should display Hello Utils Test title', () => {
    // Başlık görünür mü kontrol et
    cy.get('body').should('be.visible');
    cy.get('h2', { timeout: 5000 })
      .should('be.visible')
      .and('contain.text', 'Hello Utils Test');
    cy.wait(300); // Görsel okunabilirlik için kısa bekleme
  });
});
