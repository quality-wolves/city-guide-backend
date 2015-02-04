# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150204152328) do

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hotspots", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "category_id"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.float    "lat"
    t.float    "lng"
    t.string   "banner_file_name"
    t.string   "banner_content_type"
    t.integer  "banner_file_size"
    t.datetime "banner_updated_at"
    t.string   "aditionnal_image1_file_name"
    t.string   "aditionnal_image1_content_type"
    t.integer  "aditionnal_image1_file_size"
    t.datetime "aditionnal_image1_updated_at"
    t.string   "aditionnal_image2_file_name"
    t.string   "aditionnal_image2_content_type"
    t.integer  "aditionnal_image2_file_size"
    t.datetime "aditionnal_image2_updated_at"
<<<<<<< HEAD
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
=======
    t.text     "category"
>>>>>>> c4ad62d6c62918e28c3157e3048ed3f2d3443ab3
  end

  add_index "hotspots", ["category_id"], name: "index_hotspots_on_category_id"

end
