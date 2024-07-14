export class CurrencyGate {

    public startDate: string;
    public endDate: string;
    public currencyTypeID: string;
    public currencyTypeName: string;
    public customsCurrencyRate: string;





    constructor(
        startDate: string,
        endDate: string,
        currencyTypeID: string,
        currencyTypeName: string,
        customsCurrencyRate: string

    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.currencyTypeID = currencyTypeID;
        this.currencyTypeName = currencyTypeName;
        this.customsCurrencyRate = customsCurrencyRate;


    }


    get displayText(): string {

        if (this.currencyTypeID == undefined)
            return this.currencyTypeName;

        return `${this.currencyTypeID} - ${this.currencyTypeName}`;
    }




}