require 'securerandom'

class V1::UsersController < ApplicationController
  before_action :authenticate, only: [:show, :update]
  before_action :is_user, only: [:show, :update]
  before_action :check_user_exists, only: [:create]

  def create
    if params[:via_linkedin] == false
      # create the new user instance with params from sign up form
      user = User.create(user_params)

      # check the user save ok
      if user.persisted?
        # create a token used to activate account
        user.create_activation_digest
        # send user the activate account email
        user.send_activation_email
        render json: { message: "Thank you for signing up! You will receive an email shortly containing a link to confirm your email address. You will not be able to login until your email has been confirmed." }, status: 200
        return
      end
    else
      params[:user][:password] = SecureRandom.hex

      # find or create the new user instance via linkedin
      user = User.where(provider: user_params[:provider], uid: user_params[:uid])
                 .first_or_create(user_params)

      # ensure the user is activated
      user.update_attributes(activated: true)
      # check the user save ok
      if user.persisted?
        # use the Knock AuthToken model to create a token for us
        render json: { jwt: auth_token(user).token, user: UserSerializer.new(user) }, status: 200
        return
      end
    end

    # bad request
    render json: user, status: 400
  end

  def show
    render json: UserSerializer.new(current_user), root: false, status: 200
  end

  def update
    if current_user.update_attributes(user_params)
      render json: UserSerializer.new(current_user), root: false, status: 200
    else
      # bad request
      render json: :nothing, status: 400
    end
  end

  def verify_account
    user = User.find_by(email: params[:account_activation][:email])
    unless (user &&
            user.authenticated?(:activation, params[:id]))
      render json: :nothing, status: 400
    end

    user.update_attributes(activated: true)
  end

  def is_user
    if current_user.user_type != "user"
      render json: :nothing, status: 401
      return
    end
  end

private

  def check_user_exists
    user = User.find_by_email(user_params[:email])
    if user.nil? == false
      render json: { error: "A user already exists with the email: #{ user_params[:email] }" }, status: 200
      return
    end
  end

  def auth_token(user)
    Knock::AuthToken.new payload: { sub: user.id }
  end

  def user_params
    params.require(:user).permit(:id, :first_name, :last_name, :email, :password, :provider, :uid)
  end

end
