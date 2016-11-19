namespace PlaykaitSPL.Controllers {

    export class DeleteExpenseController {
        public expense: PlaykaitSPL.Interfaces.ICabinExpense;
        constructor(public id,
            public expenseName,
            public expenseType,
            public amount,
            public datePurchased,
            private expenseService: PlaykaitSPL.Services.ExpenseService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: ng.ui.IStateService) {
        }

        public confirmDelete() {
            this.expenseService.deleteExpense(this.id).then(() => {
                this.$uibModalInstance.close();
                this.$state.go('expenses', {}, { reload: true });
            });
        }

        public dismissModal() {
            this.$uibModalInstance.close();
        }
    }
}