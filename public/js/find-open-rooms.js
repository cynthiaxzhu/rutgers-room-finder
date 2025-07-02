import { getEndTimeInt, getStartTimeInt, isEmpty } from "./utils.js";

export function findOpenRooms(rooms) {
  const day = document.getElementById("day").value;
  const start = getStartTimeInt();
  const end = getEndTimeInt();
  const campusVal = document.getElementById("campus").value;
  const buildingVal = document.getElementById("building").value;
  
  /* using rooms, create new dictionary (object) of the shape
     { campus : { building : [ room ] } }
     that includes input campuses and buildings */
  const openRooms = Object.fromEntries(Object.keys(rooms)
    .filter((k1) => k1.includes(campusVal))
    .map((k1) => ([[k1], Object.fromEntries(Object.keys(rooms[k1])
      .filter((k2) => k2.includes(buildingVal))
      .map((k2) => ([[k2], []]))
    )]))
  );
  let numOpenRooms = 0;
  
  for (const campus in openRooms) {
    for (const building in openRooms[campus]) {
      for (const roomNum in rooms[campus][building]) {
        // if room is open all day
        if (!(day in rooms[campus][building][roomNum])) {
          openRooms[campus][building].push(roomNum);
          numOpenRooms += 1;
          continue;
        }
        
        let open = true;
        for (const [s, e] of rooms[campus][building][roomNum][day]) {
          /* covers the four cases
               s <= start <= e <= end
               s <= start <= end <= e
               start <= s <= e <= end
               start <= s <= end <= e */
          if (Math.max(s, start) <= Math.min(e, end)) {
            open = false;
            break;
          }
        }
        
        if (open) {
          openRooms[campus][building].push(roomNum);
          numOpenRooms += 1;
        }
      }
      
      if (openRooms[campus][building].length === 0) {
        delete openRooms[campus][building];
      }
    }
    
    if (isEmpty(openRooms[campus])) {
      delete openRooms[campus];
    }
  }
  
  const results = { openRooms, numOpenRooms };
  
  return results;
}
