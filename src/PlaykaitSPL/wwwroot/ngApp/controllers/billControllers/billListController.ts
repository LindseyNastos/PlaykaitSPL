namespace PlaykaitSPL.Controllers {

    export class BillListController {
        public bills: PlaykaitSPL.Interfaces.ICabinBill[];
        public billNames: PlaykaitSPL.Interfaces.IBillName[];
        public numUnpaid: number;
        public priceMin: number;
        public priceMax: number;
        public priceErrors: boolean;

        constructor(
            private billService: PlaykaitSPL.Services.BillService,
            private billNameService: PlaykaitSPL.Services.BillNameService,
            private $uibModal: angular.ui.bootstrap.IModalService) {
            this.getBills();
            this.getBillNames();
        }
        
        public getBills() {
            this.billService.listBills().then((data) => {
                this.bills = data;
                let unpaid = 0;
                for (let b of this.bills) {
                    if (b.paid == false) {
                        unpaid++;
                    }
                }
                this.numUnpaid = unpaid;
            });
        }

        public getBillNames() {
            this.billNameService.listBillNames().then((data) => {
                this.billNames = data;
            });
        }

        public showDeleteModal(bill:PlaykaitSPL.Interfaces.ICabinBill) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/bills/deleteBillModal.html',
                controller: PlaykaitSPL.Controllers.DeleteBillController,
                controllerAs: 'modal',
                resolve: {
                    id: () => bill.id,
                    billName: () => bill.billName.name,
                    amount: () => bill.amount,
                    datePaid: () => bill.datePaid
                }
            });
        }

        public restoreBill(id: number) {
            return this.billService.restoreBill(id).then(() => {
                this.getBills();
            });
        }

        //BILL FILTERS

        public billsByMonth(month: number) {
            this.billService.billsByMonth(month).then((data) => {
                this.bills = data;
            });
        }

        public billsByBillName(id) {
            this.billService.billsByBillName(id).then((data) => {
                this.bills = data;
            });
        }

        public billsByPrice() {
            if (!this.priceMin || !this.priceMax) {
                this.priceErrors = true;
            } else {
                this.priceErrors = false;
                this.billService.billsByPrice(this.priceMin, this.priceMax).then((data) => {
                    this.bills = data;
                });
            }

        }

        public filterByPaymentStatus(status: boolean) {
            return this.billService.billsByPaymentStatus(status).then((data) => {
                this.bills = data;
            });
        }

        public getDeletedBills() {
            return this.billService.deletedBills().then((data) => {
                this.bills = data;
            });
        }

    }

}