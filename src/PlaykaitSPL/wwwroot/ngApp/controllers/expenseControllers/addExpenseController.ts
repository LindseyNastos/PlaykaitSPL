namespace PlaykaitSPL.Controllers {

    export class AddExpenseController {
        public newExpense: PlaykaitSPL.Interfaces.ICabinExpense;
        public expenseTypes;

        constructor(private expenseService: PlaykaitSPL.Services.ExpenseService, private expenseTypesService: PlaykaitSPL.Services.ExpenseTypeService) {
            this.getExpenseTypes();
        }

        public addExpense() {
            this.expenseService.saveExpense(this.newExpense);
        }

        public getExpenseTypes() {
            this.expenseTypesService.listExpenseTypes().then((data) => {
                this.expenseTypes = data;
            });
        }
    }

}