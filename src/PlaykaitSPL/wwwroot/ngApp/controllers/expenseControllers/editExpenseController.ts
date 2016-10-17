namespace PlaykaitSPL.Controllers {

    export class EditExpenseController {
        public expense: PlaykaitSPL.Interfaces.ICabinExpense;
        constructor(private expenseService: PlaykaitSPL.Services.ExpenseService, private $stateParams: ng.ui.IStateParamsService) {
            this.getExpense();
        }

        public getExpense() {
            this.expenseService.getExpense(this.$stateParams['id']).then((data) => {
                this.expense = data;
            });
        }

        public editExpense() {
            this.expenseService.saveExpense(this.expense).then(() => { });
        }
    }

}