class AddFemaleFounderToCompanies < ActiveRecord::Migration
  def change
    add_column :companies, :female_founder, :boolean
  end
end
