class PublicHubSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo, :short_description, :hub_type,
    :long_description, :founded, :contact, :contact_detail,
    :address, :contact_urls, :events, :alumni, :website,
    :video_url, :social_accounts, :tags, :funding_provided,
    :lat, :lng, :applications

  def tags
    object.tags
  end
end
