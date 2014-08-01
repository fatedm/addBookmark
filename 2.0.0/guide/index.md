## 综述

AddBookmark是可定制、跨终端的加入书签组件。But，We can't force users bookmark our site, but we can instruct them to do that. 在ie和低版本ff下实现加入书签（收藏夹）功能，不支持js操作书签给出相应的提示。提示效果有alert和tip两种形式，tip位置可自定义。提示文案可配置。。

* 版本：2.0.0
* 作者：影刃
* demo：[http://kg.kissyui.com/addBookmark/2.0.0/demo/index.html](http://kg.kissyui.com/addBookmark/2.0.0/demo/index.html)


## 初始化组件

    S.use('kg/addBookmark/2.0.0/index', function (S, AddBookmark) {
         var addBookmark = new AddBookmark();
    })

## API说明
默认config

	{
		container: $('body'),		       //收藏按钮的父容器，默认是body
		showTip: true,                    //是否显示tip
		tipType: 'overlay',               //提示形式：默认是overlay，否则为alert
		bookmarkTitle: document.title,    //加入书签的标题，不支持直接加入书签设置没效果
		text: '收藏',                     //收藏按钮的文字， 无文字可设为空字符
		cls: 'ks-add-bookmark',          //按钮class，默认是ks-add-bookmark
		successText: '加入书签成功',       //加入书签成功提示文案
		hasAddedText: '已经加入标签了',    //ie和低ff加入书签成功后再次点击的提示文案
		mobileTipText: '请使用加入书签功能收藏本页:)',      //移动设备的提示文案
		windowsTipText: '请按下ctrl+d键将本页加入书签',    //windows非ie、非低版本ff的提示文案
		macTipText: '请按下command+d键将本页加入书签',     //mac下提示文案
		operaTiptext: '请点击地址栏右侧的心形添加到藏宝箱', //windows下opera的提示文案
		popupCls: 'ks-add-bookmark-popup',              //tip的cls，用来自定义tip样式
		popupWidth: 300,           // tip宽度
		popupHeight: 34,           //tip高度
		popupAlignNode: null,      //弹层出现的位置，默认是相对加入书签按钮，设为body后位置为视窗居中
		popupPoints: ['bl', 'tl'], // 相对加入书签按钮的位置，如果popupAlignNode设置为body，该设置被忽略。
		duration: 4000             //tip的展示时间，过期隐藏
	}


### Attributes
- container: 收藏按钮的父容器(dom/selecter),默认是body
- showTip:  是否显示tip，设置为false可监听addBookmarkSuccess和addBookFailure，默认是true
- tipType: 提示形式，默认是overlay, 可设置为alert
- bookmarkTitle: 加入书签标题，默认是document.title
- text: 加入书签的文字，没有文字可以设为空字符，默认是“收藏”
- cls:  加入书签的class,默认是ks-add-bookmark
- successText： 加入成功的文案,  默认“加入书签成功”
- hasAddEdText: ie和低ff加入书签成功后再次点击的提示文案，默认“已经加入标签了”
- mobileTipText: 移动设备的提示文案，默认“请使用加入书签功能收藏本页:)”
- windowsTipText: windows非ie、非低版本ff的提示文案,默认“请按下ctrl+d键将本页加入书签”
- macTipText: mac下提示文案, 默认是"请按下command+d键将本页加入书签"
- operaTipText: windows下opera无快捷键，默认“请点击地址栏右侧的心形添加到藏宝箱”
- popupCls:  tip的class，tip是组件overlay的实例，可配置的属性可参考overlay
- popupWidth: tip的宽度，默认是300
- popupHeight: tip的高度， 默认是34
- popupAlignNode: tip的对齐元素，默认是加入书签按钮， 设为body后将会居中显示
- popupPoints: 对齐位置，默认是['bl', 'tl'],参考[overlay的align](http://docs.kissyui.com/1.4/docs/html/api/component/extension/align.html#component.extension.Align.prototype.align)
- duration:  tip的显示时间，默认4000


### Events



-addBookmarkFailure

