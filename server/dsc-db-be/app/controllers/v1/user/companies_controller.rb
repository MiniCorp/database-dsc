module V1
  module User
    class CompaniesController < UserController
      def create
        company = Company.new(company_params)
        company.user_id = current_user.id
        company.save

        if company.persisted?
          user_entity_pending = UserEntityPending.create(
            user_id: current_user.id,
            entity_type: UserEntityPending.entity_types["company"],
            entity_id: company.id
          )
        end

        render json: company
      end

      def index
        respond_to do |format|
          format.html {
            if params[:typeahead] && params[:filter]
              companies = Company.live(true).select(:id, :name).where("name ILIKE ?", "%#{params[:filter]}%").order(:name)
              render json: companies
            else
              # companies assign to the current user
              user_companies = Company.claimed_by_user(current_user).where(is_live: true)
              # companies awaiting action by admin
              # first get all companies where user assigned but not live (when user creates the profile)
              pending_companies = Company.where(user: current_user, is_live: false)
              # second get all companies where user NOT assigned but has made a claim that is pending (profile already existed)
              pending_companies = pending_companies + Company.where("id in (?)", UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['company']).pluck(:entity_id))

              render json: { user_companies: user_companies, pending_companies: pending_companies }
            end
          }
          format.json {
            render json: Company.unclaimed
                                .select(:id, :name, :logo, :short_description, :website, :headquarters)
                                .where("name ILIKE ?", "#{params[:filter]}%").order(:name).limit(10)
                                .where.not("id in (?)", UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['company']).count > 0 ? UserEntityClaim.where(user_id: current_user.id, entity_type: UserEntityClaim.entity_types['company']).pluck(:entity_id) : -1)
          }
        end
      end

      def export
        companies = Company.with_deleted.order(:name)

        ee = EntityExport.create(
          user_id: current_user.id,
          csv_file: StringIO.new(PublicCompany.to_csv(PublicCompany.all)),
          csv_file_file_name: "companies_#{current_user.id}_#{Time.current.to_i}.csv",
          entity_type: 'company'
        )

        UserMailer.export_ready_notification(ee).deliver_now

        render nothing: true, status: 200
      end

      def show
        render json: company
      end

      def update
        company.update(company_params)
        render json: company
      end

      def remove_exec_summary
        company.update_attributes(exec_summary: nil)
      end

      private

      def company
        Company.where(user_id: current_user.id, id: params[:id]).first
      end

      def company_params
        params.require(:company).permit(
          :name, :logo, :short_description, :long_description, :acquisitions, :allow_sharing,
          :incubators, { incubators: [] },
          :target_markets, :headquarters, :formerly_known_as, :founded, :tags,
          :revenue, :recently_funded, :exec_summary,
          { tags: [] }, :incubator, :funding_stage, :employees, :funding_amount,
          :business_model, :company_stage, :operational_status,
          :government_assistance, :looking_for, :contact, :founders, :funding_rounds,
          { founders: [:name, :linkedin] },
          { office_locations: [:id, :address, :lat, :lng] }, :video_url, :website, :custom_field_1,
          :custom_field_2, :custom_field_3, :custom_field_4, :acquired,
          { social_accounts: [:twitter, :linkedin, :facebook] }, :product_stage,
          { funding_rounds: [:type, :amount, :date, investors: [:id, :name] ] }
        )
      end

    end
  end
end
