namespace PlaykaitSPL.Controllers {
    export class AddExpenseTypeController {
        public newExpenseType: PlaykaitSPL.Interfaces.IExpenseType;

        constructor(
            private expenseTypeService: PlaykaitSPL.Services.ExpenseTypeService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: ng.ui.IStateService) {
        }

        public addNewExpenseType() {
            this.expenseTypeService.saveExpenseType(this.newExpenseType).then(() => {
                this.$uibModalInstance.close();
                this.$state.go('manage.expenseTypes', {}, { reload: true });
            });
        }

        public dismissModal() {
            this.$uibModalInstance.close();
        }
    }
}