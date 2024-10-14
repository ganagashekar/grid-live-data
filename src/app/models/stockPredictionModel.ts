export interface StockPredicitonModel {
          symbol : string;
          bulishCount :number;
          bearishCount :number;
          ltt :Date
          candleResult_Price :number;
          candleResult_Match :number;
          candleResult_Size :number;
          candleResult_Body :number;
          candleResult_UpperWick :number;
          candleResult_LowerWick :number;
          candleResult_BodyPct :number;
          candleResult_UpperWickPct :number;
          candleResult_LowerWickPct:number;
          candleResult_IsBullish :boolean;
          candleResult_IsBearish :boolean;
          candleResult_Volume :number;
          macdresult_Macd :number;
          macdresult_Signal :number;
          macdresult_FastEma :number;
          macdresult_SlowEma :number;
          macdresult_Rsi :number;
          volatilityresults_Sar :number;
          volatilityresults_UpperBand :number;
          volatilityresults_LowerBand :number;
          volatilityresults_IsStop :string;
          stock_Name :string;
          stockCode:string;
}
