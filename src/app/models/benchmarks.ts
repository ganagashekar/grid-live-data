export interface Benchmarks {
id:number,
securityId :string,
last :number,
stockcode:string,
benchmarkReturn :number,
totalReturn :number,
winRate :number,
bestTrade :number,
worstTrade :number,
avgWinningTrade :number,
avgLosingTrade :number,
avgLosingTradeDuration  :number,
avgWinningTradeDuration :number,
profitFactor:number,
totalTrades:number,
totalClosedTrades:number,
totalOpenTrades:number,
maxDrawdown:number,
maxDrawdownDuration:number,
expectancy:number,
buyDate:number,
createdOn:number,
bearishCount:number,
bulishCount:number,
bullishCount_100:number,
bullishCount_95:number 
}