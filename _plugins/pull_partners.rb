require 'json'
require 'airtable'
require 'active_support/all'

# @client = Airtable::Client.new(ENV["AIRTABLE_KEY"])
@client = Airtable::Client.new('keyIuXwxsBI2cvWJG')

@table = @client.table("apppXeg0e2C1iuT8u", "Partners")

@records_feature = @table.select(:sort => ["Partner", :asc], formula: "PubFeatured = 1", :limit => 100)
@records_comm = @table.select(:sort => ["Partner", :asc], formula: "PubCommPartner = 1", :limit => 100)
@records_prof = @table.select(:sort => ["Partner", :asc], formula: "PubProfPartner = 1", :limit => 100)
@records_angel = @table.select(:sort => ["Partner", :asc], formula: "PubAngel = 1", :limit => 100)
@records_kind = @table.select(:sort => ["Partner", :asc], formula: "PubInKind = 1", :limit => 100)
@records_ally = @table.select(:sort => ["Partner", :asc], formula: "PubAlly = 1", :limit => 100)

File.open("_data/community.json", "w") do |f|
    data = @records_comm.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/professional.json", "w") do |f|
    data = @records_prof.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/angel.json", "w") do |f|
    data = @records_angel.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/kind.json", "w") do |f|
    data = @records_kind.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/ally.json", "w") do |f|
    data = @records_ally.map { |record| record.attributes }
    f.write(data.to_json)
end

File.open("_data/feature.json", "w") do |f|
    data = @records_feature.map { |record| record.attributes }
    f.write(data.to_json)
end
