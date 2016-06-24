class RemoveInvestorsFromCompanies < ActiveRecord::Migration
  def change
    drop_view :public_companies
    remove_column :companies, :investors, :text
  end
end
