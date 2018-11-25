(function ChatsCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.chats')
        .controller('ChatsController', ['Chats', '$rootScope', '$state', '$uibModal', '$q', 'toastr', '$translate',
            function (Chats, $rootScope, $state, $uibModal, $q, toastr, $translate) {
                var ctrl = this;
                ctrl.false = false;
                ctrl.chats = [];
                ctrl.tabActive = 0;

                ctrl.init = function init() {
                    //get the Chats
                    ctrl.checkLog();
                    ctrl.getChats();
                };

                ctrl.checkLog = function checkLog() {
                    if (!$rootScope.auth.isLoggedIn()) {
                        $state.go('/login');
                    }
                };

                ctrl.getChatsOthers = function getChatsOthers() {
                    ctrl.isLoading = true;
                    Chats.getAllAsRequester({ idUser: $rootScope.session.getUserId() }).$promise
                        .then(ctrl.setChats)
                        .catch(ctrl.catchChats);
                };

                ctrl.getChatsMy = function getChatsMy() {
                    ctrl.isLoading = true;
                    var promises = [];
                    Chats.getAllAsOffertor({ idUser: $rootScope.session.getUserId() }).$promise
                        .then(ctrl.setChats)
                        .catch(ctrl.catchChats);
                };

                ctrl.getChats = function getChats(index) {
                    ctrl.tabActive = index;
                    if (index) {
                        ctrl.getChatsMy();
                    } else {
                        ctrl.getChatsOthers();
                    }
                };

                ctrl.setChats = function setChats(result) {
                    ctrl.isLoading = false;
                    ctrl.chats = result;
                };
                ctrl.catchChats = function catchChats(result) {
                    toastr.error($translate.instant('global.message.saveError'));
                    ctrl.isLoading = false
                };

                ctrl.modalInstance = {
                    templateUrl: 'modules/chats/templates/chats-crud.html',
                    controller: 'ChatsCRUDController as ctrl',
                    size: 'lg'
                };

                ctrl.openChat = function openChat(chat, type) {
                    ctrl.modalInstance.resolve = {
                        idChat: function resolve() { return chat.Id },
                        idAnotherUser: function resolve() { return type ? chat.UserOffertorId : chat.UserRequesterId },
                        idService: function resolve() { return chat.Service.Id },
                        type: type
                    };

                    $uibModal.open(ctrl.modalInstance).result.then(function success() {
                        ctrl.getChats(ctrl.tabActive);
                    });
                };

                ctrl.init();
            }

        ]);
})(angular);