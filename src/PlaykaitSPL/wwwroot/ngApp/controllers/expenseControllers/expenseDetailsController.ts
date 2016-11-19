namespace PlaykaitSPL.Controllers {

    export class ExpenseDetailsController {
        public expense: PlaykaitSPL.Interfaces.ICabinExpense;

        constructor(private expenseService: PlaykaitSPL.Services.ExpenseService,
            private $stateParams: ng.ui.IStateParamsService,
            private $uibModal: angular.ui.bootstrap.IModalService) {
            this.getExpense();
        }

        public getExpense() {
            this.expenseService.getExpense(this.$stateParams['id']).then((data) => {
                this.expense = data;
            });
        }

        public showDeleteModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/expenses/deleteExpenseModal.html',
                controller: PlaykaitSPL.Controllers.DeleteExpenseController,
                controllerAs: 'modal',
                resolve: {
                    id: () => this.expense.id,
                    expenseName: () => this.expense.expenseName,
                    expenseType: () => this.expense.expenseType.name,
                    amount: () => this.expense.amount,
                    datePurchased: () => this.expense.datePurchased
                }
            });
        }
    }

}