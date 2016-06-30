Rails.application.routes.draw do
  root to: 'health#index'

  namespace :v1 do
    # omniauth
    post '/auth/:provider',      to: 'auth#authenticate'
    # knock token
    post '/auth_token' => 'user_token#create'

    get 'companies', to: 'companies#index'
    get 'companies/:id', to: 'companies#show'
    get 'multinationals', to: 'multinationals#index'
    get 'multinationals/:id', to: 'multinationals#show'
    get 'investors', to: 'investors#index'
    get 'investors/:id', to: 'investors#show'
    get 'hubs', to: 'hubs#index'
    get 'hubs/:id', to: 'hubs#show'

    resources :password_resets, only: [:new, :create, :edit, :update]

    # Administration Routes
    namespace :admin do
      resources :user_entity_claims, only: [:index, :update]
      resources :user_entity_pending, only: [:index, :update]

      resources :companies, only: [:create, :index, :show, :update, :destroy] do
        member do
          put :restore
        end
      end
      resources :multinationals, only: [:create, :index, :show, :update, :destroy] do
        member do
          put :restore
        end
      end
      resources :investors, only: [:create, :index, :show, :update, :destroy] do
        member do
          put :restore
        end
      end
      resources :hubs, only: [:create, :index, :show, :update, :destroy] do
        member do
          put :restore
        end
      end

      resources :users

      resources :tags, only: [:index]
    end

    resources :users, only: [:create, :show, :update] do
      member do
        put :verify_email
      end
    end

    namespace :user do
      resources :user_entity_claims, only: [:create, :update]

      resources :companies, only: [:create, :index, :show, :update, :destroy] do
        member do
          put :restore
          delete :remove_exec_summary
        end
      end
      resources :multinationals, only: [:create, :index, :show, :update, :destroy] do
        member do
          put :restore
        end
      end
      resources :investors, only: [:create, :index, :show, :update, :destroy] do
        member do
          put :restore
        end
      end
      resources :hubs, only: [:create, :index, :show, :update, :destroy] do
        member do
          put :restore
        end
      end
    end
  end
end
