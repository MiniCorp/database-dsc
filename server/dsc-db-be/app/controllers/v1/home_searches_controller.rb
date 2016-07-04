module V1
  class HomeSearchesController < ApplicationController
    def index
      results = HomeSearch.all.select(:id, :name, :itemtype).where("name ILIKE ?", "%#{params[:filter]}%")
      render json: results, status: 200
    end
  end
end
