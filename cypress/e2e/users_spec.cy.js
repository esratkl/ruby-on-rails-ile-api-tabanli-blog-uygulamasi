describe('Users API Testleri', () => {
  before(() => {
    // İlk endpoint sayfasını yükle (opsiyonel - genel sayfa yerine)
    cy.visit('/tests/users_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(1000); // Sayfanın yüklenmesi için bekle
  });

  it('GET /users → Tüm kullanıcıları listeler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/users_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'GET',
      url: '/users',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      cy.log('Response:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('POST /users → Yeni kullanıcı oluşturur', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/users_post.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'POST',
      url: '/users',
      body: { user: { name: 'Esra Test', email: 'esra@example.com' } },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq('Esra Test');
      expect(response.body.email).to.eq('esra@example.com');
      cy.log('Created User:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('GET /users/:id → Tek bir kullanıcıyı gösterir', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/users_get_id.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a user
    cy.request({
      method: 'POST',
      url: '/users',
      body: { user: { name: 'Test User', email: 'testuser@example.com' } },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        const userId = response.body.id;
        cy.request({
          method: 'GET',
          url: `/users/${userId}`,
          failOnStatusCode: false
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(200);
          expect(getResponse.body).to.have.property('id');
          expect(getResponse.body).to.have.property('name');
          cy.log('User Details:', JSON.stringify(getResponse.body, null, 2));
        });
      }
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('PUT /users/:id → Kullanıcıyı günceller', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/users_put.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a user
    cy.request({
      method: 'POST',
      url: '/users',
      body: { user: { name: 'Original Name', email: 'original@example.com' } },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        const userId = response.body.id;
        cy.request({
          method: 'PUT',
          url: `/users/${userId}`,
          body: { user: { name: 'Updated Name', email: 'updated@example.com' } },
          failOnStatusCode: false
        }).then((updateResponse) => {
          expect(updateResponse.status).to.eq(200);
          expect(updateResponse.body.name).to.eq('Updated Name');
          expect(updateResponse.body.email).to.eq('updated@example.com');
          cy.log('Updated User:', JSON.stringify(updateResponse.body, null, 2));
        });
      }
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('DELETE /users/:id → Kullanıcıyı siler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/users_delete.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // Önce bir kullanıcı oluştur
    cy.request({
      method: 'POST',
      url: '/users',
      body: { user: { name: 'Silinecek', email: 'delete@example.com' } },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        const id = response.body.id;
        cy.request({
          method: 'DELETE',
          url: `/users/${id}`,
          failOnStatusCode: false
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204);
          cy.log('User deleted successfully');
        });
      }
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });
});
