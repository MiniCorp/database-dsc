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

        respond_to do |format|
          format.html {
            if params[:typeahead] && params[:filter]
              hubs = Hub.where("name ILIKE ?", "%#{params[:filter]}%")
              render json: hubs.pluck(:name)
            else
              # hubs assign to the current user
              user_hubs = Hub.claimed_by_user(current_user).where(is_live: true)
              # hubs awaiting action by admin
              # first get all hubs where user assigned but not live (when user creates the profile)
              pending_hubs = Hub.where(user: current_user, is_live: false)
              # second get all hubs where user NOT assigned but has made a claim that is pending (profile already existed)
              pending_hubs = pending_hubs + Hub.where("id in (?)", UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['hub']).pluck(:entity_id))

              render json: { user_hubs: user_hubs, pending_hubs: pending_hubs }
            end
          }
          format.json {
            render json: Hub.unclaimed
                                .select(:id, :name, :logo, :short_description, :website)
                                .where("name ILIKE ?", "#{params[:filter]}%").order(:name).limit(10)
                                .where.not("id in (?)", UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['hub']).count > 0 ? UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['hub']).pluck(:entity_id) : -1)
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
