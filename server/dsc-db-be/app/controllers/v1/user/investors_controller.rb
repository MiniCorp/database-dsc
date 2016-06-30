module V1
  module User
    class InvestorsController < UserController
      def create
        investor = Investor.new(investor_params)
        investor.user_id = current_user.id
        investor.save

        if investor.persisted?
          user_entity_pending = UserEntityPending.create(
            user_id: current_user.id,
            entity_type: UserEntityPending.entity_types["investor"],
            entity_id: investor.id
          )
        end

        render json: investor
      end

      def index
        respond_to do |format|
          format.html {
            if params[:typeahead] && params[:filter]
              investors = Investor.live(true).select(:id, :name).where("name ILIKE ?", "%#{params[:filter]}%").order(:name)
              render json: investors
            else
              # investors assign to the current user
              user_investors = Investor.claimed_by_user(current_user).where(is_live: true)
              # investors awaiting action by admin
              # first get all investors where user assigned but not live (when user creates the profile)
              pending_investors = Investor.where(user: current_user, is_live: false)
              # second get all investors where user NOT assigned but has made a claim that is pending (profile already existed)
              pending_investors = pending_investors + Investor.where("id in (?)", UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['investor']).pluck(:entity_id))

              render json: { user_investors: user_investors, pending_investors: pending_investors }
            end
          }
          format.json {
            render json: Investor.unclaimed
                                .select(:id, :name, :logo, :short_description, :website, :headquarters)
                                .where("name ILIKE ?", "#{params[:filter]}%").order(:name).limit(10)
                                .where.not("id in (?)", UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['investor']).count > 0 ? UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['investor']).pluck(:entity_id) : -1)
          }
          format.csv do
            send_data investors.to_csv
          end
        end
      end

      def show
        render json: investor
      end

      def update
        investor.update(investor_params)
        render json: investor
      end

      def destroy
        investor.destroy
        render json: :nothing, status: 204
      end

      def restore
        Investor.restore(params[:id])
      end

      private

      def investor
        Investor.where(user_id: current_user.id, id: params[:id]).first
      end

      def investor_params
        params.require(:investor).permit(
          :name, :logo, :short_description, :long_description, :video_url, :allow_sharing,
          :exits_ipos, :headquarters, :founded, :local_office,
          :funds_raised, { funding_types: [] }, :investment_size, :regions, :office_locations,
          { office_locations: [:id, :address, :lat, :lng] }, :contact, :contact_email, :preferred_contact,
          :co_investors, :similar_investors, :similar_investors, :founders,
          { founders: [:name, :linkedin] }, :video_url, :website, :tags,
          :custom_field_1, :custom_field_2, :custom_field_3, :custom_field_4,
          { social_accounts: [:twitter, :linkedin, :facebook] },
          { tags: [] }, :deal_structure, :companies_invested_in, { companies_invested_in: [:id, :name] }
        )
      end

    end
  end
end
