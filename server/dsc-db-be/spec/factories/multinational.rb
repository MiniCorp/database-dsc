FactoryGirl.define do
  factory :multinational do
    name { Faker::Company.name }
    logo "https://placeholdit.imgix.net/~text?txtsize=33&txt=Company%20Logo&w=250&h=140"
    short_description { Faker::Company.catch_phrase }
    is_live true
  end
end
