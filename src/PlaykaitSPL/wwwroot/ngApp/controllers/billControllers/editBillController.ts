namespace PlaykaitSPL.Controllers {

    export class EditBillController {
        public bill: PlaykaitSPL.Interfaces.ICabinBill;
        public billNames;
        constructor(private billService: PlaykaitSPL.Services.BillService, private billNameService: PlaykaitSPL.Services.BillNameService, private $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService) {
            this.getBill();
            this.getBillNames();
        }

        public getBillNames() {
            this.billNameService.listBillNames().then((data) => {
                this.billNames = data;
            });
        }

        public getBill() {
            this.billService.getBill(this.$stateParams['id']).then((data) => {
                this.bill = data;
            });
        }

        public editBill() {
            this.billService.saveBill(this.bill).then((data) => {
                this.$state.go("bill-details", { id: data.id });
            });
        }
    }

}