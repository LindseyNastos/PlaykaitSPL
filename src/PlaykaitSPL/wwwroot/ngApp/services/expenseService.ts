namespace PlaykaitSPL.Services {

    export class ExpenseService {
        private ExpenseResource;
        constructor($resource: ng.resource.IResourceService) {
            this.ExpenseResource = $resource('/api/expenses/:id');
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
    }
    angular.module("PlaykaitSPL").service("expenseService", ExpenseService);

}
