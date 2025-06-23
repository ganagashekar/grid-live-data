export interface NiftyOptionPnL{
    spotPrice:number;
    avgPrice:number;
    callPnL:number;
    putPnL:number;
    ltt:string;
    day:number
}



export interface IntersectionData {
  dateTime: Date;
  value: number; // PnL value at intersection
  direction: 'Call PnL Crosses Above Put PnL' | 'Call PnL Crosses Below Put PnL';
}