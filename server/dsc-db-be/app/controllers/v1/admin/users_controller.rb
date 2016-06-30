module V1
  module Admin
    class UsersController < AdminController

      def index
        users = ::User.all

        respond_to do |format|
          format.html {
            render json: users.as_json
          }
          format.csv do
            send_data users.to_csv
          end
        end
      end

      private

      def user_params
        params.require(:hub).permit(
          :first_name, :last_name, :created_at
        )
      end

    end
  end
end
