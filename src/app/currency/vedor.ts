export class Vendor
{
    
    public vendorTypeID: number;
    public VendorTypeIDName: string;
    public vendorID: number;
    public vendorName: string;
    public dunsNumberSpecified: boolean;
    public licensedDealerNumber: string;
    public englishCountryID: string;
    public englishCountryName: string;
    public englishSubCountryID:number;
    public englishSubCountryName:string;
    public statusID: number;
    public statusName: string;
    public Address: string[];
 

    constructor( 
        vendorTypeID: number,
        VendorTypeIDName: string,
        vendorID: number,
        vendorName: string,
        dunsNumberSpecified: boolean,
        licensedDealerNumber: string,
        englishCountryID: string,
        englishCountryName: string,
        englishSubCountryID:number,
        englishSubCountryName:string,
        statusID: number,
        statusName: string,
        Address: string[],
     )
           
    {
        
       this.vendorTypeID =vendorTypeID;
       this.VendorTypeIDName=VendorTypeIDName;
       this.vendorID=vendorID;
       this.vendorName=vendorName;
       this.dunsNumberSpecified=dunsNumberSpecified;
       this.licensedDealerNumber=licensedDealerNumber;
       this.englishCountryID=englishCountryID;
       this.englishCountryName=englishCountryName;
       this.englishSubCountryID=englishSubCountryID;
       this.englishSubCountryName=englishSubCountryName;
       this.statusID=statusID;
       this.statusName=statusName;
       this.Address=Address;
    }


   
  


}