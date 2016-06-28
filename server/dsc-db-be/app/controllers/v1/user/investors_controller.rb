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

        if params[:filter].present?
          investors = Investor.unclaimed_or_owned_by(current_user.id).select(:id, :name).where("name ILIKE ?", "%#{params[:filter]}%").order(:name)
        else
          investors = Investor.unclaimed_or_owned_by(current_user.id).with_deleted.order(:name)
        end

        investors.each {|investor| investor.current_user = current_user} if current_user

        respond_to do |format|
          format.html {
            render json: investors
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
          :name, :logo, :short_description, :long_description, :video_url,
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
