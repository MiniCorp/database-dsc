class InvestorSearchService

  def initialize(params)
    @params = params
  end

  def call
    if @params[:searchText].present?
      investors = Investor.search(@params[:searchText])
    elsif @params[:tag].present?
      investors = Investor.live(true).search_by_tag(@params[:tag])
    else
      investors = Investor.live(true).all
    end

    if @params[:fundingTypes] && !@params[:fundingTypes].include?('false')
      investors = investors.funding_types(@params[:fundingTypes])
    end
    if @params[:investmentSize] && @params[:investmentSize] != '100000000'
      investors = investors.select_numeric_scope('investment_size', @params[:investmentSize])
    end

    investors = investors.deal_structure(@params[:dealStructure]) if @params[:dealStructure].present?

    investors
  end

end
