require 'sinatra'
require 'haml/template/options'

Haml::Template.options[:format] = :xhtml

get "/" do
  haml :index
end

get "/todo" do
  haml :todo
end

get "/sales" do
  slim :'sales/boot1'
end

get "/dobble" do
  slim :'dobble/index'
end

get "/views/application.css" do
  content_type 'text/css', :charset=>'utf-8'
  sass :application
end

get "/views/boot1.css" do
  content_type 'text/css', :charset=>'utf-8'
  sass :'sales/boot1'
end
