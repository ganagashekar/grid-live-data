export interface News {
    id: number;
    title: string;
    imageSource: string;
}

export interface DashboardStats{
    current_Change : number|any;
    current_advance :number|any;
    current_decline:number|any;
}

export interface main_Dashboard_Stats_Nifty{
    nifty_Put_Buying :number;
    nifty_Put_Long_Covering:number;
    nifty_Put_Short_Covering:Number;
    nifty_Put_Writing:Number;
    nifty_Call_Buying:number;
    nifty_Call_Long_Covering:number;
    nifty_Call_Short_Covering:number;
    nifty_Call_Writing:number;
    lastupdated_Nifty_Trader_Date:string;
}
export interface DashboardCountsForQTY{

    buy :number | any;
    sell:number |any;
    type:string|any;
    symbol:string|any;
    xTimes:string |any;
    lastUpdatedOn:string;
    chg:number| any;


}
export interface Maain_Dahsbaord_Stats {
    nifty_Current_AvgChange : number|any;
    nifty_Current_Advance:number|any;
    nifty_Current_Decline:number|any;
    nifty_Previous_AvgChange:number|any;
    nifty_Previous_Advance:number|any;
    nifty_Previous_Decline:number|any;
    niftyName:string|any;

    bankNifty_Current_AvgChange:number|any;
    bankNifty_Current_Advance:number|any;
    bankNifty_Current_Decline:number|any;
    bankNifty_Previous_AvgChange:number|any;
    bankNifty_Previous_Advance:number|any;
    bankNifty_Previous_Decline:number|any;
    bankNiftyName:number|any;

    option_Current_AvgChange:number|any;
    option_Current_Advance:number|any;
    option_Current_Decline:number|any;
    option_Previous_AvgChange:number|any;
    option_Previous_Advance:number|any;
    option_Previous_Decline:number|any;

    optionName:number|any;
    psU_Current_AvgChange:number|any;
    psU_Current_Advance:number|any;
    psU_Current_Decline:number|any;
    psU_Previous_AvgChange:number|any;
    psU_Previous_Advance:number|any;
    psU_Previous_Decline:number|any;
    psUName:string|any;
     financials_Advance :number|any;
     financials_Decline :number|any;
     healthcare_Advance :number|any;
     healthcare_Decline :number|any;
     industrials_Advance :number|any;
     industrials_Decline :number|any;
     technology_Advance :number|any;
     technology_Decline :number|any;
     energy_Advance :number|any;
     engery_Decline :number|any;
     realEstate_Advance :number|any;
     realEstate_Decline :number|any;
     totalSectorAvg :number|any;
     totalSectorAvg_Advance :number|any;
     totalSectorAvg_Decline :number|any;
     lastUpdateDateTime:string|any;
}

export interface Dashboard_High_low{
    isnifty_lowtrend :number|any;
    isnifty_uptrend :number|any;
    ispsu_lowtrend :number|any;
    ispsu_uptrend :number|any;
    isoptions_lowtrend :number|any;
    isoptions_uptrend :number|any;
    isbanknifty_lowtrend :number|any;
    isbanknifty_uptrend :number|any;
}


export interface Dashboard_AmountOrCHG{
    optioncall_amount :number|any;
    optioncall_CHG :number|any;
    optionput_amount :number|any;
    optionput_CHG :number|any;
    equities_amount :number|any;
    equities_CHG :number|any;
}
