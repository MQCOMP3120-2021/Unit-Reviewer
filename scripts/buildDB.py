from pymongo import MongoClient
from dotenv import load_dotenv
import os
import json

load_dotenv()
MONGODB_URI = os.environ['MONGO_URI']
MONGODB_CLIENT = os.environ['MONGO_CLIENT']
MONGODB_DOCUMENT = os.environ['MONGO_DOCUMENT']

client = MongoClient(MONGODB_URI)
db = client[MONGODB_CLIENT]
units = db[MONGODB_DOCUMENT]

with open('./units.json') as f:
    data = json.load(f)

for unit in data:
    if("COMP" in unit or "ENGG" in unit):
        outcomes = []
        assessments = []
        offerings = []
        scheduledAct = []
        nonScheduledAct = []
        prerequisites = []
        nccw = []

        if 'outcomes' not in data[unit]:
            continue    
        if 'assessments' not in data[unit]:
            continue
        if 'offerings' not in data[unit]:
            continue
        if 'activities' not in data[unit]:
            continue
        if 'scheduled' not in data[unit]['activities']:
            continue
        if 'non-scheduled' not in data[unit]['activities']:
            continue
        if 'prerequisite' not in data[unit]:
            continue
        if 'nccw' not in data[unit]:
            continue
        
        for outcome in data[unit]['outcomes']:
            outcomes.append(data[unit]['outcomes'][outcome])
    
        for assessment in data[unit]['assessments']:
            if(data[unit]['assessments'][assessment]['hurdle'] == 'Yes'):
                data[unit]['assessments'][assessment]['hurdle'] = True
            else:
                data[unit]['assessments'][assessment]['hurdle'] = False
            assessments.append(data[unit]['assessments'][assessment])
    
        for offering in data[unit]['offerings']:
            offerings.append(data[unit]['offerings'][offering])
    
        for scheduled in data[unit]['activities']['scheduled']:
            scheduledAct.append(data[unit]['activities']['scheduled'][scheduled])
    
        for nonScheduled in data[unit]['activities']['non-scheduled']:
            nonScheduledAct.append(data[unit]['activities']['non-scheduled'][nonScheduled])
    
        prerequisites.append(data[unit]['prerequisite'])

        nccw.append(data[unit]['nccw'])
        
        activites = {'nonScheduled': nonScheduledAct, 'scheduled': scheduledAct}

        dict = {
            'code': unit, 
            'title': data[unit]['title'], 
            'description': data[unit]['description'], 
            'offerings': offerings, 
            'activities': activites,
            'assessments': assessments,
            'credits': data[unit]['credits'],
            'department': data[unit]['department'],
            'faculty': data[unit]['faculty'],
            'group': data[unit]['group'],
            'level': data[unit]['level'],
            'prerequisites': prerequisites,
            'nccw': nccw,
            'outcomes': outcomes
        }
        
        try:
            units.insert_one(dict)
            print("Imported "+unit)
        except:
            print("Something went wrong")