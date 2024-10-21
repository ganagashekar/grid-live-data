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
    psUName:string|any



}