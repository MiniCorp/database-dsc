class V1::UserTokenController < Knock::AuthTokenController
  def create
    if entity.email_confirmed
      render json: auth_token, status: :created
    else
      render json: { error: "Sorry, looks like you have not yet confirmed your email address." }, status: 200
    end
  end

private

  def entity_class
    User
  end
end
