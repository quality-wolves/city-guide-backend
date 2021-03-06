class WhatsOnsController < ApplicationController
  before_filter :authenticate_admin!
	before_action :set_whats_on, only: [:show, :edit, :update, :destroy]
	# GET /whats_ons
  # GET /whats_ons.json

  def index
  	@whatsOns = WhatsOn.all;
  end

  # GET /whats_ons/1
  # GET /whats_ons/1.json
  def show
  end

  # GET /whats_ons/new
  def new
    @whatsOn = WhatsOn.new
  end

  # GET /whats_ons/1/edit
  def edit
  end

  # GET /whats_ons/1/crop
  def crop
  end

  # POST /whats_ons
  def create
    @whatsOn = WhatsOn.new(whats_on_params)

    if @whatsOn.save
        flash[:notice] = "Successfully created what`s on."
        redirect_to @whatsOn
    else
      render :action => 'new'
    end
  end

  # PATCH/PUT /whats_ons/1
  def update
    if @whatsOn.update(whats_on_params)
      flash[:notice] = "Successfully update what`s on."
      redirect_to @whatsOn
    else
      render :action => 'edit'
    end
  end

  # DELETE /whats_ons/1
  # DELETE /whats_ons/1.json
  def destroy
    if @whatsOn.destroy
    	flash[:notice] = "Successfully delete what`s on."
      redirect_to whats_ons_path
    else
    	flash[:notice] = "Failure delete what`s on."
      redirect_to :back
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_whats_on
      @whatsOn = WhatsOn.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def whats_on_params
      params.require(:whats_on).permit({whats_on_images_attributes: [:id, :file]}, :is_primary, :name, :phone, :site, :description, :lat, :lng, :address, :tagline)
    end
end
