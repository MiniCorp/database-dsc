class CreateHomeSearches < ActiveRecord::Migration
  def change
    create_view :home_searches
  end
end
