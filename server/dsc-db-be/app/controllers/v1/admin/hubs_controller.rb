module V1
  module Admin
    class HubsController < AdminController
      def create
        hub = Hub.create(hub_params)
        hub.update_attributes(is_live: true)

        render json: hub
      end

      def index

        if params[:filter].present?
          hubs = Hub.where("name ILIKE ?", "%#{params[:filter]}%")
          render json: hubs.pluck(:name)
        else
          hubs = Hub.with_deleted.order(:name)

          respond_to do |format|
            format.html {
              render json: hubs
            }
            format.csv do
              send_data hubs.to_csv
            end
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
        Hub.find(params[:id])
      end

      def hub_params
        params.require(:hub).permit(
          :name, :logo, :short_description, :long_description,
          :headquarters, :founded, { hub_type: [] }, :contact_urls,
          :applications, { applications: [:title, :deadline, :link] },
          :contact, :contact_detail, :alumni, :tags, :address,
          { contact_urls: [:name, :email, :phone] }, { events: [] },
          { alumni: [:id, :name] }, :video_url, :website, :custom_field_1,
          :custom_field_2, :custom_field_3, :custom_field_4,
          { social_accounts: [:twitter, :linkedin, :facebook] },
          { tags: [] }, :funding_provided, :lat, :lng
        )
      end

    end
  end
end
