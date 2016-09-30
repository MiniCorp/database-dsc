class EntityExport < ActiveRecord::Base
  has_attached_file :csv_file, default_url: "export.csv", url: ":s3_domain_url",
  	:path => ':class/:attachment/:id_partition/:style/:basename.:extension'
  do_not_validate_attachment_file_type :csv_file

  belongs_to :user
end
