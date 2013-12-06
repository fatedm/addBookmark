/*
combined files : 

gallery/addBookmark/1.0/index

*/
/**
 * @fileoverview 
 * @author 影刃<mingming.dmm@alibaba-inc.com>
 * @module addBookmark
 **/
 /*
 * We can't force users bookmark our site, but we can instruct them to do that.     
 */
KISSY.add('gallery/addBookmark/1.0/index',function (S, Base, Node, UA, Overlay) {

    var $ = Node.all;

    var MAC = 'macintosh',
        WINDOWS = 'windows',
        OVERLAY = 'overlay'; 

    var defaultConfig = {
        container: $('body'),       //收藏按钮的父容器，默认是body
        showTip: true,    //是否显示tip
        tipType: OVERLAY,          //提示形式：默认是overlay，否则为alter
        bookmarkTitle: document.title,   //加入书签的标题，不支持直接加入书签设置没效果
        text: '收藏',  //收藏按钮的文字， 无文字可设为空字符
        cls: 'ks-add-bookmark',  // 按钮class，默认是ks-add-bookmark
        successText: '加入书签成功', // 加入书签成功提示文案
        hasAddedText: '已经加入标签了',  //ie和低ff加入书签成功后再次点击的提示文案
        mobileTipText: '请使用加入书签功能收藏本页:)',  //移动设备的提示文案
        windowsTipText: '请按下ctrl+d键将本页加入书签', //windows非ie、非低版本ff的提示文案
        macTipText: '请按下command+d键将本页加入书签',  //mac下提示文案
        operaTiptext: '请点击地址栏右侧的心形添加到藏宝箱', //windows下opera的提示文案
        popupCls: 'ks-add-bookmark-popup',   //tip的cls，用来自定义tip样式
        popupWidth: 300,   // tip宽度
        popupHeight: 34,   //tip高度
        popupAlignNode: null,  //弹层出现的位置，默认是相对加入书签按钮，设为body后位置为视窗居中
        popupPoints: ['bl', 'tl'], // 相对加入书签按钮的位置，如果popupAlignNode设置为body，该设置被忽略。
        duration: 4000   //tip的展示时间，过期隐藏
    };

    var TMPL = '<a href="javascript:;" class="{cls}">{text}</a>';

    function AddBookmark (config) {
        if (!(this instanceof AddBookmark)) {
            return new AddBookmark(config);
        }

        var cfg = S.merge(defaultConfig, config);

        if (!$(cfg.container)) {
            S.log('container not exit');
            return;
        }

        this.popup = null;
        this.isShow = false;

        AddBookmark.superclass.constructor.call(this, config);

        this._init(cfg);
    }

    S.extend(AddBookmark, Base, {
        _init: function (cfg) {
            this._render(cfg);
            this._bindEvent(cfg);
        },
        _render: function (cfg) {
            var html = S.substitute(TMPL, cfg);

            S.ready(function(S){
                $(cfg.container).prepend(html);
            })
        },
        _bindEvent: function (cfg) {
            var self = this;
            $(cfg.container).delegate('click', '.' + cfg.cls, function (e) {
                e.preventDefault();
                if (self.isShow) {
                    S.log('overlay exits;');
                    return;
                }; 

                var tar = $(e.currentTarget),
                    title = document.title,
                    url = window.location.href;

                if (self.get('hasAdded')) {
                    cfg.showTip && self._tip(tar, cfg, cfg.hasAddedText);
                    return;
                }

                try {
                    window.external.addFavorite(url, title);
                    cfg.showTip && self._tip(tar, cfg, cfg.successText);
                    self.set('hasAdded', true);
                    self.fire('addBookmarkSuccess', {cfg: cfg});
                } catch (e){
                    try{
                        window.sidebar.addPanel(title, url, "");
                        cfg.showTip && self._tip(tar, cfg, cfg.successText);
                        self.set('hasAdded', true);
                        self.fire('addBookmarkSuccess', {cfg: cfg});
                    } catch (e) {
                        cfg.showTip && self._tip(tar, cfg);
                        self.fire('addBookmarkFailure', {cfg: cfg});
                    }
                }

            });
        },
        _tip: function (tar, cfg, str) {
            str = str || this._getTipText(cfg);
            cfg.tipType === OVERLAY ? this._overlay(tar, cfg, str) : this._alert(str); 
        },
        _overlay: function (tar, cfg, str) {
            var self = this;
            self.isShow = true;
            var align = cfg.popupAlignNode === 'body' ? {points: ['cc', 'cc']} :
                {node: tar, points: cfg.popupPoints}
            if (!self.popup) {
                self.popup = new Overlay({
                    elCls: cfg.popupCls,
                    content: str,
                    triggerType: 'click',
                    width: cfg.popupWidth,
                    height: cfg.popupHeight,
                    align: align,
                    zIndex: 10000
                });
                self.popup.render();
            } else {
                self.popup.set('content', str);
            }
            self.popup.show();
            S.later(function() {
                self.popup && self.popup.hide();
                self.isShow = false;
            }, cfg.duration);
        },
        _alert: function (str) {
            alert(str);
        },
        _getTipText: function (cfg) {
            var ret = '';
            if (UA.mobile) {
                ret = cfg.mobileTipText;
            } else {
                if (UA.os === MAC) {
                    ret = cfg.macTipText;
                } else {
                    if (UA.opera) {
                        ret = cfg.operaTiptext;
                    } else {
                        ret = cfg.windowsTipText;
                    }
                }
            }
            return ret;
        }
    }, {
        ATTRS:  {
            hasAdded: false
        }
    });

    return AddBookmark;
}, {
    requires: [
        'base',
        'node',
        'ua',
        'overlay',
        './index.css'
    ]
});




