class HotspotsController < ApplicationController
  before_action :set_hotspot, only: [:show, :edit, :update, :destroy]

  # GET /hotspots
  # GET /hotspots.json

  def index
  end

  def list
    @hotspots = Hotspot.where(category: params[:category]).entries
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
      render :action => 'new'
    end
  end

  # PATCH/PUT /hotspots/1
  def update
    if @hotspot.update(update_params)
      flash[:notice] = sprintf("Successfully update %s.", @hotspot.category)
      redirect_to @hotspot
    else
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
      params.require(:hotspot).permit(:image, :category, :name, :description, :lat, :lng)
    end

    def update_params
      params.require(:hotspot).permit(:image, :name, :description, :lat, :lng)
    end
end
