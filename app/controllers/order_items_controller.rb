class OrderItemsController < ApplicationController
    skip_before_action :authorize

    def index
        user = find_user
        if params[:order_id]
            order = user.orders.last
            order_items = order.order_items
        else
            order_items = OrderItem.all
        end
        render json: order_items
    end

    def show
        user = find_user
        order_item = user.orders.last.order_items.find_by(id: params[:id])
        render json: order_item
    end

    def create
        user = find_user
        order = user.orders.last
        byebug
        order_item = order.order_items.create(order_item_params)
        if order_item.valid?
            render json: order_item, status: :created
        else
            render json: { errors: order_item.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        user = find_user
        order = user.orders.find_by(id: params[:id])
        order.delete
        head :no_content
    end

    def update
        user = find_user
        order = user.orders.find_by(id: params[:id])
        order.update(order_params)
        render json: order, status: :created
    end

    private
    
    def order_item_params
        params.permit(:quantity, :item_id, :order_id)
    end



    def find_user
        User.find_by(id: session[:user_id])
    end
end
