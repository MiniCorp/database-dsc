# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170305184925) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "btree_gin"
  enable_extension "btree_gist"
  enable_extension "citext"
  enable_extension "cube"
  enable_extension "dblink"
  enable_extension "dict_int"
  enable_extension "dict_xsyn"
  enable_extension "earthdistance"
  enable_extension "fuzzystrmatch"
  enable_extension "hstore"
  enable_extension "intarray"
  enable_extension "ltree"
  enable_extension "pg_stat_statements"
  enable_extension "pg_trgm"
  enable_extension "pgcrypto"
  enable_extension "pgrowlocks"
  enable_extension "pgstattuple"
  enable_extension "sslinfo"
  enable_extension "tablefunc"
  enable_extension "unaccent"
  enable_extension "uuid-ossp"
  enable_extension "xml2"

  create_table "ar_internal_metadata", primary_key: "key", force: :cascade do |t|
    t.string   "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "authorizations", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "token"
    t.integer  "user_id"
    t.string   "secret"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "authorizations", ["user_id"], name: "index_authorizations_on_user_id", using: :btree

  create_table "companies", force: :cascade do |t|
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "name"
    t.string   "logo"
    t.text     "short_description"
    t.string   "headquarters"
    t.string   "formerly_known_as"
    t.string   "incubator"
    t.integer  "employees"
    t.string   "funding_stage"
    t.integer  "funding_amount"
    t.string   "product_stage"
    t.string   "target_markets"
    t.string   "business_model"
    t.string   "company_stage"
    t.string   "operational_status"
    t.jsonb    "funding_rounds"
    t.text     "looking_for"
    t.string   "government_assistance"
    t.text     "contact"
    t.text     "long_description"
    t.string   "founded"
    t.text     "acquisitions"
    t.text     "video_url"
    t.string   "website"
    t.jsonb    "social_accounts"
    t.datetime "deleted_at"
    t.text     "custom_field_1"
    t.text     "custom_field_2"
    t.text     "custom_field_3"
    t.text     "custom_field_4"
    t.jsonb    "office_locations",          default: {}
    t.string   "tags",                      default: [],                 array: true
    t.jsonb    "founders"
    t.string   "acquired"
    t.integer  "revenue"
    t.boolean  "recently_funded",           default: false
    t.integer  "user_id"
    t.string   "exec_summary_file_name"
    t.string   "exec_summary_content_type"
    t.integer  "exec_summary_file_size"
    t.datetime "exec_summary_updated_at"
    t.boolean  "is_live",                   default: false
    t.boolean  "allow_sharing",             default: false
    t.string   "incubators",                default: [],                 array: true
    t.boolean  "female_founder"
  end

  add_index "companies", ["deleted_at"], name: "index_companies_on_deleted_at", using: :btree
  add_index "companies", ["founders"], name: "index_companies_on_founders", using: :gin
  add_index "companies", ["funding_rounds"], name: "index_companies_on_funding_rounds", using: :gin
  add_index "companies", ["social_accounts"], name: "index_companies_on_social_accounts", using: :gin

  create_table "entity_exports", force: :cascade do |t|
    t.string   "entity_type"
    t.integer  "user_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "csv_file_file_name"
    t.string   "csv_file_content_type"
    t.integer  "csv_file_file_size"
    t.datetime "csv_file_updated_at"
  end

  create_table "hubs", force: :cascade do |t|
    t.string   "name"
    t.string   "logo"
    t.text     "short_description"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.text     "hub_type",          default: [],                 array: true
    t.text     "long_description"
    t.string   "founded"
    t.string   "contact"
    t.string   "contact_detail"
    t.text     "address"
    t.jsonb    "contact_urls",      default: []
    t.text     "events",            default: [],                 array: true
    t.jsonb    "alumni",            default: []
    t.datetime "deleted_at"
    t.text     "custom_field_1"
    t.text     "custom_field_2"
    t.text     "custom_field_3"
    t.text     "custom_field_4"
    t.string   "website"
    t.text     "video_url"
    t.jsonb    "social_accounts"
    t.string   "tags",              default: [],                 array: true
    t.boolean  "funding_provided"
    t.float    "lat"
    t.float    "lng"
    t.integer  "user_id"
    t.jsonb    "applications",      default: []
    t.boolean  "is_live",           default: false
    t.boolean  "allow_sharing",     default: false
  end

  add_index "hubs", ["alumni"], name: "index_hubs_on_alumni", using: :gin
  add_index "hubs", ["contact_urls"], name: "index_hubs_on_contact_urls", using: :gin
  add_index "hubs", ["deleted_at"], name: "index_hubs_on_deleted_at", using: :btree
  add_index "hubs", ["social_accounts"], name: "index_hubs_on_social_accounts", using: :gin

  create_table "investors", force: :cascade do |t|
    t.string   "name"
    t.string   "logo"
    t.string   "headquarters"
    t.jsonb    "founders",              default: {}
    t.text     "short_description"
    t.string   "local_office"
    t.text     "tags",                  default: [],                 array: true
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.text     "funding_types",         default: [],                 array: true
    t.integer  "investment_size"
    t.string   "funds_raised"
    t.text     "regions"
    t.string   "contact"
    t.string   "contact_email"
    t.text     "preferred_contact"
    t.text     "co_investors"
    t.text     "similar_investors"
    t.text     "long_description"
    t.string   "exits_ipos"
    t.string   "founded"
    t.jsonb    "contact_urls"
    t.datetime "deleted_at"
    t.text     "custom_field_1"
    t.text     "custom_field_2"
    t.text     "custom_field_3"
    t.text     "custom_field_4"
    t.string   "website"
    t.text     "video_url"
    t.jsonb    "social_accounts"
    t.jsonb    "office_locations",      default: {}
    t.string   "deal_structure"
    t.jsonb    "companies_invested_in", default: []
    t.integer  "user_id"
    t.boolean  "is_live",               default: false
    t.boolean  "allow_sharing",         default: false
  end

  add_index "investors", ["companies_invested_in"], name: "index_investors_on_companies_invested_in", using: :gin
  add_index "investors", ["contact_urls"], name: "index_investors_on_contact_urls", using: :gin
  add_index "investors", ["deleted_at"], name: "index_investors_on_deleted_at", using: :btree
  add_index "investors", ["founders"], name: "index_investors_on_founders", using: :gin
  add_index "investors", ["social_accounts"], name: "index_investors_on_social_accounts", using: :gin

  create_table "multinationals", force: :cascade do |t|
    t.string   "name"
    t.string   "logo"
    t.text     "short_description"
    t.string   "headquarters"
    t.string   "local_office"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.boolean  "emea_hq",                     default: false
    t.integer  "employees"
    t.boolean  "events_space",                default: false
    t.text     "functions",                   default: [],                 array: true
    t.text     "long_description"
    t.text     "events_space_qualifiers"
    t.string   "next_event"
    t.datetime "deleted_at"
    t.string   "website"
    t.jsonb    "social_accounts"
    t.text     "custom_field_1"
    t.text     "custom_field_2"
    t.text     "custom_field_3"
    t.text     "custom_field_4"
    t.jsonb    "startup_packages"
    t.text     "video_url"
    t.string   "tags",                        default: [],                 array: true
    t.float    "lat"
    t.float    "lng"
    t.boolean  "building_product_in_ireland", default: false
    t.integer  "user_id"
    t.boolean  "is_live",                     default: false
    t.boolean  "allow_sharing",               default: false
    t.boolean  "startup_evangelist"
  end

  add_index "multinationals", ["deleted_at"], name: "index_multinationals_on_deleted_at", using: :btree
  add_index "multinationals", ["social_accounts"], name: "index_multinationals_on_social_accounts", using: :gin

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.string   "searchable_type"
    t.integer  "searchable_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "user_entity_claims", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "entity_type"
    t.integer  "entity_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "user_entity_pendings", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "entity_type"
    t.integer  "entity_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "user_entity_pendings", ["user_id"], name: "index_user_entity_pendings_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "password_digest"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.integer  "user_type",          default: 0
    t.string   "reset_digest"
    t.datetime "reset_sent_at"
    t.string   "activation_digest"
    t.datetime "activation_sent_at"
    t.boolean  "email_confirmed",    default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  add_foreign_key "user_entity_pendings", "users"

  create_view :home_searches,  sql_definition: <<-SQL
      SELECT companies.id,
      companies.name,
      'Irish'::text AS itemtype
     FROM companies
    WHERE ((companies.deleted_at IS NULL) AND (companies.is_live = true))
  UNION
   SELECT multinationals.id,
      multinationals.name,
      'International'::text AS itemtype
     FROM multinationals
    WHERE ((multinationals.deleted_at IS NULL) AND (multinationals.is_live = true))
  UNION
   SELECT investors.id,
      investors.name,
      'Investors'::text AS itemtype
     FROM investors
    WHERE ((investors.deleted_at IS NULL) AND (investors.is_live = true))
  UNION
   SELECT hubs.id,
      hubs.name,
      'Hubs'::text AS itemtype
     FROM hubs
    WHERE ((hubs.deleted_at IS NULL) AND (hubs.is_live = true))
    ORDER BY 2;
  SQL

  create_view :public_companies,  sql_definition: <<-SQL
      SELECT companies.id,
      companies.name,
      companies.logo,
      companies.short_description,
      companies.long_description,
      companies.headquarters,
      companies.formerly_known_as,
      companies.incubator,
      companies.employees,
      companies.funding_stage,
      companies.funding_amount,
      companies.product_stage,
      companies.target_markets,
      companies.business_model,
      companies.company_stage,
      companies.operational_status,
      companies.funding_rounds,
      companies.looking_for,
      companies.government_assistance,
      companies.contact,
      companies.founded,
      companies.acquisitions,
      companies.video_url,
      companies.website,
      companies.social_accounts,
      companies.office_locations,
      companies.tags,
      companies.founders,
      companies.acquired,
      companies.revenue,
      companies.recently_funded
     FROM companies;
  SQL

  create_view :public_hubs,  sql_definition: <<-SQL
      SELECT hubs.id,
      hubs.name,
      hubs.logo,
      hubs.short_description,
      hubs.long_description,
      hubs.hub_type,
      hubs.applications,
      hubs.founded,
      hubs.contact,
      hubs.contact_detail,
      hubs.address,
      hubs.contact_urls,
      hubs.events,
      hubs.alumni,
      hubs.website,
      hubs.video_url,
      hubs.social_accounts,
      hubs.tags,
      hubs.funding_provided,
      hubs.lat,
      hubs.lng
     FROM hubs;
  SQL

  create_view :public_investors,  sql_definition: <<-SQL
      SELECT investors.id,
      investors.name,
      investors.logo,
      investors.short_description,
      investors.long_description,
      investors.headquarters,
      investors.local_office,
      investors.tags,
      investors.funding_types,
      investors.investment_size,
      investors.funds_raised,
      investors.regions,
      investors.contact,
      investors.contact_email,
      investors.preferred_contact,
      investors.co_investors,
      investors.similar_investors,
      investors.exits_ipos,
      investors.founded,
      investors.contact_urls,
      investors.website,
      investors.video_url,
      investors.social_accounts,
      investors.office_locations,
      investors.deal_structure,
      investors.companies_invested_in
     FROM investors;
  SQL

  create_view :public_multinationals,  sql_definition: <<-SQL
      SELECT multinationals.id,
      multinationals.name,
      multinationals.logo,
      multinationals.short_description,
      multinationals.long_description,
      multinationals.headquarters,
      multinationals.local_office,
      multinationals.emea_hq,
      multinationals.employees,
      multinationals.events_space,
      multinationals.functions,
      multinationals.events_space_qualifiers,
      multinationals.next_event,
      multinationals.website,
      multinationals.social_accounts,
      multinationals.startup_packages,
      multinationals.video_url,
      multinationals.tags,
      multinationals.lat,
      multinationals.lng,
      multinationals.building_product_in_ireland
     FROM multinationals;
  SQL

end
