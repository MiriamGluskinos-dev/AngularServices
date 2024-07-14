export class ConcentratedData {

    // public _id: string;
    // public  ID: string;
    // public Category1: string;
    // public Category2: string;
    // public product: string;
    // public UpTo75_: string;
    // public From75_To500_: string;
    // public From500_To1000_: string;
    // public Over1000_: string;

    // constructor(
    //     ID: string,
    //     mainCategory: string,
    //     childCategory: string,
    //     productName: string,
    //     UpTo75: string,
    //     From75$To500$: string,
    //     From500$To1000$: string,
    //     Over1000: string
    // ) {
    //     this.ID =  ID;
    //     this.Category1 = mainCategory;
    //     this.Category2 = childCategory;
    //     this.product = productName;
    //     this.UpTo75_ = UpTo75;
    //     this. From75_To500_ =  From75$To500$;
    //     this.From500_To1000_ = From500$To1000$;
    //     this.Over1000_ = Over1000;

    // }

    // get searchText():string{

    //     return ` | ${this.Category2} - ${this.Category1}`;
    // }
    public _id: string;
    public  ID: string;
    public ProductLevel1: string;
    public ProductLevel2: string;
    public ProductLevel3: string;
    public Category1Taxes1: string;
    public Category1Taxes2: string;
    public Category1Taxes3: string;
    public Category1Taxes4: string;

    constructor(
        ID: string,
        mainCategory: string,
        childCategory: string,
        productName: string,
        UpTo75: string,
        From75$To500$: string,
        From500$To1000$: string,
        Over1000: string
    ) {
        this.ID =  ID;
        this.ProductLevel1 = mainCategory;
        this.ProductLevel2 = childCategory;
        this.ProductLevel3 = productName;
        this.Category1Taxes1 = UpTo75;
        this. Category1Taxes2 =  From75$To500$;
        this.Category1Taxes3 = From500$To1000$;
        this.Category1Taxes4 = Over1000;

    }

    get searchText():string{

        return ` | ${this.ProductLevel2} - ${this.ProductLevel1}`;
    }

}
