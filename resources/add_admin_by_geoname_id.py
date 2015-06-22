import pandas as pd
import json, requests, sys

try:
	HGR_ID = int(sys.argv[1])
except IndexError:
	HGR_ID = int(input("HGR ID (from spreadsheet): "))

try:
	GEONAMES_ID = sys.argv[2]
except IndexError:
	GEONAMES_ID = input("GeoNames ID (from search): ")

def row_update_from_geonames_id(row,geoname):
    """
    Updates the given row (from a pandas dataframe) with info from the given "geoname",
    a single place description from a geonames API response.
    Returns a modified row.
    """
    row['x_coord'] = geoname['lng']
    row['y_coord'] = geoname['lat']
    row['pres_loc'] = "{}, {}".format(geoname['name'],geoname['adminName1'])
    row['pres_country'] = geoname['countryName']
    row['country_code'] = geoname['countryCode']
    return row

def geonames_lookup_by_id(geonameId):
	"""
	Takes a geonames ID, looks it up, returns its info as json
	"""
	url = "http://api.geonames.org/getJSON?formatted=true&geonameId={}&username=jaguillette&style=full".format(geonameId)
	R = requests.get(url)
	response = R.json()
	return response

dataset = pd.read_csv("admin_areas.csv",index_col=0)

dataset.loc[HGR_ID] = row_update_from_geonames_id(dataset.loc[HGR_ID], geonames_lookup_by_id(GEONAMES_ID))

dataset.to_csv("admin_areas.csv",encoding="utf-8")
