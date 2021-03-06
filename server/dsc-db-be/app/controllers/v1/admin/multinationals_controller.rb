module V1
  module Admin
    class MultinationalsController < AdminController
      def create
        multinational = Multinational.create(multinational_params)
        multinational.update_attributes(is_live: true)

        render json: multinational
      end

      def index
        multinationals = Multinational.with_deleted.order(:name)

        respond_to do |format|
          format.html do
            render json: multinationals
          end
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
        Multinational.find(params[:id])
      end

      def multinational_params
        params.require(:multinational).permit(
          :name,
          :logo,
          :short_description,
          :long_description,
          :startup_evangelist,
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
