let config = require("config");

cc.Class({
    extends: cc.Component,

    properties: {
        scrollViewContent: cc.Node,
        menuItem: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        config.CURRENT_CASE = -1;
        this.menuItem.parent = null;
        for (let i = 0; i < config.TEST_CASE.length; i++) {
            let testCaseInfo = config.TEST_CASE[i];
            let menuItem = cc.instantiate(this.menuItem);
            let name = menuItem.getChildByName("name");
            name.getComponent(cc.Label).string = `${i + 1}. ${testCaseInfo.name}`;
            menuItem.getComponent(cc.Button).clickEvents[0].customEventData = i;
            menuItem.parent = this.scrollViewContent;
        }
    },

    onClickTestCase: function (_, data) {
        let testCaseIndex = parseInt(data);
        let testCaseInfo = config.TEST_CASE[testCaseIndex];
        if (!testCaseInfo) {
            cc.warn("Error test case.");
            return;
        }
        config.CURRENT_CASE = testCaseIndex;
        config.SCENE_ARGS = testCaseInfo.args;
        cc.director.loadScene(testCaseInfo.scene);
    },
    
});