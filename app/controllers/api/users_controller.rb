class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render :show
  end

  def index
    if params[:search]
      @users = User.all
      # search(params[:search])
    else
      @users = User.all
    render :index
    end
  end
end
