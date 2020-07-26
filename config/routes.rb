Rails.application.routes.draw do
  root to: 'posts#index'
<<<<<<< Updated upstream
  post 'posts' , to: 'posts#create'
=======
  post 'posts', to: 'posts#create'
>>>>>>> Stashed changes
  get 'posts/:id', to: 'posts#checked'
end
