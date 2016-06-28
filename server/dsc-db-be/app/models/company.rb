# == Schema Information
#
# Table name: companies
#
#  id                    :integer          not null, primary key
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  name                  :string
#  logo                  :string
#  short_description     :text
#  headquarters          :string
#  formerly_known_as     :string
#  founders              :text
#  tags            :text
#  investors             :text
#  office_locations      :text
#  incubator             :string
#  employees             :integer
#  funding_stage         :string
#  funding_amount        :integer
#  product_stage         :string
#  target_markets        :string
#  business_model        :string
#  company_stage         :string
#  operational_status    :string
#  funding_rounds        :jsonb
#  looking_for           :text
#  government_assistance :string
#  contact               :text
#  long_description      :text
#  founded               :string
#  acquisitions          :text
#  video_url             :text
#  website               :string
#  social_accounts       :jsonb
#  deleted_at            :datetime
#

class Company < ApplicationRecord
  acts_as_paranoid
  include PgSearch

  using Utils

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
      formerly_known_as: 'A',
      founders: 'D',
      tags: 'D',
      office_locations: 'D',
      incubator: 'D'
    },
    using: {
      tsearch: { any_word: true, prefix: true, dictionary: "english" }
    }

  pg_search_scope :target_markets,
    against: {
      target_markets: 'A'
    },
    using: {
      tsearch: { any_word: true }
    }

  has_attached_file :exec_summary, default_url: ""

  validates_attachment_content_type :exec_summary, :content_type => ["application/pdf"]

  scope :live, -> (live) { where is_live: live }
  scope :withIds, -> (company_ids) { where id: company_ids }
  scope :unclaimed_or_owned_by, -> (user_id) { where "(user_id is null) OR (user_id = #{user_id})" }
  scope :funding_stage, -> (funding_stage) { where funding_stage: funding_stage }
  scope :product_stage, -> (product_stage) { where product_stage: product_stage }
  scope :company_stage, -> (company_stage) { where company_stage: company_stage }
  scope :business_model, -> (business_model) { where business_model: business_model }
  scope :operational_status, -> (operational_status) { where operational_status: operational_status }
  scope :greater_than, -> (column, limit) { where "#{column} > #{limit}" }
  scope :range_scope, -> (column, range) { where("#{column}" => range) }
  scope :recently_funded, -> (recently_funded) { where recently_funded: recently_funded }

  attr_accessor :current_user

  def self.select_numeric_scope(column, range_as_string)
    if range_as_string == '>500' || range_as_string == '>100m'
      limit = range_as_string.parse_units.gsub('>', '').to_i
      self.greater_than(column, limit)
    else
      lower, upper = range_as_string.parse_units.split('-').map(&:to_i)
      self.range_scope(column, lower..upper)
    end
  end

  def as_json(options = { })
    super((options || { }).merge({
        :methods => [:claimed_requested_by_current_user, :exec_summary_url]
    }))
  end

  def claimed_requested_by_current_user
    UserEntityClaim.where(
      user_id: current_user.id,
      entity_id: self.id,
      entity_type: UserEntityClaim.entity_types['company']
    ).count > 0 if current_user
  end

  def exec_summary_url
    self.exec_summary ? self.exec_summary.url : nil
  end

end
