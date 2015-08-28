class Api::AssignmentsController < ApplicationController
  def create
    @assignmnet = Assignmnet.new(assignmnet_params)
    if @assignmnet.save
      render json: @assignmnet
    else
      render json: @assignmnet.errors.full_messages, status: :unprocessable_entity
    end
  end



  private
  def assignmnet_params
    params.require(:assignmnet).permit(:task_id, :asssignee_id)
  end
end
