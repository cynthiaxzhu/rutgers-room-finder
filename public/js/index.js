import { BUILDINGS, CAMPUSES, DAYS, SEMESTER, YEAR } from "./constants.js";
import { findOpenRooms } from "./find-open-rooms.js";
import { initRoomsData } from "./init-rooms-data.js";
import { isValidTimeRange } from "./utils.js";

function initSemesterElem() {
  const semesterElem = document.getElementById("semester");
  
  semesterElem.textContent = SEMESTER + " " + YEAR;
}

function initDayElem() {
  const dayElem = document.getElementById("day");
  
  for (const [key, val] of Object.entries(DAYS)) {
    const opt = document.createElement("option");
    opt.text = val;
    opt.value = key;
    dayElem.appendChild(opt);
  }
}

function initResetTimeElem(timeId, resetTimeId) {
  const timeElem = document.getElementById(timeId);
  const resetTimeElem = document.getElementById(resetTimeId);
  
  resetTimeElem.addEventListener("click", () => {
    timeElem.value = "";
  });
}

function initCampusElem(rooms) {
  const campusElem = document.getElementById("campus");
  
  for (const [key, val] of Object.entries(CAMPUSES)) {
    const opt = document.createElement("option");
    opt.text = val;
    opt.value = key;
    campusElem.appendChild(opt);
  }
  
  campusElem.addEventListener("change", (event) => {
    initBuildingElem(event, rooms);
  });
}

function initBuildingElem(event, rooms) {
  const buildingElem = document.getElementById("building");
  
  buildingElem.innerHTML = "";
  
  let opt = document.createElement("option");
  buildingElem.appendChild(opt);
  
  for (const building in rooms[event.target.value]) {
    opt = document.createElement("option");
    opt.text = BUILDINGS[building];
    opt.value = building;
    buildingElem.appendChild(opt);
  }
}

function initFindRoomsElem(rooms) {
  const findRoomsElem = document.getElementById("find-rooms");
  
  findRoomsElem.addEventListener("click", () => {
    handleFindRoomsClick(rooms);
  });
}

function initFormElem(rooms) {
  initDayElem();
  initResetTimeElem("start", "reset-start");
  initResetTimeElem("end", "reset-end");
  initCampusElem(rooms);
  initFindRoomsElem(rooms);
}

function showInvalidTimeRange() {
  const resultsInfoElem = document.getElementById("results-info");
  
  resultsInfoElem.innerText = "Invalid time range";
}

function showNoOpenRooms() {
  const resultsInfoElem = document.getElementById("results-info");
  
  resultsInfoElem.innerText = "No open rooms";
}

function showOpenRooms(results) {
  const { openRooms, numOpenRooms } = results;
  
  const resultsInfoElem = document.getElementById("results-info");
  const openRoomsElem = document.getElementById("open-rooms");
  
  resultsInfoElem.innerText = `Showing ${numOpenRooms} open room`
    + (numOpenRooms === 1 ? "" : "s");
  
  for (const campus in openRooms) {
    const details = document.createElement("details");
    details.open = "false";
    openRoomsElem.appendChild(details);
    
    const summary = document.createElement("summary");
    summary.innerText = CAMPUSES[campus];
    details.appendChild(summary);
    
    const list = document.createElement("ul");
    details.appendChild(list);
    
    for (const building in openRooms[campus]) {
      const item = document.createElement("li");
      
      const span = document.createElement("span");
      span.classList.add("building");
      span.innerText = `${BUILDINGS[building]}:`;
      item.appendChild(span);
      
      item.innerHTML += ` ${openRooms[campus][building].sort().join(", ")}`;
      list.appendChild(item);
    }
  }
  
  resultsInfoElem.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
}

async function initRooms() {
  const introElem = document.getElementById("intro");
  const formElem = document.getElementById("form");
  
  try {
    introElem.innerText = "Fetching data . . .";
    formElem.style.display = "none";
    
    const rooms = await initRoomsData();
    
    introElem.innerText = "Find an open classroom to study in.";
    formElem.style.display = "";
    
    return rooms;
  } catch (error) {
    console.error(error);
    introElem.innerText = "Error fetching data. Try reloading the page.";
  }
}

function handleFindRoomsClick(rooms) {
  const day = document.getElementById("day").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const campus = document.getElementById("campus").value;
  const building = document.getElementById("building").value;
  console.log({ day, start, end, campus, building });
  
  const openRoomsElem = document.getElementById("open-rooms");
  openRoomsElem.innerHTML = "";
  
  if (!isValidTimeRange()) {
    showInvalidTimeRange();
    return;
  }
  
  const results = findOpenRooms(rooms);
  
  if (results.numOpenRooms === 0) {
    showNoOpenRooms();
  } else {
    showOpenRooms(results);
  }
}

initSemesterElem();
const rooms = await initRooms();
if (typeof rooms !== "undefined") {
  initFormElem(rooms);
}
