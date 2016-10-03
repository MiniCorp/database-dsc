module V1
  module Admin
    class UserEntityPendingController < AdminController
      def index
        user_entities_pending = UserEntityPending.all
        render json: user_entities_pending
      end

      def update
        user_entities_pending = UserEntityPending.find(params[:id])

        case params[:status]
        when 'approved'
          user_entities_pending.approve_profile!
        when 'denied'
          user_entities_pending.deny_profile!
        end
      end
    end
  end
end
