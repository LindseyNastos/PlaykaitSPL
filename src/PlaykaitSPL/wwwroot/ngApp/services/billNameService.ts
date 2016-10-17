namespace PlaykaitSPL.Services {

    export class BillNameService {
        private BillNameResource;
        constructor($resource: ng.resource.IResourceService) {
            this.BillNameResource = $resource('/api/billNames/:id');
        }

        public listBillNames() {
            return this.BillNameResource.query().$promise;
        }

        public saveBillName(name) {
            return this.BillNameResource.save(name).$promise;
        }

        public deleteBillName(id: number) {
            return this.BillNameResource.delete({ id: id }).$promise;
        }
    }
    angular.module("PlaykaitSPL").service("billNameService", BillNameService);

}
