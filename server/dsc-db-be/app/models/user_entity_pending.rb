class UserEntityPending < UserEntityActivity
  def approve_profile!
    # update the live flag
    entity.update_attributes(is_live: true)
    # ping the user an email
    UserMailer.profile_approved(self).deliver_now!
    # delete the pending request as fulfilled
    self.destroy
  end

  def deny_profile!
    # ping the user an email
    UserMailer.profile_rejected(self).deliver_now!
    # delete the profile (really_destroy actually deletes the record
    # when using the paranoia gem)
    entity.really_destroy! unless entity.nil?
    # delete the pending request as fulfilled
    self.destroy
  end
end
