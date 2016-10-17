namespace PlaykaitSPL.Controllers {

    export class BillListController {
        public bills: PlaykaitSPL.Interfaces.ICabinBill[];

        constructor(private billService: PlaykaitSPL.Services.BillService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.getBills();
        }

        public getBills() {
            this.billService.listBills().then((data) => {
                this.bills = data;
            });
        }

        public billsByMonth(month: number) {
            this.billService.billsByMonth(month).then((data) => {
                this.bills = data;
            });
        }

        public billsByBill() {

        }

        public billsByPrice() {

        }

        public unpaidBills() {

        }

        public deletedBills() {

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
    }

}