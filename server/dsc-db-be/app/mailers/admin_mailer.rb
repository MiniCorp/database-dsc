class AdminMailer < ApplicationMailer

  def claim_notification(user_claim)
    @user_claim = user_claim
    mail(to: ENV['CLAIM_MAIL_TO'], subject: '👋 New Claim Request')
  end

  def export_ready_notification(entity_export)
    @entity_export = entity_export
    mail to: 'brian@minicorp.ie', subject: "TechIreland - Your export is ready"
  end

end
