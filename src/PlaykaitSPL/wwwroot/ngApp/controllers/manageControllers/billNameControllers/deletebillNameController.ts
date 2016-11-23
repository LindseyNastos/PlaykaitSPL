namespace PlaykaitSPL.Controllers {
    export class DeleteBillNameController {
        public billName: PlaykaitSPL.Interfaces.IBillName;

        constructor(private id,
            public name,
            private billNameService: PlaykaitSPL.Services.BillNameService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: ng.ui.IStateService) {
        }

        public confirmDelete() {
            this.billNameService.deleteBillName(this.id).then(() => {
                this.$uibModalInstance.close();
                this.$state.go('manage.billNames', {}, { reload: true });
            });
        }

        public dismissModal() {
            this.$uibModalInstance.close();
        }
    }
}