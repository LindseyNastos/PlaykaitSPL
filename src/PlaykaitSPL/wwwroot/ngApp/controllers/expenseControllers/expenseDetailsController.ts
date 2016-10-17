namespace PlaykaitSPL.Controllers {

    export class ExpenseDetailsController {
        public expense: PlaykaitSPL.Interfaces.ICabinExpense;

        constructor(private expenseService: PlaykaitSPL.Services.ExpenseService, private $stateParams: ng.ui.IStateParamsService) {
            this.getExpense();
        }

        public getExpense() {
            this.expenseService.getExpense(this.$stateParams['id']).then((data) => {
                this.expense = data;
            });
        }
    }

}