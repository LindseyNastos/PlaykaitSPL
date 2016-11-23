namespace PlaykaitSPL.Controllers {
    export class BillNameListController {
        public billNames: PlaykaitSPL.Interfaces.IBillName[];

        constructor(private billNameService: PlaykaitSPL.Services.BillNameService) {
            this.getBillNames();
        }

        private getBillNames() {
            this.billNameService.listBillNames().then((data) => {
                this.billNames = data;
            });
        }
    }
}