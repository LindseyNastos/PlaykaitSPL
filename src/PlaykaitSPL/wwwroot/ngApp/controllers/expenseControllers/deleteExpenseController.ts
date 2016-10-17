namespace PlaykaitSPL.Controllers {

    export class ExpenseDeleteController {
        public expense: PlaykaitSPL.Interfaces.ICabinExpense;
        constructor(private expenseService: PlaykaitSPL.Services.ExpenseService, private $stateParams: ng.ui.IStateParamsService) {
            this.getExpense();
        }

        public getExpense() {
            this.expenseService.getExpense(this.$stateParams['id']).then((data) => {
                this.expense = data;
            });
        }

        public deleteBill() {
            this.expenseService.deleteExpense(this.expense.id).then(() => { });
        }
    }

}