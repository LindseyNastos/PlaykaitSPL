namespace PlaykaitSPL.Interfaces {

    export interface ICabinBill {
        id: number;
        billName: IBillName;
        amount: number;
        datePaid: any; // or number????
        paid: boolean;
        monthNum: number;
        scannedImage: string;
        notes: string;
    }

    export interface ICabinExpense {
        id: number;
        expenseName: string;
        expenseType: IExpenseType;
        amount: number;
        datePurchased: any; // or number???
        monthNum: number;
        scannedImage: string;
        notes: string;
    }

    export interface IExpenseType {
        id: number;
        name: string;
    }

    export interface IBillName {
        id: number;
        name: string;
    }

    export interface IMonth {
        id: number;
        year: number;
        monthName: number; // enum
        notes: string;
        cabinBills: ICabinBill[];
        cabinExpenses: ICabinExpense[];
    }

    export interface IPayment {
        id: number;
        date: any;
        payPal: boolean;
        check: boolean;
        checkNumber: number;
    }

    export interface IReservation {
        id: number;
        contact: IContact;
        entranceCode: number;
        signedRentalAgreementDate: any;
        damageDeposit: IPayment;
        remainingRentalAmount: IPayment;
    }

    export interface IContact {
        id: number;
        streetAddress: string;
        unit: string;
        email: string;
    }

}