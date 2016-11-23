namespace PlaykaitSPL.Controllers {
    export class DeleteExpenseTypeController {
        public expType: PlaykaitSPL.Interfaces.IExpenseType;

        constructor(private id,
            public name,
            private expenseTypeService: PlaykaitSPL.Services.ExpenseTypeService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: ng.ui.IStateService) {
        }

        public confirmDelete() {
            this.expenseTypeService.deleteExpenseType(this.id).then(() => {
                this.$uibModalInstance.close();
                this.$state.go('manage.expenseTypes', {}, { reload: true });
            });
        }

        public dismissModal() {
            this.$uibModalInstance.close();
        }
    }
}