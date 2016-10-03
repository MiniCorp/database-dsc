# == Schema Information
#
# Table name: multinationals
#
#  id                      :integer          not null, primary key
#  name                    :string
#  logo                    :string
#  short_description       :text
#  headquarters            :string
#  local_office            :string
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  emea_hq                 :boolean          default(FALSE)
#  startup_packages        :text             default([]), is an Array
#  employees               :integer
#  events_space            :boolean          default(FALSE)
#  functions               :text             default([]), is an Array
#  long_description        :text
#  events_space_qualifiers :text
#  next_event              :string
#  deleted_at              :datetime
#  website                 :string
#  social_accounts         :jsonb
#  tags              :string           default([]), is an Array
#

class Multinational < ApplicationRecord
  acts_as_paranoid
  include PgSearch

  belongs_to :user

  pg_search_scope :search_by_tag,
    against: {
      tags: 'A',
    },
    using: {
      tsearch: { any_word: true }
    }

  pg_search_scope :search,
    against: {
      name: 'A',
      short_description: 'B',
      headquarters: 'C',
      local_office: 'D'
    },
    using: {
      tsearch: {any_word: true, prefix: true, dictionary: 'english'}
    }

  pg_search_scope :functions,
    against: {
      functions: 'A'
    },
    using: {
      tsearch: {any_word: true}
    }

  attr_accessor :current_user

  scope :live, -> (live) { where is_live: live }
  scope :emea_hq, -> (emea_hq) { where(emea_hq: emea_hq) }
  scope :empty_startup_packages, -> { where(startup_packages: '{}') }
  scope :claimed_by_user, -> (user) { where user: user }
  scope :unclaimed, -> { where user: nil }
  scope :unclaimed_or_owned_by, -> (user_id) { where "(user_id is null) OR (user_id = #{user_id})" }
  scope :have_startup_packages, -> { where.not(startup_packages: '{}') }
  scope :building_product_in_ireland, -> (building_product_in_ireland) {
    where(building_product_in_ireland: building_product_in_ireland)
  }
  scope :events_space, -> (events_space) { where(events_space: events_space) }

  scope :greater_than, -> (column, limit) { where "#{column} > #{limit}" }
  scope :range_scope, -> (column, range) { where("#{column}" => range) }

  def self.select_numeric_scope(column, range_as_string)
    if range_as_string == '1000+'
      return greater_than(column, 1000)
    else
      lower, upper = range_as_string.split('-').map(&:to_i)
      range_scope(column, lower..upper)
    end
  end

  def self.startup_packages(filter_by_non_empty)
    return have_startup_packages if filter_by_non_empty
    empty_startup_packages
  end

  def as_json(options = { })
    super((options || { }).merge({
        :methods => [:claimed_requested_by_current_user]
    }))
  end

  def claimed_requested_by_current_user
    UserEntityClaim.where(
      user_id: current_user.id,
      entity_id: self.id,
      entity_type: UserEntityClaim.entity_types['multinational']
    ).count > 0 if current_user
  end

end
