namespace PlaykaitSPL.Controllers {
    export class AddBillNameController {
        public newBillName: PlaykaitSPL.Interfaces.IBillName;

        constructor(
            private billNameService: PlaykaitSPL.Services.BillNameService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: ng.ui.IStateService) {
        }

        public addNewBillName() {
            this.billNameService.saveBillName(this.newBillName).then(() => {
                this.$uibModalInstance.close();
                this.$state.go('manage.billNames', {}, { reload: true });
            });
        }

        public dismissModal() {
            this.$uibModalInstance.close();
        }
    }
}