module V1
  module User
    class HubsController < UserController
      def create
        hub = Hub.new(hub_params)
        hub.user_id = current_user.id
        hub.save

        if hub.persisted?
          user_entity_pending = UserEntityPending.create(
            user_id: current_user.id,
            entity_type: UserEntityPending.entity_types["hub"],
            entity_id: hub.id
          )
        end

        render json: hub
      end

      def index
        hubs = Hub.unclaimed_or_owned_by(current_user.id).with_deleted.order(:name)

        hubs.each {|hub| hub.current_user = current_user} if current_user

        respond_to do |format|
          format.html {
            render json: hubs
          }
          format.csv do
            send_data hubs.to_csv
          end
        end
      end

      def show
        render json: hub
      end

      def update
        hub.update(hub_params)
        render json: hub
      end

      def destroy
        hub.destroy
        render json: :nothing, status: 204
      end

      def restore
        Hub.restore(params[:id])
      end

      private

      def hub
        Hub.where(user_id: current_user.id, id: params[:id]).first
      end

      def hub_params
        params.require(:hub).permit(
          :name, :logo, :short_description, :long_description, :allow_sharing,
          :headquarters, :founded, { hub_type: [] }, :contact_urls,
          :contact, :contact_detail, :alumni, :tags,
          :address, { contact_urls: [:name, :email, :phone] }, { events: [] },
          { alumni: [:id, :name] }, :video_url, :website, :custom_field_1,
          :custom_field_2, :custom_field_3, :custom_field_4,
          { social_accounts: [:twitter, :linkedin, :facebook] },
          { tags: [] }, :funding_provided, :lat, :lng, :applications,
          { applications: [:title, :deadline, :link] }
        )
      end

    end
  end
end
