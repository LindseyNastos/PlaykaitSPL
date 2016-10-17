namespace PlaykaitSPL.Services {

    export class BillService {
        private BillResource;
        constructor($resource: ng.resource.IResourceService) {
            this.BillResource = $resource('/api/bills/:id', null, {
                billsByMonth: {
                    method: 'GET',
                    url: '/api/bills/BillsByMonth/:monthNum',
                    isArray: true
                }
            });
        }

        public listBills() {
            return this.BillResource.query().$promise;
        }

        public getBill(id: number) {
            return this.BillResource.get({ id: id }).$promise;
        }

        public saveBill(bill:PlaykaitSPL.Interfaces.ICabinBill) {
            return this.BillResource.save(bill).$promise;
        }

        public deleteBill(id: number) {
            return this.BillResource.delete({ id: id }).$promise;
        }

        public billsByMonth(monthNum: number) {
            return this.BillResource.billsByMonth({ monthNum: monthNum }).$promise;
        }
    }
    angular.module("PlaykaitSPL").service("billService", BillService);

}
