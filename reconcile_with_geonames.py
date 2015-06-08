import pandas as pd
import numpy as np
import json, re

import requests, time
def refine_loc(x,y,name,deg_diff=1,fuzzy=.9,obj_id=None):
    url = "http://api.geonames.org/search"
    north = float(y)+deg_diff
    south = float(y)-deg_diff
    east = float(x)+deg_diff
    west = float(x)-deg_diff
    username = "jaguillette"
    Q = {'type':'json','username':username,'featureClass':'P','name':name,'north':north,'south':south,'east':east,'west':west,'fuzzy':fuzzy}
    R = requests.get(url,params=Q)
    georesponse = R.json()
    time.sleep(0.3)
    #print(georesponse)
    if obj_id:
        print("Object {}:".format(obj_id))
    if georesponse['totalResultsCount'] == 1:
        print("{} was found unambiguously.".format(georesponse['geonames'][0]['name']))
        #return georesponse['geonames'][0]['lng'], georesponse['geonames'][0]['lat']
        return georesponse['geonames'][0]['geonameId']
    elif georesponse['totalResultsCount'] > 1:
        print("{} returned ambiguous results. Using first result.".format(name))
        print(R.url)
        #return georesponse['geonames'][0]['lng'], georesponse['geonames'][0]['lat']
        return georesponse['geonames'][0]['geonameId']
    else:
        print("{} was not found. Returning None".format(name))
        print(R.url)
        #return x,y
        return None

settlements = pd.DataFrame.from_csv("imperiia/settlementsCoordinates.csv",index_col=None)

settlements['geonamesId'] = settlements.apply(lambda row: refine_loc(row['XCOORD'],row['YCOORD'],row['Placename'],obj_id=row['OBJECTID_1']),axis=1)