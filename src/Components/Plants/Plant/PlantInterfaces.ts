export interface PlantResults {
  plant: Plant

}

export interface Plant {
    plantName: string;
    plantType: string;
    sunRequirement: string;
    waterNeeds: string;
    plantCare: string;

}

//  export enum sunRequirement {
//   FullSun = "Full Sun",
//   Partial = "Partial Sun/Shade",
//   FullShade = "Full Shade"
// }



//  export enum waterNeeds {
//   Reg = "Regularly",
//   Infreq = "Infrequently"
// }