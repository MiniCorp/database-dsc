module V1
  module User
    class MultinationalsController < UserController
      def create
        multinational = Multinational.new(multinational_params)
        multinational.user_id = current_user.id
        multinational.save

        if multinational.persisted?
          user_entity_pending = UserEntityPending.create(
            user_id: current_user.id,
            entity_type: UserEntityPending.entity_types["multinational"],
            entity_id: multinational.id
          )
        end

        render json: multinational
      end

      def index
        respond_to do |format|
          format.html {
            # multinationals assign to the current user
            user_multinationals = multinationals.claimed_by_user(current_user).where(is_live: true)
            # multinationals awaiting action by admin
            # first get all multinationals where user assigned but not live (when user creates the profile)
            pending_multinationals = Multinational.where(user: current_user, is_live: false)
            # second get all multinationals where user NOT assigned but has made a claim that is pending (profile already existed)
            pending_multinationals = pending_multinationals + Multinational.where("id in (?)", UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['multinational']).pluck(:entity_id))

            render json: { user_multinationals: user_multinationals, pending_multinationals: pending_multinationals }
          }
          format.json {
            render json: Multinational.unclaimed
                                .select(:id, :name, :logo, :short_description, :website, :headquarters)
                                .where("name ILIKE ?", "#{params[:filter]}%").order(:name).limit(10)
                                .where.not("id in (?)", UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['multinational']).count > 0 ? UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['multinational']).pluck(:entity_id) : -1)
          }
          format.csv do
            send_data multinationals.to_csv
          end
        end
      end

      def show
        render json: multinational
      end

      def update
        multinational.update(multinational_params)
        render json: multinational
      end

      def destroy
        multinational.destroy
        render json: :nothing, status: 204
      end

      def restore
        Multinational.restore(params[:id])
      end

      private

      def multinational
        Multinational.where(user_id: current_user.id, id: params[:id]).first
      end

      def multinational_params
        params.require(:multinational).permit(
          :name,
          :logo,
          :allow_sharing,
          :startup_evangelist,
          :short_description,
          :long_description,
          :headquarters,
          :emea_hq,
          :functions,
          :events_space,
          :events_space_qualifier,
          :next_event,
          :employees,
          :local_office,
          :video_url,
          :website,
          :lat,
          :lng,
          :building_product_in_ireland,
          :events_space_qualifiers,
          :tags,
          :startup_packages,
          :custom_field_1, :custom_field_2, :custom_field_3, :custom_field_4,
          functions: [],
          startup_packages: [:name, :link, :description],
          social_accounts: [:twitter, :linkedin, :facebook],
          tags: []
        )
      end
    end
  end
end
