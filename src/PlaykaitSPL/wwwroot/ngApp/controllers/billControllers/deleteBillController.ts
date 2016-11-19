namespace PlaykaitSPL.Controllers {

    export class DeleteBillController {
        public bill: PlaykaitSPL.Interfaces.ICabinBill;

        constructor(public id,
            public billName,
            public amount,
            public datePaid,
            private billService: PlaykaitSPL.Services.BillService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: ng.ui.IStateService) {
        }

        public confirmDelete() {
            this.billService.deleteBill(this.id).then(() => {
                this.$uibModalInstance.close();
                this.$state.go('bills', {}, { reload: true });
            });
        }

        public dismissModal() {
            this.$uibModalInstance.close();
        }
    }
}