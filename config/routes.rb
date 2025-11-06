Rails.application.routes.draw do
  resources :users
  resources :categories
  resources :posts
  resources :comments
  resources :tags
  namespace :api do
    namespace :v1 do
      resources :users
    end
  end
end