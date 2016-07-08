class UserEntityClaim < UserEntityActivity
  def allocate_to_user!
    UserMailer.claim_approved(self).deliver_now!
    entity.update_attributes(user_id: self.user_id)

    self.destroy
  end

  def deny_from_user!
    self.destroy
  end
end
