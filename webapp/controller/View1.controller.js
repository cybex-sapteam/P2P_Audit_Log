sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "../model/formatter",
    "sap/ui/core/format/DateFormat"
], (Controller, Filter, FilterOperator, FilterType, formatter, DateFormat) => {
    "use strict";

    return Controller.extend("wfmonitorlogs.controller.View1", {
        formatter: formatter,
        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel([]);
            var sModel = new sap.ui.model.json.JSONModel([
                {
                    "status": "Completed"
                }, {
                    "status": "Running"
                }, {
                    "status": "On Hold"
                }, {
                    "status": "Error"
                },]);
            this.getView().setModel(oModel, "tableModel");
            this.getView().setModel(sModel, "statusModel");
            this._loadData();
        },
        onSearchTable: function (oEvent) {
            var that = this;
            var aTableFilters = this.byId("WFfilterbar").getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
                var oControl = oFilterGroupItem.getControl();
                var sField = oFilterGroupItem.getName();
                if (oControl.getId().indexOf("multi") !== -1) {
                    var aTokens = oControl.getSelectedKeys();
                    if (aTokens.length > 0) {
                        var aTokenFilters = sField + "=" + aTokens.join(",");
                        aResult.push(aTokenFilters);
                    }
                    //     aFilters = aSelectedKeys.map(function (sSelectedKey) {
                    //             return new Filter({
                    //                 path: oFilterGroupItem.getName(),
                    //                 operator: FilterOperator.Contains,
                    //                 value1: sSelectedKey.getKey()
                    //             });                        
                    //     });
                    // if (aSelectedKeys.length > 0) {
                    //     aResult.push(new Filter({
                    //         filters: aFilters,
                    //         and: false
                    //     }));
                    // }
                }
                else if (oControl.getId().indexOf("idCreate") !== -1) {
                    var dFilters = [];
                    if (oControl.getValue() !== '') {
                        var oFrom = oControl.getValue();
                        //var oTo = oControl.getSecondDateValue();
                        if (oFrom) {
                            aResult.push(
                                sField + "=" + that.formatDate(oFrom) + ""
                            );
                        }

                        // if (oTo) {
                        //     dFilters.push(
                        //         sField + " le '" + that.formatDate(oTo) + "T23:59:59.000Z'"
                        //     );
                        // }
                        // if (dFilters.length > 0) {
                        //     aResult.push("(" + dFilters.join(" and ") + ")");
                        // }
                        // if (oFrom !== null) {
                        //     dFilters.push(new Filter({ path: oFilterGroupItem.getName(), operator: FilterOperator.GE, value1: that.formatDate(oFrom) + "T00:00:00.000Z" }))
                        // }
                        // if (oTo !== null) {
                        //     dFilters.push(new Filter({ path: oFilterGroupItem.getName(), operator: FilterOperator.LE, value1: that.formatDate(oTo) + "T23:59:59.000Z" }))
                        // }
                    }
                    // if (dFilters.length > 0) {
                    //     aResult.push(new Filter({
                    //         filters: dFilters,
                    //         and: true
                    //     }))
                    // }
                }
                else {
                    var selectedValue = oControl.getValue();
                    if (selectedValue) {
                        aResult.push(sField + "=" + selectedValue + "");
                    }
                    // aResult.push(new Filter({ path: oFilterGroupItem.getName(),operator: FilterOperator.EQ,value1: selectedValue}))
                    //     }
                }
                return aResult;
            }, []);
            var sFilterQuery = "";

            if (aTableFilters.length > 0) {
                sFilterQuery = aTableFilters.join("&");
            }
            this._loadData("&" + sFilterQuery);
            // this.byId("idwfTable").getBinding().filter(aTableFilters, FilterType.Application);
            // this.byId("idwfTable").setShowOverlay(false);
        },
        formatDate: function (dObj) {
            var oDate = new Date(dObj); // or your specific date

            var oDateFormat = DateFormat.getDateTimeInstance({
                pattern: "yyyyMMddHHmmss.SSS"
            });

            var sFormattedDate = oDateFormat.format(oDate);

            console.log(sFormattedDate);
            return sFormattedDate;
        },
        onLinkPress: function (oEvent) {
            var iD = oEvent.getSource().getBindingContext("tableModel").getObject().workflowInstanceId;
            let sHost = window.location.host;
            if (sHost.includes("-qas-")) {
                var url = "https://cybex-cloud-digital-qas-env.eu10.build.cloud.sap/monitoring/workflow-instances/";
            }
            else if (sHost.includes("-prd-")) {
                url = "https://cybex-cloud-digital-prd-env.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=d56ddf61-819a-4476-8724-ae5474aa5378#Shell-home%22";
            }
            else {
                url = "https://cbx-dev-enviornment-623550vb.eu10.build.cloud.sap/monitoring/workflow-instances/";
            }
            var url= url+ iD + "?~status=ERRONEOUS,RUNNING,SUSPENDED&~type=process";
            window.open(url, "_blank");
        },
        _loadData: function (filterQuery) {
            var that = this;
            var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            var appModulePath = jQuery.sap.getModulePath(appPath);
            var Url = appModulePath + "/workflow/rest/v1/task-instances?$orderby=createdAt desc";
            if (filterQuery) {
                Url = Url + filterQuery;
            }

            jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: Url,//"/workflow/rest/v1/task-instances?$skip=" + iSkip + "&$top=" + iTop,
                dataType: "json",
                async: false,
                success: function (data, textStatus, jqXHR) {
                    var oModel = that.getView().getModel("tableModel");
                    oModel.setProperty("/", data);
                    console.log(data);
                    // oModel.setProperty("/total", oResponse.count);
                    // that.byId("gridTable").setRowCount(oResponse.count);
                },
                error: function () {
                }
            });
        }







    });
});