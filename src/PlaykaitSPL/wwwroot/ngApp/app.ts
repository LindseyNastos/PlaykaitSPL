namespace PlaykaitSPL {

    angular.module('PlaykaitSPL', ['ui.router', 'ngResource', 'ui.bootstrap', 'angular-filepicker']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        filepickerProvider
    ) => {
        filepickerProvider.setKey('AzIVhzPQ1q4P90T0CcRDgz');
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: PlaykaitSPL.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('bills', {
                url: '/bills',
                templateUrl: '/ngApp/views/bills/bills.html',
                controller: PlaykaitSPL.Controllers.BillListController,
                controllerAs: 'vm'
            })
            .state('bill-details', {
                url: '/bill-details/:id',
                templateUrl: '/ngApp/views/bills/billDetails.html',
                controller: PlaykaitSPL.Controllers.BillDetailsController,
                controllerAs: 'vm'
            })
            .state('add-bill', {
                url: '/add-bill',
                templateUrl: '/ngApp/views/bills/addBill.html',
                controller: PlaykaitSPL.Controllers.AddBillController,
                controllerAs: 'vm'
            })
            .state('edit-bill', {
                url: '/edit-bill/:id',
                templateUrl: '/ngApp/views/bills/editBill.html',
                controller: PlaykaitSPL.Controllers.EditBillController,
                controllerAs: 'vm'
            })
            .state('expenses', {
                url: '/expenses',
                templateUrl: '/ngApp/views/expenses/expenses.html',
                controller: PlaykaitSPL.Controllers.ExpenseListController,
                controllerAs: 'vm'
            })
            .state('expense-details', {
                url: '/expense-details/:id',
                templateUrl: '/ngApp/views/expenses/expenseDetails.html',
                controller: PlaykaitSPL.Controllers.ExpenseDetailsController,
                controllerAs: 'vm'
            })
            .state('add-expense', {
                url: '/add-expense',
                templateUrl: '/ngApp/views/expenses/addExpense.html',
                controller: PlaykaitSPL.Controllers.AddExpenseController,
                controllerAs: 'vm'
            })
            .state('edit-expense', {
                url: '/edit-expense/:id',
                templateUrl: '/ngApp/views/expenses/editExpense.html',
                controller: PlaykaitSPL.Controllers.EditExpenseController,
                controllerAs: 'vm'
            })
            .state('delete-expense', {
                url: '/delete-expense/:id',
                templateUrl: '/ngApp/views/expenses/deleteExpense.html',
                controller: PlaykaitSPL.Controllers.DeleteExpenseController,
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: PlaykaitSPL.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: PlaykaitSPL.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .state('externalRegister', {
                url: '/externalRegister',
                templateUrl: '/ngApp/views/externalRegister.html',
                controller: PlaykaitSPL.Controllers.ExternalRegisterController,
                controllerAs: 'controller'
            })
            .state('contacts', {
                url: '/contacts',
                templateUrl: '/ngApp/views/people/contacts/contacts.html',
                //controller: PlaykaitSPL.Controllers.AboutController,
                //controllerAs: 'controller'
            })
            .state('contact-details', {
                url: '/contact-details/:id',
                templateUrl: '/ngApp/views/people/contacts/contactDetails.html',
                //controller: PlaykaitSPL.Controllers.AboutController,
                //controllerAs: 'controller'
            })
            .state('guests', {
                url: '/guests',
                templateUrl: '/ngApp/views/people/guests/guests.html',
                //controller: PlaykaitSPL.Controllers.AboutController,
                //controllerAs: 'controller'
            })
            .state('guest-details', {
                url: '/guest-details/:id',
                templateUrl: '/ngApp/views/people/guests/guestDetails.html',
                //controller: PlaykaitSPL.Controllers.AboutController,
                //controllerAs: 'controller'
            })
            .state('reservations', {
                url: '/reservations',
                templateUrl: '/ngApp/views/reservations/reservations.html',
                //controller: PlaykaitSPL.Controllers.AboutController,
                //controllerAs: 'controller'
            })
            .state('reservation-details', {
                url: '/reservation-details/:id',
                templateUrl: '/ngApp/views/reservations/reservationDetails.html',
                //controller: PlaykaitSPL.Controllers.AboutController,
                //controllerAs: 'controller'
            })
            .state('manage', {
                url: '/manage',
                templateUrl: '/ngApp/views/manage/manage.html',
                controller: PlaykaitSPL.Controllers.ManageController,
                controllerAs: 'vm'
            })
            .state('manage.billNames', {
                url: '/manage-billNames',
                templateUrl: '/ngApp/views/manage/billNames/listBillNamesChild.html',
            })
            .state('manage.expenseTypes', {
                url: '/manage-expenseTypes',
                templateUrl: '/ngApp/views/manage/expenseTypes/listExpenseTypesChild.html',
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });


    angular.module('PlaykaitSPL').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        })
    );

    angular.module('PlaykaitSPL').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });



}
