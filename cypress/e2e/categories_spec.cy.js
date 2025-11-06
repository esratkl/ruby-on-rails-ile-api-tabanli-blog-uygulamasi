describe('Categories API Testleri', () => {
  let testCategoryId;

  before(() => {
    // İlk endpoint sayfasını yükle
    cy.visit('/tests/categories_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(1000); // Sayfanın yüklenmesi için bekle
  });

  it('GET /categories → Tüm kategorileri listeler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/categories_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'GET',
      url: '/categories',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      cy.log('Response:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('POST /categories → Yeni kategori oluşturur', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/categories_post.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'POST',
      url: '/categories',
      body: { category: { name: 'Test Category' } },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq('Test Category');
      testCategoryId = response.body.id;
      cy.log('Created Category:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('GET /categories/:id → Tek bir kategoriyi gösterir', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/categories_get_id.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a category if we don't have one
    if (!testCategoryId) {
      cy.request({
        method: 'POST',
        url: '/categories',
        body: { category: { name: 'Test Category for Show' } },
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 201) {
          testCategoryId = response.body.id;
        }
      });
    }

    if (testCategoryId) {
      cy.request({
        method: 'GET',
        url: `/categories/${testCategoryId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('name');
        cy.log('Category Details:', JSON.stringify(response.body, null, 2));
      });
    }
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('PUT /categories/:id → Kategoriyi günceller', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/categories_put.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a category if we don't have one
    if (!testCategoryId) {
      cy.request({
        method: 'POST',
        url: '/categories',
        body: { category: { name: 'Original Category Name' } },
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 201) {
          testCategoryId = response.body.id;
        }
      });
    }

    if (testCategoryId) {
      cy.request({
        method: 'PUT',
        url: `/categories/${testCategoryId}`,
        body: { category: { name: 'Updated Category Name' } },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('Updated Category Name');
        cy.log('Updated Category:', JSON.stringify(response.body, null, 2));
      });
    }
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('DELETE /categories/:id → Kategoriyi siler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/categories_delete.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // Create a category specifically for deletion
    cy.request({
      method: 'POST',
      url: '/categories',
      body: { category: { name: 'Category to Delete' } },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        const deleteId = response.body.id;
        cy.request({
          method: 'DELETE',
          url: `/categories/${deleteId}`,
          failOnStatusCode: false
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204);
          cy.log('Category deleted successfully');
        });
      }
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });
});
