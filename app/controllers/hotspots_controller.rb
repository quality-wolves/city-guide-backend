class HotspotsController < ApplicationController
  before_filter :authenticate_admin!
  before_action :set_hotspot, only: [:show, :edit, :update, :destroy]

  # GET /hotspots
  # GET /hotspots.json

  def index
  end

  def list
    @hotspots = Hotspot.where(category: params[:category]).order(is_primary:'desc',created_at:'desc')
  end

  # GET /hotspots/1
  # GET /hotspots/1.json
  def show
  end

  # GET /hotspots/new
  def new
    @hotspot = Hotspot.new
  end

  # GET /hotspots/1/edit
  def edit
  end

  # GET /hotspots/1/crop
  def crop
  end

  # POST /hotspots
  def create
    @hotspot = Hotspot.new(hotspot_params)

    if @hotspot.save
      # if params[:hotspot][:banner].blank?
        flash[:notice] = sprintf("Successfully created %s.", @hotspot.category)
        redirect_to @hotspot
      # else
        # render :action => "crop"
      # end
    else
      params[:category] = @hotspot.category
      render :action => 'new'
    end
  end

  # PATCH/PUT /hotspots/1
  def update
    if @hotspot.update(update_params)
      flash[:notice] = sprintf("Successfully update %s.", @hotspot.category)
      redirect_to @hotspot
    else
      params[:category] = @hotspot.category
      render :action => 'edit'
    end
  end

  # DELETE /hotspots/1
  # DELETE /hotspots/1.json
  def destroy
    if @hotspot.destroy
      flash[:notice] = sprintf("Successfully delete %s.", @hotspot.category)
      redirect_to list_hotspots_path(@hotspot.category)
    else
      flash[:notice] = sprintf("Failure delete %s.", @hotspot.category)
      redirect_to :back
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hotspot
      @hotspot = Hotspot.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hotspot_params
      params.require(:hotspot).permit(:category, {hotspot_images_attributes: [:file]}, :is_primary, :name, :phone, :site, :description, :lat, :lng, :address)
    end

    def update_params
      params.require(:hotspot).permit({hotspot_images_attributes: [:id, :file]}, :is_primary, :name, :phone, :site, :description, :lat, :lng, :address)
    end
end
