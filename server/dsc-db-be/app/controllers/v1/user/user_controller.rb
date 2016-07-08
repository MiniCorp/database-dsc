module V1
  module User
    class UserController < ApplicationController
      before_action :authenticate_user
      before_action :is_user

      def is_user
        if current_user.user_type != "user"
          render json: :nothing, status: 401
          return
        end
      end
    end
  end
end
