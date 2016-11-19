namespace PlaykaitSPL.Controllers {

    export class ExpenseListController {
        public expenses: PlaykaitSPL.Interfaces.ICabinExpense[];
        public expenseTypes: PlaykaitSPL.Interfaces.IExpenseType[];
        public priceMin: number;
        public priceMax: number;
        public priceErrors: boolean;

        constructor(private expenseService: PlaykaitSPL.Services.ExpenseService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private expenseTypeService: PlaykaitSPL.Services.ExpenseTypeService) {
            this.getExpenses();
            this.getExpenseTypes();
        }

        public getExpenses() {
            this.expenseService.listExpenses().then((data) => {
                this.expenses = data;
            });
        }

        public getExpenseTypes() {
            this.expenseTypeService.listExpenseTypes().then((data) => {
                this.expenseTypes = data;
            });
        }

        public showDeleteModal(exp: PlaykaitSPL.Interfaces.ICabinExpense) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/expenses/deleteExpenseModal.html',
                controller: PlaykaitSPL.Controllers.DeleteExpenseController,
                controllerAs: 'modal',
                resolve: {
                    id: () => exp.id,
                    expenseName: () => exp.expenseName,
                    expenseType: () => exp.expenseType.name,
                    amount: () => exp.amount,
                    datePurchased: () => exp.datePurchased
                }
            });
        }

        public restoreExpense(id: number) {
            return this.expenseService.restoreExpense(id).then(() => {
                this.getExpenses();
            });
        }

        // EXPENSE FILTERS

        public expensesByMonth(month: number) {
            this.expenseService.expensesByMonth(month).then((data) => {
                this.expenses = data;
            });
        }

        public expensesByType(id) {
            this.expenseService.expensesByType(id).then((data) => {
                this.expenses = data;
            });
        }

        public expensesByPrice() {
            if (!this.priceMin || !this.priceMax) {
                this.priceErrors = true;
            } else {
                this.priceErrors = false;
                this.expenseService.expensesByPrice(this.priceMin, this.priceMax).then((data) => {
                    this.expenses = data;
                });
            }

        }

        public getDeletedExpenses() {
            return this.expenseService.deletedExpenses().then((data) => {
                this.expenses = data;
            });
        }

    }

}