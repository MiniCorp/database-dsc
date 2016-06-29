module V1
  module Admin
    class AdminController < ApplicationController
      before_action :authenticate_user
      before_action :is_user_admin

      def is_user_admin
        if current_user.user_type != "admin"
          render json: :nothing, status: 401
          return
        end
      end
    end
  end
end
