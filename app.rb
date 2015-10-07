require 'sinatra'

get "/index" do
  haml :index
end

get "/" do
  haml :boot1
end

get "/views/application.css" do
  content_type 'text/css', :charset=>'utf-8'
  sass :application
end

get "/views/boot1.css" do
  content_type 'text/css', :charset=>'utf-8'
  sass :boot1
end
