namespace PlaykaitSPL.Controllers {

    export class EditBillController {
        public bill: PlaykaitSPL.Interfaces.ICabinBill;
        public billNames;
        public monthNames = [];
        public selectedMonth;
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

        constructor(private billService: PlaykaitSPL.Services.BillService,
            private billNameService: PlaykaitSPL.Services.BillNameService,
            private $stateParams: ng.ui.IStateParamsService,
            private $state: ng.ui.IStateService,
            private filepickerService,
            private $scope: ng.IScope) {
            this.getBill();
            this.getBillNames();
            //this.today();
            this.toggleMin();
            this.monthDropdown();
        }

        public monthDropdown() {
            for (let m = 0; m < 12; m++) {
                this.monthNames.push(PlaykaitSPL.Interfaces.MonthEnum[m]);
            }
        }

        public getBillNames() {
            this.billNameService.listBillNames().then((data) => {
                this.billNames = data;
            });
        }

        public getBill() {
            this.billService.getBill(this.$stateParams['id']).then((data) => {
                this.bill = data;
                this.selectedMonth = PlaykaitSPL.Interfaces.MonthEnum[this.bill.monthNum - 1];
                this.billCheck();
                this.today();
            });
        }

        public trimDate() {
            var date = this.bill.datePaid;
            var dateTrim = date.substring(0, 10);
            var newDate = new Date(dateTrim);
            return newDate;
        }

        public billCheck() {
            if (this.bill.paid == true) {
                this.isPaid = "true";
                this.dt = this.trimDate();
                let showDate = <HTMLInputElement>document.getElementById('datePopup');
                showDate.style.display = "";
            } else {
                this.isPaid = "false";
            }
        }

        public editBill() {
            if (this.bill.paid == true) {
                this.bill.datePaid = this.dt;
            }
            if (this.file) {
                this.bill.scannedImage = this.file.url;
            }
            for (let m in PlaykaitSPL.Interfaces.MonthEnum) {
                for (let m = 0; m < Object.keys(PlaykaitSPL.Interfaces.MonthEnum).length; m++) {
                    if (PlaykaitSPL.Interfaces.MonthEnum[m] == this.selectedMonth) {
                        this.bill.monthNum = m + 1;
                        console.log(this.bill.monthNum);
                    }
                }
            }
            this.billService.saveBill(this.bill).then((data) => {
                this.$state.go("bill-details", { id: data.id });
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
            if (!this.dt) {
                this.dt = new Date();
            }
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