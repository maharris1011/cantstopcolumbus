require 'json'
require 'airtable'
require 'active_support/all'

@client = Airtable::Client.new('keyIuXwxsBI2cvWJG')

@table = @client.table("apppXeg0e2C1iuT8u", "People")
@records = @table.select(formula: "PubOrganizer = 1", :limit => 100)

File.open("_data/organizer.json", "w") do |f|
    data = @records.map { |record| record.attributes }
    f.write(data.to_json)
end
