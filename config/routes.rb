Rails.application.routes.draw do
  resources :users
  resources :categories
  resources :posts
  resources :comments
  resources :tags
end
