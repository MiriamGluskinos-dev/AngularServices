import { ConcentratedData } from './ConentrateData'
import { SystemTable } from './SystemTable';


export class ConcentratedServiceResult{
    public records:ConcentratedData[];
}


export class ConcentratedServiceData{
    public result:ConcentratedServiceResult;
}

export class SystemTablesServiceResult{
    public records:SystemTable[];
}


export class SystemTablesServiceData{
    public result:SystemTablesServiceResult;
}

