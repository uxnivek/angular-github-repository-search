(function () {
	'use strict';

	angular.module('app')
		
		.controller('UserPanelController', UserPanelController);

	UserPanelController.$inject = ['$http', '$log'];

	function UserPanelController($http) {
		var user = this;
		user.details = {};
		user.repos = [];
		user.message = '';
		user.searchUser = searchUser;

		function searchUser (username) {

			// Fetch user
			$http.get(config.api.endPoint + config.api.usersUrl + username )
				.success(function (result) {
					user.details = result;
					user.message = '';
				})
				.error(function (error) {
					user.message = error.message;
				});

			// Fetch user repos
			$http.get(config.api.endPoint + config.api.usersUrl + username + config.api.reposParam)
				.success(function (repos) {
					user.repos = repos;
					user.message = '';
				})
				.error(function (error) {
					user.message = error.message;
				});
		};
	});
})();