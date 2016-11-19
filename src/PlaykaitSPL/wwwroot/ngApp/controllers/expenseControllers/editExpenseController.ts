namespace PlaykaitSPL.Controllers {

    export class EditExpenseController {
        public expense: PlaykaitSPL.Interfaces.ICabinExpense;
        public expenseTypes: PlaykaitSPL.Interfaces.IExpenseType[];
        public validationErrors;
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

        constructor(private expenseService: PlaykaitSPL.Services.ExpenseService,
            private expenseTypeService: PlaykaitSPL.Services.ExpenseTypeService,
            private $stateParams: ng.ui.IStateParamsService,
            private $state: ng.ui.IStateService,
            private filepickerService,
            private $scope: ng.IScope) {
            this.getExpense();
        }

        public getExpense() {
            this.expenseService.getExpense(this.$stateParams['id']).then((data) => {
                this.expense = data;
                this.today();
                this.showDatePopup();
            });
            this.getExpenseTypes();
        }

        public showDatePopup() {
            this.dt = this.trimDate();
            let showDate = <HTMLInputElement>document.getElementById('datePopup');
            showDate.style.display = "";
        }

        public editExpense() {

            console.log(this.expense.expenseType.id);
                this.expense.datePurchased = this.dt;
                if (this.file) {
                    this.expense.scannedImage = this.file.url;
                }
                this.expenseService.saveExpense(this.expense).then((data) => {
                this.$state.go("expense-details", { id: data.id });
                }).catch((err) => {
                    // flatten errors
                    let validationErrors = [];
                    for (let prop in err.data) {
                        let propErrors = err.data[prop];
                        validationErrors = validationErrors.concat(propErrors);
                    }
                    this.validationErrors = validationErrors;
                });
        }

        public getExpenseTypes() {
            this.expenseTypeService.listExpenseTypes().then((data) => {
                this.expenseTypes = data;
            });
        }

        public trimDate() {
            var date = this.expense.datePurchased;
            var dateTrim = date.substring(0, 10);
            var newDate = new Date(dateTrim);
            return newDate;
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