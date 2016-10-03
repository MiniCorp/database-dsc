class AddExecSummaryToCompanies < ActiveRecord::Migration
  def change
    add_attachment :companies, :exec_summary
  end
end
