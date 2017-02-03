class V1::HubsController < ApplicationController
  before_action :hub_types_parse, only: :index

  def index
    hubs = HubSearchService.new(filter_params).call
    paginate json: hubs,
       serializer: ActiveModel::Serializer::CollectionSerializer,
       each_serializer: PublicHubSerializer, status: 200
  end

  def show
    hub = Hub.live(true).find(params[:id])
    render json: PublicHubSerializer.new(hub), status: 200
  end

  private

  def hub_types_parse
    params[:hubType] = JSON.parse(params[:hubType]).select { |k, v| v }.keys.join(' ') if params[:hubType]
  end

  def filter_params
    params.permit(:searchText, :founded, :contact_details, :hubType, :contact, :tag, :fundingProvided, :applicationDeadlines)
  end

end
