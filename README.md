# 🚀 Blog API (Ruby on Rails)

Ruby on Rails kullanılarak geliştirilmiş **API tabanlı blog uygulaması**.  
Amaç, **User, Post, Comment, Category, Tag** modelleri arasında CRUD işlemlerini gerçekleştirmek ve backend testlerini otomatikleştirmektir.

---

## 🌟 Özellikler
- 👤 Kullanıcı yönetimi (User)
- 📝 Gönderi oluşturma, güncelleme, silme (Post)
- 💬 Yorum ekleme (Comment)
- 🗂️ Kategorilendirme (Category)
- 🏷️ Etiketleme (Tag)
- ⚙️ JSON formatında API yanıtları
- 🎥 Cypress testleri + otomatik demo videoları

---

## 🧠 Teknolojiler
| Teknoloji | Açıklama |
|------------|-----------|
| **Ruby 3.x** | Programlama dili |
| **Rails 7 (API-only)** | Framework |
| **PostgreSQL** | Veritabanı |
| **ActiveRecord** | ORM katmanı |
| **Cypress** | Test aracı |

---

## ⚡ API Endpointleri (Örnek)

| Model | Endpoint | İşlem |
|--------|-----------|--------|
| **User** | `/users` | Listele, ekle, güncelle, sil |
| **Post** | `/posts` | Listele, ekle, güncelle, sil |
| **Comment** | `/comments` | Listele, ekle, güncelle, sil |
| **Category** | `/categories` | Listele, ekle, güncelle, sil |
| **Tag** | `/tags` | Listele, ekle, güncelle, sil |

---

## 🧪 Testler
Cypress ile tüm modeller için testler oluşturulmuştur:

📁 `users_spec.cy.js`  
📁 `posts_spec.cy.js`  
📁 `comments_spec.cy.js`  
📁 `categories_spec.cy.js`  
📁 `tags_spec.cy.js`  

Her test:
- GET / POST / PUT / DELETE işlemlerini test eder  
- Görsel arayüz oluşturur  
- Başarılı testleri **video olarak kaydeder**

---
