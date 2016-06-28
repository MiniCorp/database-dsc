class UserMailer < ApplicationMailer

  def password_reset(user)
    @user = user
    mail to: user.email, subject: "Password reset"
  end

  def account_activation(user)
    @user = user
    mail to: user.email, subject: "Please confirm you email address"
  end

  def profile_approved(user_entity_pending)
    @user_entity_pending = user_entity_pending
    mail to: @user_entity_pending.user.email, subject: "Profile approved!"
  end

  def profile_rejected(user_entity_pending)
    @user_entity_pending = user_entity_pending
    mail to: @user_entity_pending.user.email, subject: "Profile rejected"
  end
end
