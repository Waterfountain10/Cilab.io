from helpers import min_conv, generate_schedules
import hashlib
import json

initial_schedule = []
WEEK_TIME = 10080
DAY_TIME = 1440
week = ['Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday', 'Sunday']
for i in range(WEEK_TIME):
    
    time_slot = {
        "day": (week[(i//DAY_TIME)]),
        "time": (i),
        "activity" : None
    }

    # initial schedule is now a LIST OF DICTs(time_slots)
    initial_schedule.append(time_slot)

# Example of course_list
courses_example = [] 
Calculus2 = {
    "name": "Calculus 2",
    "ID":  "201-NYB-05.3",
    "days": {
        "monday": (min_conv('M',12),min_conv('M',14),"A-203"),
        "thursday": (min_conv('H',12),min_conv('H',13),"I-216"),
        "friday": (min_conv('F',9),min_conv('F',10),"I-216")
        },
    "Professor": "JF Deslandes"
}
Chemistry2 = {
    "name": "Chemistry 2",
    "ID": "202-NYB-05.15",
    "days": {
        "tuesday": (min_conv('T',9),min_conv('T',11),"A-203"),
        "wednesday": (min_conv('W',9),min_conv('W',12),"I-216"),
        "friday": (min_conv('F',11),min_conv('F',12),"I-216")
        },
    "Professor": "Hassan"
}
English = {
    "name": "English",
    "ID":  "603-103-MQ.5",
    "days": {
        "monday": (min_conv('M',15),min_conv('M',16),"A-203"),
        "wednesday": (min_conv('W',10),min_conv('W',11),"I-216"),
        },
    "Professor": "Blair Morris"
}
courses_example.append(Calculus2)
courses_example.append(Chemistry2)
courses_example.append(English)

schedules = list(generate_schedules(courses_example))
# Convert the list of sets to a set of sets, which will remove any duplicates
# schedules_set = set(frozenset(s) for s in schedules)

# Convert the set of sets back to a list of sets
# schedules = [set(s) for s in schedules_set]

# Convert the list of dictionaries to a JSON string
json_string = json.dumps(schedules, indent=4)

# Write the JSON string to a text file with line spacing
with open('text_file.txt', 'w') as f:
    f.write(json_string)