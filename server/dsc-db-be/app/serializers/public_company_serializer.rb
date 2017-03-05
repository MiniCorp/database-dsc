class PublicCompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :logo, :short_description, :headquarters, :formerly_known_as,
    :funding_stage, :product_stage, :target_markets, :business_model, :company_stage,
    :funding_rounds, :looking_for, :contact, :long_description, :founded, :video_url,
    :website, :social_accounts, :office_locations, :tags, :founders, :exec_summary_url,
    :incubators, :female_founder

  def funding_rounds
    object.funding_rounds
  end

  def tags
    object.tags
  end
end
