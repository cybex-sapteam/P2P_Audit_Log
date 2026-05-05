/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["wfmonitorlogs/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
