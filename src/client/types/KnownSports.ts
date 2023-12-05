/**
 * An array of the known sport values, used when you need to iterate 
 *  
 */
export const KnownSportsValues = [
  "Golf",
  "Tennis",
  "Cricket",
  "Basketball",
  "Baseball",
  "American Football",
  "Aquatics",
  "Archery",
  "Automobile Racing",
  "Badminton",
  "Beach Volleyball",
  "Bobsleigh",
  "Body Building",
  "Boxing",
  "Cross Country Running",
  "Cross Country Skiing",
  "Curling",
  "Cycling",
  "Darts",
  "Decathlon",
  "Down Hill Skiing",
  "Equestrianism",
  "eSports",
  "Fencing",
  "Field Hockey",
  "Figure Skating",
  "Gymnastics",
  "Ice Hockey",
  "Martial Arts",
  "Mixed Martial Arts",
  "Modern Pentathlon",
  "Motorcycle Racing",
  "Netball",
  "Polo",
  "Racquetball",
  "Rowing",
  "Rugby",
  "Sailing",
  "Softball",
  "Shooting",
  "Skateboarding",
  "Skeet Shooting",
  "Skeleton",
  "Snow Boarding",
  "Soccer (Football)",
  "Squash",
  "Surfing",
  "Swimming",
  "Track and Field",
] as const;

/**
 * The sports as an Enum
 * @enum
 */
export type KnownSports = (typeof KnownSportsValues)[number];
