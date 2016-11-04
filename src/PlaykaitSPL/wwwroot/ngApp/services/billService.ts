namespace PlaykaitSPL.Services {

    export class BillService {
        private BillResource;
        constructor($resource: ng.resource.IResourceService) {
            this.BillResource = $resource('/api/bills/:id', null, {
                billsByMonth: {
                    method: 'GET',
                    url: '/api/bills/BillsByMonth/:monthNum',
                    isArray: true
                },
                billsByBillName: {
                    method: 'GET',
                    url: '/api/bills/BillsByBillName/:billNameId',
                    isArray: true
                },
                billsByPaymentStatus: {
                    method: 'GET',
                    url: '/api/bills/BillsByPaymentStatus/:paymentStatus',
                    isArray: true
                },
                deletedBills: {
                    method: 'GET',
                    url: '/api/bills/DeletedBills',
                    isArray: true
                },
                restoreDeletedBill: {
                    method: 'GET',
                    url: '/api/bills/RestoreDeletedBill/:id',
                    isArray: false
                },
                billsByPrice: {
                    method: 'GET',
                    url: '/api/bills/BillsByPrice/:min/:max',
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

        public saveBill(bill: PlaykaitSPL.Interfaces.ICabinBill) {
            debugger;
            return this.BillResource.save(bill).$promise;
        }

        public deleteBill(id: number) {
            return this.BillResource.delete({ id: id }).$promise;
        }

        public billsByMonth(monthNum: number) {
            return this.BillResource.billsByMonth({ monthNum: monthNum }).$promise;
        }

        public billsByBillName(billNameId: number) {
            return this.BillResource.billsByBillName({ billNameId: billNameId }).$promise;
        }

        public billsByPaymentStatus(paymentStatus: boolean) {
            return this.BillResource.billsByPaymentStatus({ paymentStatus: paymentStatus }).$promise;
        }

        public deletedBills() {
            return this.BillResource.deletedBills().$promise;
        }

        public restoreBill(id:number) {
            return this.BillResource.restoreDeletedBill({ id: id }).$promise;
        }

        public billsByPrice(min: number, max: number) {
            return this.BillResource.billsByPrice({ min: min, max: max }).$promise;
        }
    }
    angular.module("PlaykaitSPL").service("billService", BillService);

}
