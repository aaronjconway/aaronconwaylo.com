import json
import csv

with open('./test.json') as json_file:
    data = json.load(json_file)

data_file = open('data_file.csv', 'w')

csv_writer = csv.writer(data_file)

count = 0

for i in data:
    if count == 0:

        header = i.keys()
        csv_writer.writerow(header)
        count += 1


    csv_writer.writerow(i.values())

data_file.close()
