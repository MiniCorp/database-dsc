class PublicMultinationalSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo, :short_description, :headquarters,
    :local_office, :emea_hq, :employees, :events_space, :functions,
    :long_description, :events_space_qualifiers, :next_event,
    :website, :social_accounts, :startup_packages, :video_url,
    :tags, :lat, :lng, :building_product_in_ireland, :startup_evangelist

  def tags
    object.tags
  end
end
