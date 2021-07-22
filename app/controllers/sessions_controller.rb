class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create

    #post login
    def create
        user = find_user
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end

    #delete logout
    def destroy
        session.delete :user_id
        head :no_content
    end

    private

    def find_user
        User.find_by(name: params[:name])
    end

end