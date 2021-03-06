Rails.application.routes.draw do
  devise_for :admins, controllers: { registrations: 'registrations'}

  resources :whats_ons

  get 'is_updated/:date' => 'services#is_updated'
  get 'get_attachments_that_has_loaded_after/:date' => 'services#get_attachments_that_has_loaded_after'
  get 'get_database' => 'services#get_database'
  get 'publish_db' => 'services#publish_db'

  get 'whats_ons/:id/destroy' => 'whats_ons#destroy', :as => 'destroy_whats_on'

  resources :hotspots
  get 'hotspots/list/:category' => 'hotspots#list', :as => 'list_hotspots'
  get 'hotspots/:category/new' => 'hotspots#new', :as => 'hotspots_new'
  get 'hotspots/:id/destroy' => 'hotspots#destroy', :as => 'destroy_hotspot'
  delete 'hotspots/:id' => 'hotspots#destroy'

  get 'hotspots/:id/crop' => 'catalog#crop'



  root :to => 'hotspots#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
