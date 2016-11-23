namespace PlaykaitSPL.Controllers {
    export class EditExpenseTypeController {

        constructor(private id,
            public name,
            private expenseTypeService: PlaykaitSPL.Services.ExpenseTypeService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: ng.ui.IStateService) {
        }

        public updateExpenseType() {
            let expType = new PlaykaitSPL.Interfaces.ExpenseType();
            expType.id = this.id;
            expType.name = this.name;
            this.expenseTypeService.saveExpenseType(expType).then(() => {
                this.$uibModalInstance.close();
                this.$state.go('manage.expenseTypes', {}, { reload: true });
            });
        }

        public dismissModal() {
            this.$uibModalInstance.close();
        }
    }
}