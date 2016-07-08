# == Schema Information
#
# Table name: hubs
#
#  id                   :integer          not null, primary key
#  name                 :string
#  logo                 :string
#  short_description    :text
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  hub_type             :text             default([]), is an Array
#  long_description     :text
#  founded              :string
#  contact              :string
#  contact_detail       :string
#  address              :text
#  contact_urls         :jsonb
#  events               :text             default([]), is an Array
#  alumni               :jsonb
#  deleted_at           :datetime
#

require 'rails_helper'

RSpec.describe Hub, :type => :model do
  [
    :name, :logo, :short_description, :applications, :hub_type,
    :long_description, :founded, :contact, :contact_detail, :address, :contact_urls,
    :events, :alumni
  ].each do |column|
    it { should have_db_column(column) }
  end


end
