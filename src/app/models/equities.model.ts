export interface Equities {
  symbol:     string;
  open:       number;
  last:       number;
  high:       number;
  low:        number;
  change:     number;
  bPrice:     number;
  bQty:       number;
  sPrice:     number;
  sQty:       number;
  ltq:        number;
  avgPrice:   number;
  quotes:     string;
  ttq:        number;
  totalBuyQt: number;
  totalSellQ: number;
  ttv:        string;
  trend:      string;
  lowerCktLm: number;
  upperCktLm: number;
  ltt:        string;
  close:      number;
  exchange:   string;
  stock_name: string;
  data:any;
  dataPoint:any;
  href:any;
  min:number;
  max:number;
  recmdtn:string;
  int_open :number;
  int_last:number;

  return1w :number;
  return1m :number;
  return3m : number;
  noofrec : string;
  beta :string ;

  eps:string;
  target:string;
  stockdetailshref:string;
  secId:string;
  isfavorite:number;
  isenabledforautoTrade:boolean
  volumeC:string;


return6m:number;
return1Year:number;
returnYTD:number;
priceChange_Day:number;
priceChange_1w:number;
priceChange_1m:number;
priceChange_3m:number;
priceChange_6m:number;
priceChange_1year:number;
priceChange_YTD:number;
price52Weekslow:number;
price52Weekshigh:number;
isLowerCircuite:number;
isUpperCircuite:number;
securityId:string;
buyatChange:string;
tdays:string;
wacthList:string;

pr_change :string
pr_close:string
pr_open:string
pr_volume:string;
pr_date:string;


pr_Match:string,
pr_Macresult:string,
pr_RSI:string,

bullishCount:number;
bearishCount:number;
match:string;
awardCount:number
last7DaysChange :string;


 fn_eps :number
 oPM_Percentage :number
 nPM_Percentage :number
 profit_Increase :number
 revenueIncrease :number
 profitDifference :number
 revenueDifference :number
quarterEnd :Date
rowcount:number
futurePercentage :number
quaterlyResults :string
isIncludeDeleted : number
}
