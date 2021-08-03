Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :items
  resources :orders do
    resources :order_items
  end

  get "/last", to: "orders#last"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
end
