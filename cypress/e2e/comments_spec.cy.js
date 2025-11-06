describe('Comments API Testleri', () => {
  let testUserId;
  let testPostId;
  let testCommentId;

  before(() => {
    // İlk endpoint sayfasını yükle
    cy.visit('/tests/comments_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(1000); // Sayfanın yüklenmesi için bekle
    
    // Create a test user for comments
    cy.request({
      method: 'POST',
      url: '/users',
      body: { user: { name: 'Comment Test User', email: 'commentuser@example.com' } },
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
      body: { category: { name: 'Comment Test Category' } },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        const categoryId = response.body.id;
        // Create a test post for comments
        cy.request({
          method: 'POST',
          url: '/posts',
          body: {
            post: {
              title: 'Test Post for Comments',
              content: 'This post will have comments',
              user_id: testUserId,
              category_id: categoryId
            }
          },
          failOnStatusCode: false
        }).then((postResponse) => {
          if (postResponse.status === 201) {
            testPostId = postResponse.body.id;
          }
        });
      }
    });
  });

  it('GET /comments → Tüm yorumları listeler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/comments_get_all.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'GET',
      url: '/comments',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      cy.log('Response:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('POST /comments → Yeni yorum oluşturur', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/comments_post.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    cy.request({
      method: 'POST',
      url: '/comments',
      body: {
        comment: {
          body: 'This is a test comment',
          user_id: testUserId,
          post_id: testPostId
        }
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.body).to.eq('This is a test comment');
      expect(response.body.user_id).to.eq(testUserId);
      expect(response.body.post_id).to.eq(testPostId);
      testCommentId = response.body.id;
      cy.log('Created Comment:', JSON.stringify(response.body, null, 2));
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('GET /comments/:id → Tek bir yorumu gösterir', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/comments_get_id.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a comment if we don't have one
    if (!testCommentId) {
      cy.request({
        method: 'POST',
        url: '/comments',
        body: {
          comment: {
            body: 'Test comment for show',
            user_id: testUserId,
            post_id: testPostId
          }
        },
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 201) {
          testCommentId = response.body.id;
        }
      });
    }

    if (testCommentId) {
      cy.request({
        method: 'GET',
        url: `/comments/${testCommentId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('body');
        cy.log('Comment Details:', JSON.stringify(response.body, null, 2));
      });
    }
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('PUT /comments/:id → Yorumu günceller', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/comments_put.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // First create a comment if we don't have one
    if (!testCommentId) {
      cy.request({
        method: 'POST',
        url: '/comments',
        body: {
          comment: {
            body: 'Original comment',
            user_id: testUserId,
            post_id: testPostId
          }
        },
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 201) {
          testCommentId = response.body.id;
        }
      });
    }

    if (testCommentId) {
      cy.request({
        method: 'PUT',
        url: `/comments/${testCommentId}`,
        body: {
          comment: {
            body: 'Updated comment text'
          }
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.body).to.eq('Updated comment text');
        cy.log('Updated Comment:', JSON.stringify(response.body, null, 2));
      });
    }
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  it('DELETE /comments/:id → Yorumu siler', () => {
    // Bu endpoint için özel sayfayı ziyaret et
    cy.visit('/tests/comments_delete.html', { failOnStatusCode: false, timeout: 10000 });
    cy.wait(800); // Görsel efektler için bekleme
    // Create a comment specifically for deletion
    cy.request({
      method: 'POST',
      url: '/comments',
      body: {
        comment: {
          body: 'Comment to Delete',
          user_id: testUserId,
          post_id: testPostId
        }
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        const deleteId = response.body.id;
        cy.request({
          method: 'DELETE',
          url: `/comments/${deleteId}`,
          failOnStatusCode: false
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204);
          cy.log('Comment deleted successfully');
        });
      }
    });
    cy.wait(500); // Görsel arayüzün görünür kalması için bekleme
  });

  after(() => {
    // Cleanup: Delete test resources if needed
    if (testPostId) {
      cy.request({ method: 'DELETE', url: `/posts/${testPostId}`, failOnStatusCode: false });
    }
    if (testUserId) {
      cy.request({ method: 'DELETE', url: `/users/${testUserId}`, failOnStatusCode: false });
    }
  });
});
