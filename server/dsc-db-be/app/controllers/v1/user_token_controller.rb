class V1::UserTokenController < Knock::AuthTokenController
  def create
    if entity.email_confirmed
      render json: {token: auth_token.token, email: entity.email, first_name: entity.first_name, last_name: entity.last_name, created_at: entity.created_at}, status: :created
    else
      render json: { error: "Sorry, looks like you have not yet confirmed your email address." }, status: 200
    end
  end

private

  def entity_class
    User
  end
end
