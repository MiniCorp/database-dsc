class AddIncubatorsToCompanies < ActiveRecord::Migration
  def change
    add_column :companies, :incubators, :string, array: true, default: []
  end
end
