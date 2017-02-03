class PublicInvestorSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo, :short_description, :headquarters, :founders,
    :local_office, :tags, :funding_types, :investment_size, :funds_raised,
    :regions, :contact, :contact_email, :long_description, :website,
    :video_url, :social_accounts, :office_locations, :companies_invested_in

  def tags
    object.tags
  end
end
