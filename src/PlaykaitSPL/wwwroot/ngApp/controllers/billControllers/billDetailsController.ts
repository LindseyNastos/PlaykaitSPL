namespace PlaykaitSPL.Controllers {
    export class BillDetailsController {
        public bill: PlaykaitSPL.Interfaces.ICabinBill;

        constructor(private billService: PlaykaitSPL.Services.BillService,
            private $stateParams: ng.ui.IStateParamsService,
            private $uibModal: angular.ui.bootstrap.IModalService) {
            this.getBill();
        }

        public getBill() {
            this.billService.getBill(this.$stateParams['id']).then((data) => {
                this.bill = data;
            });
        }

        public showDeleteModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/bills/deleteBillModal.html',
                controller: PlaykaitSPL.Controllers.DeleteBillController,
                controllerAs: 'modal',
                resolve: {
                    id: () => this.bill.id,
                    billName: () => this.bill.billName.name,
                    amount: () => this.bill.amount,
                    datePaid: () => this.bill.datePaid
                }
            });
        }
    }

}