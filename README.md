# 🚀 Blog API

Bu proje, **Ruby on Rails** kullanılarak geliştirilmiş bir **API-only blog uygulamasıdır**.
Amaç, **5 model (User, Post, Comment, Category, Tag)** arasındaki ilişkileri yönetmek, CRUD işlemleri gerçekleştirmek ve **backend geliştirme becerilerini güçlendirmektir.**

---

## 🌟 Özellikler

* 👤 Kullanıcılar (User) oluşturabilir ve yönetebilir
* 📝 Yazılar (Post) ekleyebilir, güncelleyebilir ve silebilir
* 💬 Yazılara yorum (Comment) yapabilir
* 🗂️ Yazıları kategorilere (Category) ve etiketlere (Tag) atayabilir
* ⚙️ Tüm işlemler JSON formatında API aracılığıyla gerçekleştirilebilir

---

## 🧠 Kullanılan Teknolojiler

| Teknoloji                      | Açıklama                   |
| ------------------------------ | -------------------------- |
| **Ruby 3.x**                   | Programlama dili           |
| **Ruby on Rails 7 (API-only)** | Web framework              |
| **PostgreSQL**                 | Veritabanı yönetim sistemi |
| **ActiveRecord**               | ORM katmanı                |
| **Postman / cURL**             | API test araçları          |

---

## ⚡ API Modelleri

* `User` → Kullanıcı bilgilerini yönetir
* `Post` → Yazıların başlık ve içeriklerini tutar
* `Comment` → Yazılara yapılan yorumları temsil eder
* `Category` → Yazıların ait olduğu kategorileri belirler
* `Tag` → Yazılara etiketleme özelliği kazandırır

---

## 📦 Kurulum

```bash
# Projeyi klonla
git clone https://github.com/kullaniciadi/blog_api.git
cd blog_api

# Gerekli gem'leri yükle
bundle install

# Veritabanını oluştur
rails db:create db:migrate

# Sunucuyu başlat
rails s
