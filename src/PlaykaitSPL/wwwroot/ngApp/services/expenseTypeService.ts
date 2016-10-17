namespace PlaykaitSPL.Services {

    export class ExpenseTypeService {
        private ExpenseTypeResource;
        constructor($resource: ng.resource.IResourceService) {
            this.ExpenseTypeResource = $resource('/api/expenseTypes/:id');
        }

        public listExpenseTypes() {
            return this.ExpenseTypeResource.query().$promise;
        }

        public saveExpenseType(type) {
            return this.ExpenseTypeResource.save(type).$promise;
        }

        public deleteExpenseType(id: number) {
            return this.ExpenseTypeResource.delete({ id: id }).$promise;
        }
    }
    angular.module("PlaykaitSPL").service("expenseTypeService", ExpenseTypeService);

}
