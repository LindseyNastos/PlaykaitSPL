namespace PlaykaitSPL.Controllers {

    export class AddBillController {
        public newBill: PlaykaitSPL.Interfaces.ICabinBill;
        public billNames;
        public isPaid;
        public file;
        public formats: string[] = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        public format: string = this.formats[0];
        public dt;
        public events;
        public popup = { opened: false };
        public dateOptions = {
            dateDisabled: this.disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        public inlineOptions = {
            customClass: this.getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        constructor(
            private billService: PlaykaitSPL.Services.BillService,
            private billNameService: PlaykaitSPL.Services.BillNameService,
            private $state: ng.ui.IStateService,
            private filepickerService,
            private $scope: ng.IScope) {
                this.getBillNames();
                this.today();
                this.toggleMin();
        }

        public addBill() {
            if (this.isPaid == "true") {
                this.newBill.datePaid = this.dt;
                this.newBill.paid = true;
            }
            this.newBill.scannedImage = this.file.url;
            this.billService.saveBill(this.newBill).then((data) => {
                this.$state.go("bill-details", { id: data.id });
            });
        }

        public getBillNames() {
            this.billNameService.listBillNames().then((data) => {
                this.billNames = data;
            });
        }

        //Filepicker methods
        public pickFile() {
            this.filepickerService.pick(
                { mimetype: 'image/*' },
                this.fileUploaded.bind(this)
            );
        }
 
        public fileUploaded(file) {
            // save file url to database
            this.file = file;
            this.$scope.$apply(); // force page to update
        }


        //Datepicker methods
        public toggleDatePopup() {
            let yes = <HTMLInputElement>document.getElementById('datePopup');
            if (this.isPaid == "true") {
                yes.style.display = "";
            }
            else {
                yes.style.display = "none";
            }
        };

        public today() {
            this.dt = new Date();
        };

        public clear() {
            this.dt = null;
        };

        public open() {
            this.popup.opened = true;
        };

        public disabled(data) {
            let date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        public toggleMin() {
            this.inlineOptions.minDate = this.inlineOptions.minDate ? null : new Date();
            this.dateOptions.minDate = this.inlineOptions.minDate;
        };

        public setDate(year, month, day) {
            this.dt = new Date(year, month, day);
        };

        public getDayClass(data) {
            let date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                for (let i = 0; i < this.events.length; i++) {
                    let currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return this.events[i].status;
                    }
                }
            }
            return '';
        }
    }

}