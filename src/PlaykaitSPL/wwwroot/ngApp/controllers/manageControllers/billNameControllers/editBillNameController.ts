namespace PlaykaitSPL.Controllers {
    export class EditBillNameController {

        constructor(public id,
            public name,
            private billNameService: PlaykaitSPL.Services.BillNameService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: ng.ui.IStateService) {
        }

        public updateBillName() {
            let billName = new PlaykaitSPL.Interfaces.BillName();
            billName.id = this.id;
            billName.name = this.name;
            this.billNameService.saveBillName(billName).then(() => {
                this.$uibModalInstance.close();
                this.$state.go('manage.billNames', {}, { reload: true });
            });
        }

        public dismissModal() {
            this.$uibModalInstance.close();
        }
    }
}