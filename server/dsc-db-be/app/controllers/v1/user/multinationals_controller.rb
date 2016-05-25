module V1
  module User
    class MultinationalsController < ApplicationController
      before_action :authenticate
      before_action :is_user

      def create
        multinational = Multinational.new(multinational_params)
        multinational.user_id = current_user.id
        multinational.save

        render json: multinational
      end

      def index
        multinationals = Multinational.unclaimed_or_owned_by(current_user.id).with_deleted.order(:id)

        multinationals.each {|multinational| multinational.current_user = current_user} if current_user

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

      def is_user
        if current_user.user_type != "user"
          render json: :nothing, status: 401
          return
        end
      end

      private

      def multinational
        Multinational.where(user_id: current_user.id, id: params[:id]).first
      end

      def multinational_params
        params.require(:multinational).permit(
          :name,
          :logo,
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
