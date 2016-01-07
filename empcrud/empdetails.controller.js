sap.ui.controller("empcrud.empdetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf empcrud.empdetails
*/
	onInit: function() {
		
//		function getUrl(sUrl){
//			if (sUrl == "")
//				return sUrl;
//			if (window.location.hostname == "localhost")
//				return "proxy"+ sUrl;
//			else
//				return sUrl;
//		}
		console.log(window.location.hostname);
		var sServiceUrl = "proxy/http/172.16.16.200:8000/sap/opu/odata/sap/ZMM_EMP_SRV_01";
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "E50017", "minati");
		var oJsonModel = new sap.ui.model.json.JSONModel();

		oModel.read("/EmployeeSet?", null, null, true,
				function(oData, repsonse) {
					oJsonModel.setData(oData);
				});
		sap.ui.getCore().setModel(oJsonModel);

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf empcrud.empdetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf empcrud.empdetails
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf empcrud.empdetails
*/
//	onExit: function() {
//
//	}
	
	ItemPress : function(evt) {
		console.log("controller event");
		sap.ui.getCore().byId("Dialog").open();
		sap.ui.getCore().byId("Update").setVisible(true);
		sap.ui.getCore().byId("Delete").setVisible(true);

		var oSelectedItem = evt.getParameter("listItem");
		var sID = oSelectedItem.getBindingContext().getProperty("Empid");
		var sName = oSelectedItem.getBindingContext().getProperty("Empname");
		var sAddr = oSelectedItem.getBindingContext().getProperty("Empadd");
		var sRole = oSelectedItem.getBindingContext().getProperty("Empdes");

		sap.ui.getCore().byId("Id").setValue(sID);
		sap.ui.getCore().byId("Name").setValue(sName);
		sap.ui.getCore().byId("Address").setValue(sAddr);
		sap.ui.getCore().byId("Role").setValue(sRole);
		sap.ui.getCore().byId("Id").setEnabled(false);
	},

	NewEntry : function() {
		sap.ui.getCore().byId("Dialog").open();
		sap.ui.getCore().byId("Save").setVisible(true);
		sap.ui.getCore().byId("Update").setVisible(false);
		sap.ui.getCore().byId("Delete").setVisible(false);
		sap.ui.getCore().byId("Id").setValue("");
		sap.ui.getCore().byId("Name").setValue("");
		sap.ui.getCore().byId("Address").setValue("");
		sap.ui.getCore().byId("Role").setValue("");
		sap.ui.getCore().byId("Id").setEnabled(false);
	},

	Save : function() {

		var oEntry = {};
		oEntry.Empid = sap.ui.getCore().byId("Id").getValue();
		oEntry.Empname = sap.ui.getCore().byId("Name").getValue();
		oEntry.Empadd = sap.ui.getCore().byId("Address").getValue();
		oEntry.Empdes = sap.ui.getCore().byId("Role").getValue();
		console.log(oEntry);
		OData.request(
			{
				requestUri : "proxy/http/172.16.16.200:8000" + "/sap/opu/odata/sap/ZMM_EMP_SRV_01/EmployeeSet",
				method : "GET",
				user : "E50017",
				password : "minati",
				headers : {							
							"X-Requested-With" : "XMLHttpRequest",
							"Content-Type" : "application/atom+xml",
							"DataServiceVersion" : "2.0",
							"X-CSRF-Token" : "Fetch",
							"xhrFields": "{withCredentials: true}"
						}
			},
		    function(data, response) {
				header_xcsrf_token = response.headers['x-csrf-token'];
				var oHeaders = {
								"x-csrf-token" : header_xcsrf_token,
								'Accept' : 'application/json',
				};
				OData.request(
						{
							requestUri : "proxy/http/172.16.16.200:8000/sap/opu/odata/sap/ZMM_EMP_SRV_01/EmployeeSet",
							method : "POST",
							user : "E50017",
							password : "minati",
							headers : oHeaders,
							data : oEntry
				        },
				        function(data,request) {
				        	alert("Employee Created Successfully");
				        	location.reload(true);
			            },
			            function(err) {
			            	alert("Employee Creation Failed");

			    });
		   },
		   function(err) {
							var request = err.request;
							var response = err.response;
							alert("Error in Get -- Request "
									+ request + " Response "
									+ response);
						});
	    },
	Update : function() {
		var oEntry = {};
		oEntry.Empid = sap.ui.getCore().byId("Id").getValue();
		oEntry.Empname = sap.ui.getCore().byId("Name")
				.getValue();
		oEntry.Empadd = sap.ui.getCore().byId("Address")
				.getValue();
		oEntry.Empdes = sap.ui.getCore().byId("Role")
				.getValue();
		console.log(oEntry);
		OData.request(
						{
							
							requestUri : "proxy/http/172.16.16.200:8000/sap/opu/odata/sap/ZMM_EMP_SRV_01/EmployeeSet",
							method : "GET",
							user : "E50017",
							password : "minati",
							headers : {
								"X-Requested-With" : "XMLHttpRequest",
								"Content-Type" : "application/atom+xml",
								"DataServiceVersion" : "2.0",
								"X-CSRF-Token" : "Fetch",
								"xhrFields": "{withCredentials: true}"
							}
						},
						function(data, response) {
							header_xcsrf_token = response.headers['x-csrf-token'];
							var oHeaders = {
								"x-csrf-token" : header_xcsrf_token,
								'Accept' : 'application/json',
							};

							OData.request(
											{
												
												requestUri : "proxy/http/172.16.16.200:8000/sap/opu/odata/sap/ZMM_EMP_SRV_01/EmployeeSet('"
														+ oEntry.Empid
														+ "')",

												method : "PUT",
												user : "E50017",
												password : "minati",
												headers : oHeaders,
												data : oEntry
											},
											function(data,
													request) {
												alert("Update Success");
												location.reload(true);
											},
											function(err) {
												alert("Update Failed");
											});
						}, function(err) {
							var request = err.request;
							var response = err.response;
							alert("Error in Get -- Request "
									+ request + " Response "
									+ response);
						});
	},
	// Delete Action
	Delete : function() {
		var oEntry = {};
		oEntry.Empid = sap.ui.getCore().byId("Id").getValue();
		console.log(oEntry.Empid);
		OData.request(
						{
							requestUri : "proxy/http/172.16.16.200:8000/sap/opu/odata/sap/ZMM_EMP_SRV_01/EmployeeSet('"
									+ oEntry.Empid + "')",
							method : "GET",
							user : "E50017",
							password : "minati",
							headers : {
								"X-Requested-With" : "XMLHttpRequest",
								"Content-Type" : "application/atom+xml",
								"DataServiceVersion" : "2.0",
								"X-CSRF-Token" : "Fetch",
								"xhrFields": "{withCredentials: true}"
							}
						},
						function(data, response) {
							header_xcsrf_token = response.headers['x-csrf-token'];
							var oHeaders = {
								"x-csrf-token" : header_xcsrf_token,
								'Accept' : 'application/json',
							};

							OData.request(
											{
												requestUri : "proxy/http/172.16.16.200:8000/sap/opu/odata/sap/ZMM_EMP_SRV_01/EmployeeSet('"
														+ oEntry.Empid

														+ "')",

												method : "DELETE",
												user : "E50017",
												password : "minati",
												headers : oHeaders,
												data : oEntry
											},
											function(data,
													request) {

												alert("Delete Success");
												location.reload(true);
											},
											function(err) {
												alert("Delete Failed");
											});
						}, function(err) {
							var request = err.request;
							var response = err.response;
							alert("Error in Get -- Request "
									+ request + " Response "
									+ response);
						});

	},
	// Cancel Action
	Cancel : function() {
		sap.ui.getCore().byId("Dialog").close();
	}

});