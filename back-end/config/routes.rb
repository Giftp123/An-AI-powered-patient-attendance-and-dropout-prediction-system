Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  post "/login", to: "sessions#create"
  # root "posts#index"

  resources :staffs
  resources :admins

  post "/staff_login", to: "sessions#staff_login"
  post "/admin_login", to: "sessions#admin_login"
  delete "/logout", to: "sessions#logout"

  get "/whoami", to: "sessions#whoami"
  get "/current_staff", to: "sessions#current_staff_info"
  get "/current_admin", to: "sessions#current_admin_info"

  resources :patients do
    resources :appointments
    collection do
      post :bulk_create
    end
    member do
      post :predict
    end
  end

  resources :appointments do
    member do
      post :send_reminder
    end
  end
end