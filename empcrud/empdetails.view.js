sap.ui.jsview("empcrud.empdetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf empcrud.empdetails
	*/ 
	getControllerName : function() {
		return "empcrud.empdetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf empcrud.empdetails
	*/ 
	createContent : function(oController) {
		var oPage = new sap.m.Page({
			title : "Employee Details",

		});
		
		var oBtnUpd = new sap.m.Button("Update", {
			text : "Update",
			icon : "sap-icon://edit",
			tap : [ oController.Update, oController ]
		});

		var oBtnDel = new sap.m.Button("Delete", {
			text : "Delete",
			icon : "sap-icon://delete",
			tap : [ oController.Delete, oController ]
		});
		var oBtnCan = new sap.m.Button("Cancel", {
			text : "Cancel",
			icon : "sap-icon://decline",
			tap : [ oController.Cancel, oController ]
		});
		var oBtnSub = new sap.m.Button("Submit", {
			text : "Create New",
			icon : "sap-icon://employee",
			press : oController.NewEntry,
		});

		var oBtnSav = new sap.m.Button("Save", {
			text : "Save",
			icon : "sap-icon://save",
			tap : [ oController.Save, oController ]
		});
		
		// Dialog box / pop-up window for Add/Modify Employee Data
		var oDialog = new sap.m.Dialog("Dialog", {
			title : "Add/Modify Employee",
			contentWidth : "450px",

			content : [ new sap.m.Label({
				text : "Emp Id(auto-generated)",
				design : "Bold"
			}), new sap.m.Input({
				maxLength : 20,
				id : "Id",
			}), new sap.m.Label({
				text : "Enter Name",
				design : "Bold"
			}), new sap.m.Input({
				maxLength : 20,
				id : "Name"
			}), new sap.m.Label({
				text : "Enter Address",
				design : "Bold"
			}), new sap.m.Input({
				maxLength : 20,
				id : "Address"
			}), new sap.m.Label({
				text : "Enter Designation",
				design : "Bold"
			}), new sap.m.Input({
				maxLength : 20,
				id : "Role"
			}), oBtnUpd, oBtnDel, oBtnCan, oBtnSav ]
		});

		// Table or Dashboard to show the Employee Data
		var oTable = new sap.m.Table({
			id : "Employees",
			inset : true,
//			headerText : "Employee List",
			mode : sap.m.ListMode.SelectSingleMaster,
			IncludeItemInSelection : false,
			itemPress : [ oController.ItemPress, oController ],
			columns : [ new sap.m.Column({
				width : "50px",
				header : new sap.m.Label({
				text : "Emp ID",
				design : "Bold"
				}),	
					
			}), new sap.m.Column({
				width : "50px",
				header : new sap.m.Label({
					text : "Name",
					design : "Bold"
					
				})
			}), new sap.m.Column({
				width : "50px",
				header : new sap.m.Label({
					text : "Address",
					design : "Bold"
					
				})
			}), new sap.m.Column({
				width : "50px",
				header : new sap.m.Label({
					text : "Designation",
					design : "Bold"
					
				})
			}) ]
		});

		// Template to map the data to the respective column
		var template = new sap.m.ColumnListItem({

			id : "first_template",
			type : "Navigation",
			visible : true,
			cells : [

			new sap.m.Label("ID", {
				text : "{Empid}"
			}), new sap.m.Label({
				text : "{Empname}"
			}), new sap.m.Label({
				text : "{Empadd}"
			}), new sap.m.Label({
				text : "{Empdes}"
			}) ]
		});
		
		var oFilters = null;
		oTable.bindItems("/results", template, null, oFilters);
		oPage.addContent(oTable);
		oPage.addContent(oBtnSub);
		return oPage;
	}

});