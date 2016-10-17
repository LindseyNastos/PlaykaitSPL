namespace PlaykaitSPL.Controllers {

    export class ExpenseListController {
        public expenses: PlaykaitSPL.Interfaces.ICabinExpense[];
        constructor(private expenseService: PlaykaitSPL.Services.ExpenseService) {
            this.getExpenses();
        }

        public getExpenses() {
            this.expenseService.listExpenses().then((data) => {
                this.expenses = data;
            });
        }
    }

}