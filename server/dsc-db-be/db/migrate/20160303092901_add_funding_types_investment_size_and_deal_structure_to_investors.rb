class AddFundingTypesInvestmentSizeAndDealStructureToInvestors < ActiveRecord::Migration
  def change
    add_column :investors, :funding_types, :text, array: true, default: []
    add_column :investors, :investment_size, :integer
    add_column :investors, :deal_structure, :text
  end
end
