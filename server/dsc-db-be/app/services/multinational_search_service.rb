class MultinationalSearchService

  def initialize(params)
    @params = params
  end

  def call
    if @params[:searchText].present?
      multinationals = Multinational.live(true).search(@params[:searchText])
    elsif @params[:tag].present?
      multinationals = Multinational.live(true).search_by_tag(@params[:tag])
    else
      multinationals = Multinational.live(true).all
    end

    multinationals = multinationals.emea_hq(@params[:emeaHq]) if !@params[:emeaHq].nil?
    multinationals = multinationals.startup_packages(@params[:startupPackages]) if !@params[:startupPackages].nil?
    multinationals = multinationals.select_numeric_scope('employees', @params[:employees]) if @params[:employees]
    multinationals = multinationals.building_product_in_ireland(@params[:buildingProductInIreland]) if !@params[:buildingProductInIreland].nil?
    multinationals = multinationals.events_space(@params[:eventsSpace]) if !@params[:eventsSpace].nil?
    multinationals = multinationals.functions(@params[:functions]) if @params[:functions].present?

    multinationals
  end

end
