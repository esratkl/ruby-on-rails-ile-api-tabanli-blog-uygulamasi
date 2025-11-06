describe('Tags API Testleri', () => {
  let testTagId;

  before(() => {
    // İlk endpoint sayfasını yükle
    cy.visit('/tests/tags_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(1000); // Sayfanın yüklenmesi için bekle
  });

  it('GET /tags → Tüm etiketleri listeler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/tags_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'GET',
      url: '/tags',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      cy.log('Response:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('POST /tags → Yeni etiket oluşturur', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/tags_post.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'POST',
      url: '/tags',
      body: { tag: { name: 'Test Tag' } },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq('Test Tag');
      testTagId = response.body.id;
      cy.log('Created Tag:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('GET /tags/:id → Tek bir etiketi gösterir', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/tags_get_id.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a tag if we don't have one
    if (!testTagId) {
      cy.request({
        method: 'POST',
        url: '/tags',
        body: { tag: { name: 'Test Tag for Show' } },
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 201) {
          testTagId = response.body.id;
        }
      });
    }

    if (testTagId) {
      cy.request({
        method: 'GET',
        url: `/tags/${testTagId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('name');
        cy.log('Tag Details:', JSON.stringify(response.body, null, 2));
      });
    }
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('PUT /tags/:id → Etiketi günceller', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/tags_put.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a tag if we don't have one
    if (!testTagId) {
      cy.request({
        method: 'POST',
        url: '/tags',
        body: { tag: { name: 'Original Tag Name' } },
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 201) {
          testTagId = response.body.id;
        }
      });
    }

    if (testTagId) {
      cy.request({
        method: 'PUT',
        url: `/tags/${testTagId}`,
        body: { tag: { name: 'Updated Tag Name' } },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('Updated Tag Name');
        cy.log('Updated Tag:', JSON.stringify(response.body, null, 2));
      });
    }
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('DELETE /tags/:id → Etiketi siler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/tags_delete.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // Create a tag specifically for deletion
    cy.request({
      method: 'POST',
      url: '/tags',
      body: { tag: { name: 'Tag to Delete' } },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        const deleteId = response.body.id;
        cy.request({
          method: 'DELETE',
          url: `/tags/${deleteId}`,
          failOnStatusCode: false
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204);
          cy.log('Tag deleted successfully');
        });
      }
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });
});
