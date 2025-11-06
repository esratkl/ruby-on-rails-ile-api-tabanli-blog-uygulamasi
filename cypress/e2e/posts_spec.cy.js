describe('Posts API Testleri', () => {
  let testUserId;
  let testCategoryId;
  let testPostId;

  before(() => {
    // İlk endpoint sayfasını yükle
    cy.visit('/tests/posts_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(1000); // Sayfanın yüklenmesi için bekle
    
    // Create a test user for posts
    cy.request({
      method: 'POST',
      url: '/users',
      body: { user: { name: 'Test User', email: 'testuser@example.com' } },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        testUserId = response.body.id;
      }
    });

    // Create a test category for posts
    cy.request({
      method: 'POST',
      url: '/categories',
      body: { category: { name: 'Test Category' } },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        testCategoryId = response.body.id;
      }
    });
  });

  it('GET /posts → Tüm postları listeler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/posts_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'GET',
      url: '/posts',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      cy.log('Response:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('POST /posts → Yeni post oluşturur', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/posts_post.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'POST',
      url: '/posts',
      body: {
        post: {
          title: 'Test Post Title',
          content: 'This is a test post content',
          user_id: testUserId,
          category_id: testCategoryId
        }
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.title).to.eq('Test Post Title');
      expect(response.body.content).to.eq('This is a test post content');
      testPostId = response.body.id;
      cy.log('Created Post:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('GET /posts/:id → Tek bir postu gösterir', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/posts_get_id.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a post if we don't have one
    if (!testPostId) {
      cy.request({
        method: 'POST',
        url: '/posts',
        body: {
          post: {
            title: 'Test Post for Show',
            content: 'Test content',
            user_id: testUserId,
            category_id: testCategoryId
          }
        },
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 201) {
          testPostId = response.body.id;
        }
      });
    }

    if (testPostId) {
      cy.request({
        method: 'GET',
        url: `/posts/${testPostId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('title');
        cy.log('Post Details:', JSON.stringify(response.body, null, 2));
      });
    }
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('PUT /posts/:id → Postu günceller', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/posts_put.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a post if we don't have one
    if (!testPostId) {
      cy.request({
        method: 'POST',
        url: '/posts',
        body: {
          post: {
            title: 'Original Title',
            content: 'Original content',
            user_id: testUserId,
            category_id: testCategoryId
          }
        },
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 201) {
          testPostId = response.body.id;
        }
      });
    }

    if (testPostId) {
      cy.request({
        method: 'PUT',
        url: `/posts/${testPostId}`,
        body: {
          post: {
            title: 'Updated Post Title',
            content: 'Updated content'
          }
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq('Updated Post Title');
        expect(response.body.content).to.eq('Updated content');
        cy.log('Updated Post:', JSON.stringify(response.body, null, 2));
      });
    }
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('DELETE /posts/:id → Postu siler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/posts_delete.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // Create a post specifically for deletion
    cy.request({
      method: 'POST',
      url: '/posts',
      body: {
        post: {
          title: 'Post to Delete',
          content: 'This will be deleted',
          user_id: testUserId,
          category_id: testCategoryId
        }
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        const deleteId = response.body.id;
        cy.request({
          method: 'DELETE',
          url: `/posts/${deleteId}`,
          failOnStatusCode: false
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204);
          cy.log('Post deleted successfully');
        });
      }
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  after(() => {
    // Cleanup: Delete test user and category if needed
    if (testUserId) {
      cy.request({ method: 'DELETE', url: `/users/${testUserId}`, failOnStatusCode: false });
    }
    if (testCategoryId) {
      cy.request({ method: 'DELETE', url: `/categories/${testCategoryId}`, failOnStatusCode: false });
    }
  });
});
