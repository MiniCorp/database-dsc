class UserMailer < ApplicationMailer

  def password_reset(user)
    @user = user
    mail to: user.email, subject: "TechIreland - Password Reset"
  end

  def email_confirmation(user)
    @user = user
    mail to: user.email, subject: "TechIreland - Confirm Email Address"
  end

  def profile_approved(user_entity_pending)
    @user_entity_pending = user_entity_pending
    mail to: @user_entity_pending.user.email, subject: "TechIreland - Profile Approved!"
  end

  def profile_rejected(user_entity_pending)
    @user_entity_pending = user_entity_pending
    mail to: @user_entity_pending.user.email, subject: "TechIreland - Profile Rejected"
  end

  def claim_approved(user_entity_claim)
    @user_entity_claim = user_entity_claim
    mail to: @user_entity_claim.user.email, subject: "TechIreland - Your claim has been approved"
  end

  def export_ready_notification(entity_export)
    @entity_export = entity_export
    mail to: 'brian@minicorp.ie', subject: "TechIreland - Your export is ready"
  end
end
