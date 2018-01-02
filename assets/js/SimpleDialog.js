define(["require","exports"],function(t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=function(){function t(t){this.arrLastFocused=[],this.keyCode={BACKSPACE:8,TAB:9,RETURN:13,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46},this.whatIsFocusable='a, button, :input, input, textarea, [tabindex]:not([tabindex="0"]):not([tabindex^="-"])',this.strLevel=t,this.$body=$("body"),this.$main=$("main"),this.$dialogLayer=$("#dialogLayer"),this.$dialogs=$('[role="dialog"]'),this.$dialogTitle=$(".dialog__title"),this.$dialogLayer.addClass("dialogLayer"),this.$dialogs.addClass("dialog dialog--hidden"),this.$dialogs.attr({"aria-labelledby":"dialog__title","aria-modal":"true"}),this.$dialogTitle.attr("id","dialog__title"),this.$dialogTitle.parent().append('<button class="dialog__button--close">X</button>'),$(".button--dialog").on("click",this.openDialog.bind(this)),$(".dialog__button--cancel").on("click",this.closeDialog.bind(this)),$(".dialog__button--close").on("click",this.closeDialog.bind(this)),$(".dialog__button--false").on("click",this.closeDialog.bind(this)),window.addEventListener("keydown",this.triggerKeyboard.bind(this)),$(document).on("focus",this.whatIsFocusable,this.storeFocusedElements.bind(this))}return t.prototype.openDialog=function(t){var i=$("#"+$(t.currentTarget).data("dialog"));this.$focusOnClose=this.getLastFocusedElement(),i.removeClass("dialog--hidden"),i.addClass("dialog--showing"),this.$dialogLayer.removeClass("dialogLayer--hidden"),this.$dialogLayer.addClass("dialogLayer--showing"),this.$body.addClass("dialogOpened"),this.getEveryFocusableChildren(this.$main).attr("tabindex","-1"),this.focusOnFirstChild(i)},t.prototype.closeDialog=function(t){var i=$(t.currentTarget).closest(".dialog");i.removeClass("dialog--showing"),i.addClass("dialog--hidden"),this.$dialogLayer.removeClass("dialogLayer--showing"),this.$dialogLayer.addClass("dialogLayer--hidden"),this.$body.removeClass("dialogOpened"),this.getEveryFocusableChildren(this.$main).attr("tabindex","0"),this.$focusOnClose.focus()},t.prototype.storeFocusedElements=function(t){this.arrLastFocused.length<2?this.arrLastFocused.push($(t.currentTarget)):(this.arrLastFocused.splice(0,1),this.arrLastFocused.push($(t.currentTarget)))},t.prototype.getLastFocusedElement=function(){return this.arrLastFocused.length>1?$(this.arrLastFocused[0]):$(this.arrLastFocused[1])},t.prototype.focusOnFirstChild=function(t){this.getEveryFocusableChildren(t)[0].focus()},t.prototype.getEveryFocusableChildren=function(t){return t.find(this.whatIsFocusable)},t.prototype.triggerKeyboard=function(t){t.keyCode==this.keyCode.SPACE&&this.closeDialog(t)},t}();i.SimpleDialog=e});