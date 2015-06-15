import pandas as pd
import numpy as np
import json, re, os

import os
def Ensure_dir(d):
    """Makes sure a directory 'd' exists, and if it doesn't, it creates one."""
    dirs = d.split('/')
    working_dir = ""
    for sd in dirs:
        working_dir += sd
        if not os.path.exists(working_dir):
            os.makedirs(working_dir)
        working_dir += "/"
    return 0

FILENAME = "imperiia/settlementsCoordinates_with_geonames.csv"
Ensure_dir(FILENAME[:-4])

import requests, time
def refine_loc(x,y,name,deg_diff=1,fuzzy=.9,obj_id=None,geonameId=None):
    if np.isnan(geonameId)==False:
        return geonameId
    else:
        query_file = "{}/{}_d{}f{}.json".format(FILENAME[:-4],obj_id,deg_diff,int(fuzzy*10))
        if os.path.isfile(query_file):
            with open(query_file,"r",encoding='utf-8') as fp:
                georesponse = json.load(fp)
            print("using local file")
        else:
            url = "http://api.geonames.org/search"
            north = float(y)+deg_diff
            south = float(y)-deg_diff
            east = float(x)+deg_diff
            west = float(x)-deg_diff
            username = "jaguillette"
            Q = {'type':'json','username':username,'featureClass':'P','name':name,'north':north,'south':south,'east':east,'west':west,'fuzzy':fuzzy}
            R = requests.get(url,params=Q)
            georesponse = R.json()
            with open(query_file,"w",encoding='utf-8') as fp:
                json.dump(georesponse,fp)
            #print(R.url)
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
            #print(R.url)
            #return georesponse['geonames'][0]['lng'], georesponse['geonames'][0]['lat']
            return georesponse['geonames'][0]['geonameId']
        else:
            print("{} was not found. Returning None".format(name))
            #print(R.url)
            #return x,y
            return None

settlements = pd.DataFrame.from_csv(FILENAME,index_col=None)

settlements['geonamesId'] = settlements.apply(lambda row: refine_loc(row['XCOORD'],row['YCOORD'],row['Placename'],obj_id=row['OBJECTID_1'],fuzzy=0.8,geonameId=row['geonamesId']),axis=1)

settlements.to_csv("{}_with_geonames.csv".format(FILENAME[:-4]),encoding="utf-8")