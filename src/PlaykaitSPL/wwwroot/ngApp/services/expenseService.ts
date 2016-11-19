namespace PlaykaitSPL.Services {

    export class ExpenseService {
        private ExpenseResource;
        constructor($resource: ng.resource.IResourceService) {
            this.ExpenseResource = $resource('/api/expenses/:id', null, {
                expensesByMonth: {
                    method: 'GET',
                    url: '/api/expenses/ExpensesByMonth/:monthNum',
                    isArray: true
                },
                expensesByType: {
                    method: 'GET',
                    url: '/api/expenses/ExpensesByType/:expenseTypeId',
                    isArray: true
                },
                deletedExpenses: {
                    method: 'GET',
                    url: '/api/expenses/DeletedExpenses',
                    isArray: true
                },
                restoreDeletedExpense: {
                    method: 'GET',
                    url: '/api/expenses/RestoreDeletedExpense/:id',
                    isArray: false
                },
                expensesByPrice: {
                    method: 'GET',
                    url: '/api/expenses/ExpensesByPrice/:min/:max',
                    isArray: true
                }
            });
        }

        public listExpenses() {
            return this.ExpenseResource.query().$promise;
        }

        public getExpense(id: number) {
            return this.ExpenseResource.get({ id: id }).$promise;
        }

        public saveExpense(expense) {
            return this.ExpenseResource.save(expense).$promise;
        }

        public deleteExpense(id: number) {
            return this.ExpenseResource.delete({ id: id }).$promise;
        }

        public expensesByMonth(monthNum: number) {
            return this.ExpenseResource.expensesByMonth({ monthNum: monthNum }).$promise;
        }

        public expensesByType(expenseTypeId: number) {
            return this.ExpenseResource.expensesByType({ expenseTypeId: expenseTypeId }).$promise;
        }

        public deletedExpenses() {
            return this.ExpenseResource.deletedExpenses().$promise;
        }

        public restoreExpense(id: number) {
            return this.ExpenseResource.restoreDeletedExpense({ id: id }).$promise;
        }

        public expensesByPrice(min: number, max: number) {
            return this.ExpenseResource.expensesByPrice({ min: min, max: max }).$promise;
        }

    }
    angular.module("PlaykaitSPL").service("expenseService", ExpenseService);

}
