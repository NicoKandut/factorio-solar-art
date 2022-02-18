// VANILLA
export const TILE_SIZE_WALL = 1;
export const TILE_SIZE_ACCUMULATOR = 2;
export const TILE_SIZE_SUBSTATION = 2;
export const TILE_SIZE_SOLAR_PANEL = 3;
export const TILE_SIZE_RADAR = 3;
export const TILE_SIZE_ROBOPORT = 4;
export const TILES_PER_PIXEL = 6;
export const TILE_RANGE_SUBSTATION = 18;
export const TILE_RANGE_ROBOPORT = 50;
export const TILE_RANGE_RADAR = 218; // True range is 224. This avoids radars and roboports on the same pixel
export const PIXEL_RANGE_SUBSTATION = Math.floor(
  TILE_RANGE_SUBSTATION / TILES_PER_PIXEL
);
export const PIXEL_RANGE_ROBOPORT = Math.floor(
  TILE_RANGE_ROBOPORT / TILES_PER_PIXEL
);
export const PIXEL_RANGE_RADAR = Math.floor(TILE_RANGE_RADAR / TILES_PER_PIXEL);
export const PIXEL_RADIUS_SUBSTATION = Math.round(PIXEL_RANGE_SUBSTATION / 2);
export const PIXEL_RADIUS_ROBOPORT = Math.round(PIXEL_RANGE_ROBOPORT / 2);
export const PIXEL_RADIUS_RADAR = Math.round(PIXEL_RANGE_RADAR / 2);

// SPACE EXPLORATION
export const SE_TILES_PER_PIXEL = 4;
export const SE_TILE_SIZE_SOLAR_PANEL = 4;
export const SE_TILE_SIZE_PYLON = 2;
export const SE_TILE_SIZE_SUPERCHARGER = 4;

export const SE_TILE_RANGE_RADAR_PYLON = 256;
export const SE_TILE_RANGE_POWER_PYLON = 64 / 2; // halfed because the next one needs to be in building range
export const SE_TILE_RANGE_SUPERCHARGER = 128;

export const SE_PIXEL_RANGE_RADAR_PYLON =
  SE_TILE_RANGE_RADAR_PYLON / SE_TILES_PER_PIXEL;
export const SE_PIXEL_RANGE_POWER_PYLON =
  SE_TILE_RANGE_POWER_PYLON / SE_TILES_PER_PIXEL;
export const SE_PIXEL_RANGE_SUPERCHARGER =
  SE_TILE_RANGE_SUPERCHARGER / SE_TILES_PER_PIXEL;

export const SE_PIXEL_RADIUS_RADAR_PYLON = Math.floor(
  SE_PIXEL_RANGE_RADAR_PYLON / 2
);
export const SE_PIXEL_RADIUS_POWER_PYLON = Math.floor(
  SE_PIXEL_RANGE_POWER_PYLON / 2
);
export const SE_PIXEL_RADIUS_SUPERCHARGER = Math.floor(
  SE_PIXEL_RANGE_SUPERCHARGER / 2
);
