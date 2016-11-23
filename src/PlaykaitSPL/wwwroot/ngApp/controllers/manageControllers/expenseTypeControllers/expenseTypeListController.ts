namespace PlaykaitSPL.Controllers {
    export class ExpenseTypeListController {
        public expenseTypes: PlaykaitSPL.Interfaces.IExpenseType[];

        constructor(private expenseTypeService: PlaykaitSPL.Services.ExpenseTypeService) {
            this.getTypes();
        }

        private getTypes() {
            this.expenseTypeService.listExpenseTypes().then((data) => {
                this.expenseTypes = data;
            });
        }
    }
}