require 'httparty'
require 'json'

BASE_URL = ENV['API_BASE_URL'] || 'http://localhost:3000'

Given(/^the server is running at "([^"]*)"$/) do |url|
  @base_url = url
end

When(/^I create a user with:$/) do |table|
  data = table.rows_hash
  body = { user: data }.to_json
  @response = HTTParty.post("#{@base_url}/users", body: body, headers: { 'Content-Type' => 'application/json' })
  @parsed = JSON.parse(@response.body) rescue nil
end

When(/^I fetch the user by id$/) do
  id = @parsed['id'] || @created_id
  @response = HTTParty.get("#{@base_url}/users/#{id}", headers: { 'Content-Type' => 'application/json' })
  @parsed = JSON.parse(@response.body) rescue nil
end

Then(/^the response status should be (\d+)$/) do |status|
  expect(@response.code).to eq(status.to_i)
end

Then(/^the response JSON should contain:$/) do |table|
  expected = table.rows_hash
  expected.each do |k, v|
    expect(@parsed[k]).to eq(v)
  end
end

Given(/^an existing user with:$/) do |table|
  data = table.rows_hash
  body = { user: data }.to_json
  res = HTTParty.post("#{@base_url}/users", body: body, headers: { 'Content-Type' => 'application/json' })
  @created = JSON.parse(res.body) rescue nil
  @created_id = @created['id']
end

When(/^I update the user with:$/) do |table|
  data = table.rows_hash
  id = @created_id || @parsed['id']
  body = { user: data }.to_json
  @response = HTTParty.put("#{@base_url}/users/#{id}", body: body, headers: { 'Content-Type' => 'application/json' })
  @parsed = JSON.parse(@response.body) rescue nil
end

When(/^I delete the user$/) do
  id = @created_id || @parsed['id']
  @response = HTTParty.delete("#{@base_url}/users/#{id}", headers: { 'Content-Type' => 'application/json' })
end


