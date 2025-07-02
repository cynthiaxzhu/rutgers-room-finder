const date = new Date();
const monthNum = date.getMonth() + 1;

const SPRING = 1;
const FALL = 9;
const JULY = 7;

export const CAMPUS = "NB";
export const YEAR = date.getFullYear();
export const TERM_NUM = monthNum < JULY ? SPRING : FALL;

export const SEMESTER = monthNum < JULY ? "Spring" : "Fall";

export const DAYS = {
  "M": "Monday",
  "T": "Tuesday",
  "W": "Wednesday",
  "H": "Thursday",
  "F": "Friday",
};

export const CAMPUSES = {
  "BUS": "Busch",
  "CAC": "College Avenue",
  "D/C": "Cook/Douglass",
  "LIV": "Livingston",
};

export const BUILDINGS = {
  // Busch
  "ARC": "Allison Road Classroom",
  "BME": "Biomedical Engineering Building",
  "BST": "BEST West Residence Hall",
  "CCB": "Chemistry and Chemical Biology Building",
  "COR": "Computing Research and Education Building (CoRE)",
  "EN": "Engineering Building",
  "FBO": "Fiber Optic Materials Research Building",
  "HLL": "Hill Center",
  "PH": "Pharmacy Building",
  "PHY": "Physics Lecture Hall",
  "RWH": "Richard Weeks Hall of Engineering",
  "SEC": "Science and Engineering Resource Center",
  "WL": "Wright-Rieman Laboratories",
  // College Avenue
  "ABE": "Academic Building East Wing",
  "ABW": "Academic Building West Wing",
  "BH": "Bishop House",
  "CA": "Campbell Hall",
  "CI": "School of Communication and Information",
  "ED": "Graduate School of Education",
  "FH": "Frelinghuysen Hall",
  "HC": "Honors College",
  "HH": "Hardenbergh Hall",
  "MI": "Milledoler Hall",
  "MU": "Murray Hall",
  "SC": "Scott Hall",
  "VD": "Van Dyck Hall",
  "VH": "Voorhees Hall",
  "ZAM": "Zimmerli Art Museum",
  // Cook/Douglass
  "ARH": "Art History Hall",
  "BIO": "Biological Sciences Building",
  "BL": "Blake Hall",
  "BT": "Bartlett Hall",
  "CDL": "Cook/Douglass Lecture Hall",
  "DAV": "Davison Hall",
  "FNH": "Institute for Food, Nutrition, and Health",
  "FOR": "Foran Hall",
  "FS": "Food Science and Nutritional Sciences Building",
  "HCK": "Hickman Hall",
  "HSB": "Heldrich Science Building",
  "LOR": "Loree Classroom Building",
  "RAB": "Ruth Adams Building",
  "TH": "Thompson Hall",
  "WAL": "Waller Hall",
  // Livingston
  "BE": "Beck Hall",
  "BRR": "Business Rockafeller Road",
  "LSH": "Lucy Stone Hall",
  "TIL": "Tillett Hall",
};
