class ItemsController < ApplicationController
    skip_before_action :authorize

    def index
        render json: Item.all
    end

    def show
        item = Item.find_by(id: params[:id])
        render json: item
    end

    def create
        item = Item.create(item_params)
        if item.valid?
            render json: item, status: :created
        else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        item = Item.find_by(id: params[:id])
        item.update(item_params)
        render json: item, status: :created
    end

    def destroy 
        item = Item.find_by(id: params[:id])
        item.delete
        head :no_content
    end
    
    private
    
    def item_params
        params.permit(:name, :price, :category, :description, :options, :image)
    end

    def find_user
        User.find_by(id: session[:user_id])
    end
    
end
