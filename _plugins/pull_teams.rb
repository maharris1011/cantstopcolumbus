require 'json'
require 'airtable'
require 'active_support/all'

@client = Airtable::Client.new(AIRTABLE_KEY)

@table = @client.table("apppXeg0e2C1iuT8u", "People")

@records_nav = @table.select(:sort => ["First Name", :asc], formula: "PubNavigator = 1", :limit => 100)
@records_org = @table.select(:sort => ["First Name", :asc], formula: "PubOrganizer = 1", :limit => 100)
@records_proj = @table.select(:sort => ["First Name", :asc], formula: "PubProject = 1", :limit => 100)
@records_spec = @table.select(:sort => ["First Name", :asc], formula: "PubSpecial = 1", :limit => 100)
@records_success = @table.select(:sort => ["First Name", :asc], formula: "PubSuccess = 1", :limit => 100)
@records_impact = @table.select(:sort => ["First Name", :asc], formula: "PubImpact = 1", :limit => 100)

File.open("_data/navigator.json", "w") do |f|
    data = @records_nav.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/organizer.json", "w") do |f|
    data = @records_org.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/proj_lead.json", "w") do |f|
    data = @records_proj.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/special.json", "w") do |f|
    data = @records_spec.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/success.json", "w") do |f|
    data = @records_success.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/impact.json", "w") do |f|
    data = @records_impact.map { |record| record.attributes }
    f.write(data.to_json)
end
