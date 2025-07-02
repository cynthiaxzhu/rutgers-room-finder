import { BUILDINGS, CAMPUSES, DAYS } from "./constants.js";
import { rooms } from "./rooms.js";

async function getCourses() {
  try {
    const response = await fetch("/courses");
    const courses = await response.json();
    return courses;
  } catch (error) {
    throw error;
  }
}

function loadCourseTimes(courses) {
  for (const course of courses) {
    for (const section of course["sections"]) {
      for (const time of section["meetingTimes"]) {
        const campus = time["campusAbbrev"];
        const building = time["buildingCode"];
        const roomNum = time["roomNumber"];
        const day = time["meetingDay"];
        let startTime = time["startTimeMilitary"];
        let endTime = time["endTimeMilitary"];
        
        if (
          !(campus in CAMPUSES)
          || !(building in BUILDINGS)
          || !(roomNum in rooms[campus][building])
          || !(day in DAYS)
        ) {
          continue;
        }
        
        if (!(day in rooms[campus][building][roomNum])) {
          rooms[campus][building][roomNum][day] = {};
        }
        
        if (startTime[0] === "0") startTime = startTime.slice(1);
        if (endTime[0] === "0") endTime = endTime.slice(1);
        
        rooms[campus][building][roomNum][day][startTime] = endTime;
      }
    }
  }
  
  for (const campus in rooms) {
    for (const building in rooms[campus]) {
      for (const roomNum in rooms[campus][building]) {
        for (const day in rooms[campus][building][roomNum]) {
          /* transform rooms[campus][building][roomNum] from
             { "100" : "200", "300" : "400" }
             to
             [[100, 200], [300, 400]] */
          rooms[campus][building][roomNum][day] =
            Object.entries(rooms[campus][building][roomNum][day])
              .map((interval) =>
                interval.map((time) =>
                  parseInt(time)
                )
              );
        }
      }
    }
  }
  
  return rooms;
}

export async function initRoomsData() {
  try {
    const courses = await getCourses();
    const rooms = loadCourseTimes(courses);
    return rooms;
  } catch (error) {
    throw error;
  }
}
