export type MirrorMode = "none" | "alternate" | "all";

export interface PatternSettings {
  rotationDeg: number; // rotation applied to each tile draw (deg)
  mirrorMode: MirrorMode; // how to mirror horizontally
  oddRowOffsetCm: number; // move odd rows UP by cm
  tileScale: number; // scale for the uploaded tile
  tileGapCm: number; // spacing between tiles in cm
}