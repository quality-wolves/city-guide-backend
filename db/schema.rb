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

ActiveRecord::Schema.define(version: 20150325203420) do

  create_table "admins", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admins", ["email"], name: "index_admins_on_email", unique: true
  add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true

  create_table "hotspot_images", force: :cascade do |t|
    t.integer  "hotspot_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
  end

  create_table "hotspots", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.float    "lat"
    t.float    "lng"
    t.text     "category"
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
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "phone"
    t.string   "site"
    t.string   "address"
    t.boolean  "is_primary",                     default: false
  end

  create_table "whats_ons", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.date     "date"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

end
