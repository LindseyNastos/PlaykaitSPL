namespace PlaykaitSPL.Controllers {
    export class ManageController {
        public expenseTypes: PlaykaitSPL.Interfaces.IExpenseType[];
        public billNames: PlaykaitSPL.Interfaces.IBillName[];

        constructor(private expenseTypeService: PlaykaitSPL.Services.ExpenseTypeService,
            private billNameService: PlaykaitSPL.Services.BillNameService,
            private $uibModal: angular.ui.bootstrap.IModalService) {
            this.getTypes();
            this.getBillNames();
        }

        private getTypes() {
            this.expenseTypeService.listExpenseTypes().then((data) => {
                this.expenseTypes = data;
            });
        }

        private getBillNames() {
            this.billNameService.listBillNames().then((data) => {
                this.billNames = data;
            });
        }

        public addBillName() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/manage/billNames/addBillNameModal.html',
                controller: PlaykaitSPL.Controllers.AddBillNameController,
                controllerAs: 'modal'
            });
        }

        public addExpenseType() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/manage/expenseTypes/addExpenseTypeModal.html',
                controller: PlaykaitSPL.Controllers.AddExpenseTypeController,
                controllerAs: 'modal'
            });
        }

        public editBillName(billName: PlaykaitSPL.Interfaces.IBillName) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/manage/billNames/editBillNameModal.html',
                controller: PlaykaitSPL.Controllers.EditBillNameController,
                controllerAs: 'modal',
                resolve: {
                    id: () => billName.id,
                    name: () => billName.name
                }
            });
        }

        public editExpenseType(expType: PlaykaitSPL.Interfaces.IExpenseType) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/manage/expenseTypes/editExpenseTypeModal.html',
                controller: PlaykaitSPL.Controllers.EditExpenseTypeController,
                controllerAs: 'modal',
                resolve: {
                    id: () => expType.id,
                    name: () => expType.name
                }
            });
        }

        public deleteBillName(billName: PlaykaitSPL.Interfaces.IBillName) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/manage/billNames/deleteBillNameModal.html',
                controller: PlaykaitSPL.Controllers.DeleteBillNameController,
                controllerAs: 'modal',
                resolve: {
                    id: () => billName.id,
                    name: () => billName.name
                }
            });
        }

        public deleteExpenseType(expType: PlaykaitSPL.Interfaces.IExpenseType) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/manage/expenseTypes/deleteExpenseTypeModal.html',
                controller: PlaykaitSPL.Controllers.DeleteExpenseTypeController,
                controllerAs: 'modal',
                resolve: {
                    id: () => expType.id,
                    name: () => expType.name
                }
            });
        }
    }
}