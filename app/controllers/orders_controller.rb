class OrdersController < ApplicationController
    skip_before_action :authorize, only: :create

    def index
        user = find_user
        orders = user.orders
        render json: orders
    end

    def show
        user = find_user
        order = user.orders.find_by(id: params[:id])
        render json: order
    end

    def create
        user = find_user
        order = user.orders.create(order_params)
        if order.valid?
            render json: order, status: :created
        else
            render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
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
        show.update(show_params)
        render json: show, status: :created
    end

    private
    
    def order_params
        params.permit(:order_name)
    end

    def find_user
        User.find_by(id: session[:user_id])
    end
end
