/**
 * ASHRAE Climatic Design Conditions Dataset (Fundamentals Handbook Chapter 14 / ACCA Manual J Table 1A/1B)
 * Standard meteorological design conditions for 50 US states, District of Columbia, and Canadian Metros.
 */

export interface AshraeLocationData {
  id: string;
  state: string;
  stateName: string;
  city: string;
  climateZone: string; // IECC / ASHRAE 90.1 (e.g., '1A', '2B', '3A', '4A', '5B', '6A', '7', '8')
  winterDb99: number; // 99% Heating Design Dry Bulb (°F)
  winterDb996: number; // 99.6% Extreme Heating Design Dry Bulb (°F)
  summerDb04: number; // 0.4% Cooling Design Dry Bulb (°F)
  summerDb10: number; // 1.0% Cooling Design Dry Bulb (°F)
  summerWb04: number; // 0.4% Mean Coincident Wet Bulb (°F)
  elevationFt: number;
}

export const ashraeClimaticDataset: AshraeLocationData[] = [
  // ALABAMA
  { id: "al-birmingham", state: "AL", stateName: "Alabama", city: "Birmingham", climateZone: "3A", winterDb99: 22, winterDb996: 18, summerDb04: 93, summerDb10: 91, summerWb04: 76, elevationFt: 644 },
  { id: "al-mobile", state: "AL", stateName: "Alabama", city: "Mobile", climateZone: "2A", winterDb99: 29, winterDb996: 25, summerDb04: 93, summerDb10: 91, summerWb04: 78, elevationFt: 219 },
  { id: "al-huntsville", state: "AL", stateName: "Alabama", city: "Huntsville", climateZone: "3A", winterDb99: 18, winterDb996: 14, summerDb04: 93, summerDb10: 91, summerWb04: 76, elevationFt: 629 },
  // ALASKA
  { id: "ak-anchorage", state: "AK", stateName: "Alaska", city: "Anchorage", climateZone: "7", winterDb99: -10, winterDb996: -16, summerDb04: 71, summerDb10: 68, summerWb04: 58, elevationFt: 144 },
  { id: "ak-fairbanks", state: "AK", stateName: "Alaska", city: "Fairbanks", climateZone: "8", winterDb99: -42, winterDb996: -48, summerDb04: 82, summerDb10: 78, summerWb04: 62, elevationFt: 434 },
  // ARIZONA
  { id: "az-phoenix", state: "AZ", stateName: "Arizona", city: "Phoenix", climateZone: "2B", winterDb99: 41, winterDb996: 38, summerDb04: 109, summerDb10: 107, summerWb04: 71, elevationFt: 1107 },
  { id: "az-tucson", state: "AZ", stateName: "Arizona", city: "Tucson", climateZone: "2B", winterDb99: 34, winterDb996: 31, summerDb04: 103, summerDb10: 101, summerWb04: 68, elevationFt: 2584 },
  { id: "az-flagstaff", state: "AZ", stateName: "Arizona", city: "Flagstaff", climateZone: "5B", winterDb99: 2, winterDb996: -4, summerDb04: 86, summerDb10: 83, summerWb04: 57, elevationFt: 7014 },
  // ARKANSAS
  { id: "ar-little-rock", state: "AR", stateName: "Arkansas", city: "Little Rock", climateZone: "3A", winterDb99: 21, winterDb996: 16, summerDb04: 96, summerDb10: 94, summerWb04: 77, elevationFt: 260 },
  // CALIFORNIA
  { id: "ca-los-angeles", state: "CA", stateName: "California", city: "Los Angeles (LAX)", climateZone: "3B", winterDb99: 46, winterDb996: 43, summerDb04: 80, summerDb10: 77, summerWb04: 66, elevationFt: 125 },
  { id: "ca-san-francisco", state: "CA", stateName: "California", city: "San Francisco", climateZone: "3C", winterDb99: 41, winterDb996: 38, summerDb04: 77, summerDb10: 73, summerWb04: 61, elevationFt: 52 },
  { id: "ca-san-diego", state: "CA", stateName: "California", city: "San Diego", climateZone: "3B", winterDb99: 46, winterDb996: 43, summerDb04: 81, summerDb10: 79, summerWb04: 68, elevationFt: 29 },
  { id: "ca-sacramento", state: "CA", stateName: "California", city: "Sacramento", climateZone: "3B", winterDb99: 33, winterDb996: 30, summerDb04: 98, summerDb10: 95, summerWb04: 69, elevationFt: 26 },
  { id: "ca-fresno", state: "CA", stateName: "California", city: "Fresno", climateZone: "3B", winterDb99: 32, winterDb996: 29, summerDb04: 101, summerDb10: 98, summerWb04: 70, elevationFt: 336 },
  // COLORADO
  { id: "co-denver", state: "CO", stateName: "Colorado", city: "Denver", climateZone: "5B", winterDb99: 2, winterDb996: -4, summerDb04: 93, summerDb10: 90, summerWb04: 61, elevationFt: 5431 },
  { id: "co-colorado-springs", state: "CO", stateName: "Colorado", city: "Colorado Springs", climateZone: "5B", winterDb99: 1, winterDb996: -5, summerDb04: 89, summerDb10: 86, summerWb04: 59, elevationFt: 6172 },
  // CONNECTICUT
  { id: "ct-hartford", state: "CT", stateName: "Connecticut", city: "Hartford", climateZone: "5A", winterDb99: 5, winterDb996: 0, summerDb04: 90, summerDb10: 87, summerWb04: 73, elevationFt: 180 },
  // DELAWARE
  { id: "de-wilmington", state: "DE", stateName: "Delaware", city: "Wilmington", climateZone: "4A", winterDb99: 14, winterDb996: 9, summerDb04: 91, summerDb10: 88, summerWb04: 75, elevationFt: 80 },
  // DISTRICT OF COLUMBIA
  { id: "dc-washington", state: "DC", stateName: "District of Columbia", city: "Washington (Reagan)", climateZone: "4A", winterDb99: 18, winterDb996: 14, summerDb04: 93, summerDb10: 91, summerWb04: 76, elevationFt: 66 },
  // FLORIDA
  { id: "fl-miami", state: "FL", stateName: "Florida", city: "Miami", climateZone: "1A", winterDb99: 48, winterDb996: 44, summerDb04: 91, summerDb10: 90, summerWb04: 78, elevationFt: 13 },
  { id: "fl-orlando", state: "FL", stateName: "Florida", city: "Orlando", climateZone: "2A", winterDb99: 38, winterDb996: 33, summerDb04: 94, summerDb10: 92, summerWb04: 77, elevationFt: 96 },
  { id: "fl-tampa", state: "FL", stateName: "Florida", city: "Tampa", climateZone: "2A", winterDb99: 41, winterDb996: 36, summerDb04: 92, summerDb10: 91, summerWb04: 78, elevationFt: 19 },
  { id: "fl-jacksonville", state: "FL", stateName: "Florida", city: "Jacksonville", climateZone: "2A", winterDb99: 31, winterDb996: 27, summerDb04: 94, summerDb10: 93, summerWb04: 77, elevationFt: 30 },
  // GEORGIA
  { id: "ga-atlanta", state: "GA", stateName: "Georgia", city: "Atlanta", climateZone: "3A", winterDb99: 22, winterDb996: 17, summerDb04: 91, summerDb10: 89, summerWb04: 74, elevationFt: 1010 },
  { id: "ga-savannah", state: "GA", stateName: "Georgia", city: "Savannah", climateZone: "2A", winterDb99: 29, winterDb996: 25, summerDb04: 94, summerDb10: 92, summerWb04: 78, elevationFt: 50 },
  // HAWAII
  { id: "hi-honolulu", state: "HI", stateName: "Hawaii", city: "Honolulu", climateZone: "1A", winterDb99: 64, winterDb996: 62, summerDb04: 89, summerDb10: 88, summerWb04: 73, elevationFt: 15 },
  // IDAHO
  { id: "id-boise", state: "ID", stateName: "Idaho", city: "Boise", climateZone: "5B", winterDb99: 11, winterDb996: 4, summerDb04: 96, summerDb10: 93, summerWb04: 63, elevationFt: 2858 },
  // ILLINOIS
  { id: "il-chicago", state: "IL", stateName: "Illinois", city: "Chicago (O'Hare)", climateZone: "5A", winterDb99: -2, winterDb996: -7, summerDb04: 90, summerDb10: 87, summerWb04: 74, elevationFt: 672 },
  { id: "il-springfield", state: "IL", stateName: "Illinois", city: "Springfield", climateZone: "4A", winterDb99: 2, winterDb996: -4, summerDb04: 91, summerDb10: 89, summerWb04: 75, elevationFt: 597 },
  // INDIANA
  { id: "in-indianapolis", state: "IN", stateName: "Indiana", city: "Indianapolis", climateZone: "5A", winterDb99: 4, winterDb996: -2, summerDb04: 89, summerDb10: 87, summerWb04: 74, elevationFt: 792 },
  // IOWA
  { id: "ia-des-moines", state: "IA", stateName: "Iowa", city: "Des Moines", climateZone: "5A", winterDb99: -4, winterDb996: -10, summerDb04: 91, summerDb10: 88, summerWb04: 75, elevationFt: 964 },
  // KANSAS
  { id: "ks-wichita", state: "KS", stateName: "Kansas", city: "Wichita", climateZone: "4A", winterDb99: 9, winterDb996: 3, summerDb04: 99, summerDb10: 96, summerWb04: 74, elevationFt: 1332 },
  // KENTUCKY
  { id: "ky-louisville", state: "KY", stateName: "Kentucky", city: "Louisville", climateZone: "4A", winterDb99: 13, winterDb996: 7, summerDb04: 91, summerDb10: 89, summerWb04: 75, elevationFt: 497 },
  // LOUISIANA
  { id: "la-new-orleans", state: "LA", stateName: "Louisiana", city: "New Orleans", climateZone: "2A", winterDb99: 35, winterDb996: 30, summerDb04: 93, summerDb10: 91, summerWb04: 79, elevationFt: 4 },
  // MAINE
  { id: "me-portland", state: "ME", stateName: "Maine", city: "Portland", climateZone: "6A", winterDb99: 0, winterDb996: -6, summerDb04: 85, summerDb10: 82, summerWb04: 70, elevationFt: 62 },
  // MARYLAND
  { id: "md-baltimore", state: "MD", stateName: "Maryland", city: "Baltimore", climateZone: "4A", winterDb99: 15, winterDb996: 10, summerDb04: 92, summerDb10: 89, summerWb04: 75, elevationFt: 148 },
  // MASSACHUSETTS
  { id: "ma-boston", state: "MA", stateName: "Massachusetts", city: "Boston (Logan)", climateZone: "5A", winterDb99: 9, winterDb996: 4, summerDb04: 89, summerDb10: 86, summerWb04: 73, elevationFt: 20 },
  // MICHIGAN
  { id: "mi-detroit", state: "MI", stateName: "Michigan", city: "Detroit", climateZone: "5A", winterDb99: 6, winterDb996: 0, summerDb04: 89, summerDb10: 86, summerWb04: 73, elevationFt: 645 },
  { id: "mi-grand-rapids", state: "MI", stateName: "Michigan", city: "Grand Rapids", climateZone: "5A", winterDb99: 4, winterDb996: -2, summerDb04: 88, summerDb10: 85, summerWb04: 73, elevationFt: 794 },
  // MINNESOTA
  { id: "mn-minneapolis", state: "MN", stateName: "Minnesota", city: "Minneapolis / St. Paul", climateZone: "6A", winterDb99: -11, winterDb996: -17, summerDb04: 89, summerDb10: 86, summerWb04: 73, elevationFt: 841 },
  // MISSISSIPPI
  { id: "ms-jackson", state: "MS", stateName: "Mississippi", city: "Jackson", climateZone: "3A", winterDb99: 25, winterDb996: 20, summerDb04: 95, summerDb10: 93, summerWb04: 77, elevationFt: 330 },
  // MISSOURI
  { id: "mo-st-louis", state: "MO", stateName: "Missouri", city: "St. Louis", climateZone: "4A", winterDb99: 9, winterDb996: 2, summerDb04: 93, summerDb10: 91, summerWb04: 76, elevationFt: 580 },
  { id: "mo-kansas-city", state: "MO", stateName: "Missouri", city: "Kansas City", climateZone: "4A", winterDb99: 6, winterDb996: -1, summerDb04: 93, summerDb10: 91, summerWb04: 75, elevationFt: 791 },
  // MONTANA
  { id: "mt-billings", state: "MT", stateName: "Montana", city: "Billings", climateZone: "6B", winterDb99: -12, winterDb996: -19, summerDb04: 92, summerDb10: 88, summerWb04: 62, elevationFt: 3567 },
  // NEBRASKA
  { id: "ne-omaha", state: "NE", stateName: "Nebraska", city: "Omaha", climateZone: "5A", winterDb99: -2, winterDb996: -8, summerDb04: 92, summerDb10: 89, summerWb04: 75, elevationFt: 983 },
  // NEVADA
  { id: "nv-las-vegas", state: "NV", stateName: "Nevada", city: "Las Vegas", climateZone: "3B", winterDb99: 34, winterDb996: 30, summerDb04: 108, summerDb10: 106, summerWb04: 67, elevationFt: 2180 },
  { id: "nv-reno", state: "NV", stateName: "Nevada", city: "Reno", climateZone: "5B", winterDb99: 13, winterDb996: 7, summerDb04: 95, summerDb10: 92, summerWb04: 59, elevationFt: 4404 },
  // NEW HAMPSHIRE
  { id: "nh-concord", state: "NH", stateName: "New Hampshire", city: "Concord", climateZone: "6A", winterDb99: -5, winterDb996: -11, summerDb04: 88, summerDb10: 85, summerWb04: 71, elevationFt: 342 },
  // NEW JERSEY
  { id: "nj-newark", state: "NJ", stateName: "New Jersey", city: "Newark", climateZone: "4A", winterDb99: 14, winterDb996: 9, summerDb04: 92, summerDb10: 89, summerWb04: 75, elevationFt: 30 },
  // NEW MEXICO
  { id: "nm-albuquerque", state: "NM", stateName: "New Mexico", city: "Albuquerque", climateZone: "4B", winterDb99: 19, winterDb996: 14, summerDb04: 94, summerDb10: 92, summerWb04: 61, elevationFt: 5315 },
  // NEW YORK
  { id: "ny-new-york", state: "NY", stateName: "New York", city: "New York (JFK / Central Park)", climateZone: "4A", winterDb99: 15, winterDb996: 10, summerDb04: 89, summerDb10: 87, summerWb04: 74, elevationFt: 32 },
  { id: "ny-buffalo", state: "NY", stateName: "New York", city: "Buffalo", climateZone: "5A", winterDb99: 5, winterDb996: 0, summerDb04: 85, summerDb10: 83, summerWb04: 71, elevationFt: 715 },
  { id: "ny-albany", state: "NY", stateName: "New York", city: "Albany", climateZone: "5A", winterDb99: 1, winterDb996: -5, summerDb04: 88, summerDb10: 85, summerWb04: 72, elevationFt: 290 },
  // NORTH CAROLINA
  { id: "nc-charlotte", state: "NC", stateName: "North Carolina", city: "Charlotte", climateZone: "3A", winterDb99: 22, winterDb996: 17, summerDb04: 92, summerDb10: 90, summerWb04: 74, elevationFt: 748 },
  { id: "nc-raleigh", state: "NC", stateName: "North Carolina", city: "Raleigh / Durham", climateZone: "3A", winterDb99: 20, winterDb996: 15, summerDb04: 92, summerDb10: 90, summerWb04: 75, elevationFt: 435 },
  // NORTH DAKOTA
  { id: "nd-fargo", state: "ND", stateName: "North Dakota", city: "Fargo", climateZone: "7", winterDb99: -19, winterDb996: -25, summerDb04: 89, summerDb10: 85, summerWb04: 71, elevationFt: 900 },
  // OHIO
  { id: "oh-columbus", state: "OH", stateName: "Ohio", city: "Columbus", climateZone: "5A", winterDb99: 6, winterDb996: 0, summerDb04: 89, summerDb10: 86, summerWb04: 73, elevationFt: 812 },
  { id: "oh-cleveland", state: "OH", stateName: "Ohio", city: "Cleveland", climateZone: "5A", winterDb99: 7, winterDb996: 2, summerDb04: 87, summerDb10: 84, summerWb04: 72, elevationFt: 791 },
  { id: "oh-cincinnati", state: "OH", stateName: "Ohio", city: "Cincinnati", climateZone: "4A", winterDb99: 9, winterDb996: 3, summerDb04: 89, summerDb10: 87, summerWb04: 74, elevationFt: 883 },
  // OKLAHOMA
  { id: "ok-oklahoma-city", state: "OK", stateName: "Oklahoma", city: "Oklahoma City", climateZone: "3A", winterDb99: 14, winterDb996: 8, summerDb04: 99, summerDb10: 96, summerWb04: 74, elevationFt: 1290 },
  // OREGON
  { id: "or-portland", state: "OR", stateName: "Oregon", city: "Portland", climateZone: "4C", winterDb99: 27, winterDb996: 22, summerDb04: 88, summerDb10: 84, summerWb04: 67, elevationFt: 30 },
  // PENNSYLVANIA
  { id: "pa-philadelphia", state: "PA", stateName: "Pennsylvania", city: "Philadelphia", climateZone: "4A", winterDb99: 15, winterDb996: 11, summerDb04: 91, summerDb10: 89, summerWb04: 75, elevationFt: 30 },
  { id: "pa-pittsburgh", state: "PA", stateName: "Pennsylvania", city: "Pittsburgh", climateZone: "5A", winterDb99: 7, winterDb996: 2, summerDb04: 87, summerDb10: 85, summerWb04: 72, elevationFt: 1150 },
  // RHODE ISLAND
  { id: "ri-providence", state: "RI", stateName: "Rhode Island", city: "Providence", climateZone: "5A", winterDb99: 10, winterDb996: 5, summerDb04: 88, summerDb10: 85, summerWb04: 73, elevationFt: 55 },
  // SOUTH CAROLINA
  { id: "sc-charleston", state: "SC", stateName: "South Carolina", city: "Charleston", climateZone: "2A", winterDb99: 29, winterDb996: 25, summerDb04: 93, summerDb10: 91, summerWb04: 78, elevationFt: 46 },
  // SOUTH DAKOTA
  { id: "sd-sioux-falls", state: "SD", stateName: "South Dakota", city: "Sioux Falls", climateZone: "6A", winterDb99: -10, winterDb996: -16, summerDb04: 90, summerDb10: 87, summerWb04: 73, elevationFt: 1428 },
  // TENNESSEE
  { id: "tn-nashville", state: "TN", stateName: "Tennessee", city: "Nashville", climateZone: "4A", winterDb99: 17, winterDb996: 11, summerDb04: 92, summerDb10: 90, summerWb04: 75, elevationFt: 590 },
  { id: "tn-memphis", state: "TN", stateName: "Tennessee", city: "Memphis", climateZone: "3A", winterDb99: 20, winterDb996: 15, summerDb04: 95, summerDb10: 93, summerWb04: 77, elevationFt: 332 },
  // TEXAS
  { id: "tx-houston", state: "TX", stateName: "Texas", city: "Houston (Bush)", climateZone: "2A", winterDb99: 33, winterDb996: 28, summerDb04: 96, summerDb10: 94, summerWb04: 78, elevationFt: 96 },
  { id: "tx-dallas", state: "TX", stateName: "Texas", city: "Dallas / Fort Worth", climateZone: "3A", winterDb99: 24, winterDb996: 19, summerDb04: 100, summerDb10: 98, summerWb04: 75, elevationFt: 607 },
  { id: "tx-san-antonio", state: "TX", stateName: "Texas", city: "San Antonio", climateZone: "2A", winterDb99: 32, winterDb996: 27, summerDb04: 99, summerDb10: 97, summerWb04: 76, elevationFt: 809 },
  { id: "tx-austin", state: "TX", stateName: "Texas", city: "Austin", climateZone: "2A", winterDb99: 30, winterDb996: 25, summerDb04: 99, summerDb10: 97, summerWb04: 75, elevationFt: 542 },
  { id: "tx-el-paso", state: "TX", stateName: "Texas", city: "El Paso", climateZone: "3B", winterDb99: 25, winterDb996: 21, summerDb04: 100, summerDb10: 98, summerWb04: 64, elevationFt: 3958 },
  // UTAH
  { id: "ut-salt-lake-city", state: "UT", stateName: "Utah", city: "Salt Lake City", climateZone: "5B", winterDb99: 14, winterDb996: 8, summerDb04: 97, summerDb10: 94, summerWb04: 63, elevationFt: 4227 },
  // VERMONT
  { id: "vt-burlington", state: "VT", stateName: "Vermont", city: "Burlington", climateZone: "6A", winterDb99: -7, winterDb996: -13, summerDb04: 86, summerDb10: 83, summerWb04: 71, elevationFt: 334 },
  // VIRGINIA
  { id: "va-richmond", state: "VA", stateName: "Virginia", city: "Richmond", climateZone: "4A", winterDb99: 18, winterDb996: 13, summerDb04: 93, summerDb10: 90, summerWb04: 76, elevationFt: 167 },
  { id: "va-norfolk", state: "VA", stateName: "Virginia", city: "Norfolk / VA Beach", climateZone: "4A", winterDb99: 24, winterDb996: 19, summerDb04: 92, summerDb10: 89, summerWb04: 77, elevationFt: 26 },
  // WASHINGTON
  { id: "wa-seattle", state: "WA", stateName: "Washington", city: "Seattle (Sea-Tac)", climateZone: "4C", winterDb99: 28, winterDb996: 23, summerDb04: 84, summerDb10: 81, summerWb04: 66, elevationFt: 429 },
  { id: "wa-spokane", state: "WA", stateName: "Washington", city: "Spokane", climateZone: "5B", winterDb99: 3, winterDb996: -4, summerDb04: 92, summerDb10: 89, summerWb04: 62, elevationFt: 2372 },
  // WEST VIRGINIA
  { id: "wv-charleston", state: "WV", stateName: "West Virginia", city: "Charleston", climateZone: "4A", winterDb99: 12, winterDb996: 6, summerDb04: 89, summerDb10: 87, summerWb04: 74, elevationFt: 981 },
  // WISCONSIN
  { id: "wi-milwaukee", state: "WI", stateName: "Wisconsin", city: "Milwaukee", climateZone: "5A", winterDb99: -1, winterDb996: -7, summerDb04: 87, summerDb10: 84, summerWb04: 73, elevationFt: 672 },
  { id: "wi-madison", state: "WI", stateName: "Wisconsin", city: "Madison", climateZone: "6A", winterDb99: -6, winterDb996: -12, summerDb04: 88, summerDb10: 85, summerWb04: 73, elevationFt: 863 },
  // WYOMING
  { id: "wy-cheyenne", state: "WY", stateName: "Wyoming", city: "Cheyenne", climateZone: "6B", winterDb99: -4, winterDb996: -11, summerDb04: 88, summerDb10: 85, summerWb04: 58, elevationFt: 6156 },
  // CANADA (Top Metros)
  { id: "ca-toronto", state: "ON", stateName: "Ontario (CA)", city: "Toronto (Pearson)", climateZone: "5A", winterDb99: 1, winterDb996: -4, summerDb04: 88, summerDb10: 85, summerWb04: 72, elevationFt: 568 },
  { id: "ca-montreal", state: "QC", stateName: "Quebec (CA)", city: "Montreal (Trudeau)", climateZone: "6A", winterDb99: -7, winterDb996: -13, summerDb04: 86, summerDb10: 83, summerWb04: 71, elevationFt: 118 },
  { id: "ca-vancouver", state: "BC", stateName: "British Columbia (CA)", city: "Vancouver (YVR)", climateZone: "4C", winterDb99: 25, winterDb996: 20, summerDb04: 79, summerDb10: 76, summerWb04: 64, elevationFt: 14 },
  { id: "ca-calgary", state: "AB", stateName: "Alberta (CA)", city: "Calgary", climateZone: "7", winterDb99: -18, winterDb996: -25, summerDb04: 84, summerDb10: 80, summerWb04: 59, elevationFt: 3556 },
];

export function findLocationById(id: string): AshraeLocationData | undefined {
  return ashraeClimaticDataset.find((loc) => loc.id === id);
}

export function searchLocations(query: string): AshraeLocationData[] {
  const rawQ = query.toLowerCase().trim();
  if (!rawQ) return ashraeClimaticDataset;
  const q = rawQ.replace(/^zone\s+/i, "");
  return ashraeClimaticDataset.filter(
    (loc) =>
      loc.city.toLowerCase().includes(rawQ) ||
      loc.city.toLowerCase().includes(q) ||
      loc.state.toLowerCase().includes(rawQ) ||
      loc.stateName.toLowerCase().includes(rawQ) ||
      loc.climateZone.toLowerCase().includes(q) ||
      `zone ${loc.climateZone.toLowerCase()}`.includes(rawQ)
  );
}
