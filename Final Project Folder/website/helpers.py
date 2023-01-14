# course_list is [] of courses(dicts)
# initi_schedule is [] of time_slots(dicts)

def generate_schedules(courses, schedule=[]):
    # Base case: if the list of courses is empty, return the current schedule
    if not courses:
        yield schedule
    else:
    # Check if the first course conflicts with any courses in the current schedule
    # or if the first course has already been included in the schedule 
        problem = False
        for reg in schedule:
            if conflicts_with(reg, courses[0]) or reg['name'] == courses[0]['name']:
                problem = True
                break
        # if no conflicts and no repetition, include the first course
        if not problem:
            for s in generate_schedules(courses[1:], schedule + [courses[0]]):
                yield s
        
        # include the schedules without that first course
        for s in generate_schedules(courses[1:], schedule):
            yield s


def conflicts_with(reg_course, new_course):
    # verify each time zones for the new
    for day1 in new_course['days'].keys():
        info1 = new_course['days'].get(day1)
        start1 = info1[0]
        end1 = info1[1]
        # compare with every time zones in old schedule
        for day2 in reg_course['days'].keys():
            info2 = reg_course['days'].get(day2)
            start2 = info2[0]
            end2 = info2[1]
            if (start2 >= end1 and end2 >= start2) or (end2 <= start1 and start2 <= end2):
                continue
            else:
                return True
    return False
    

def min_conv(day, hours):
    if day == "M": day = 0
    if day == "T": day = 1
    if day == "W": day = 2
    if day == "H": day = 3
    if day == "F": day = 4
    if day == "Sa": day = 5
    if day == "Su": day = 6
    minutes = hours * 60
    total = (minutes + (day * 1440))
    return total