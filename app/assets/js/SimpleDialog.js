define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SimpleDialog = /** @class */ (function () {
        // Constructor
        function SimpleDialog(niveau) {
            this.arrLastFocused = [];
            this.keyCode = {
                BACKSPACE: 8,
                TAB: 9,
                RETURN: 13,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46
            };
            this.whatIsFocusable = 'a, button, :input, input, textarea, [tabindex]:not([tabindex="0"]):not([tabindex^="-"])';
            this.strLevel = niveau;
            this.$body = $('body');
            this.$main = $('main');
            this.$dialogLayer = $('#dialogLayer');
            this.$dialogs = $('[role="dialog"]');
            this.$dialogTitle = $('.dialog__title');
            // Adds class on DialogLayer
            this.$dialogLayer.addClass('dialogLayer');
            // Adds accessibles attributes and classes on Dialogs
            this.$dialogs.addClass('dialog dialog--hidden');
            this.$dialogs.attr({
                'aria-labelledby': 'dialog__title',
                'aria-modal': 'true'
            });
            // Adds ID on each Dialog's title
            this.$dialogTitle.attr('id', 'dialog__title');
            // Adds button to close dialog
            this.$dialogTitle.parent().append('<button class="dialog__button--close">X</button>');
            // Open button
            $('.button--dialog').on('click', this.openDialog.bind(this));
            // Close buttons
            $('.dialog__button--cancel').on('click', this.closeDialog.bind(this));
            $('.dialog__button--close').on('click', this.closeDialog.bind(this));
            $('.dialog__button--false').on('click', this.closeDialog.bind(this));
            // At keydown
            window.addEventListener('keydown', this.triggerKeyboard.bind(this));
            // On focus in document, stores focused elements
            $(document).on('focus', this.whatIsFocusable, this.storeFocusedElements.bind(this));
        }
        // Methods
        /**
         * Opens dialog linked to the button's data
         * Removes 'hidden' class and adds 'showing' on current Dialog
         * Removes 'hidden' class and adds 'showing' on current DialogLayer
         * @param {Event} e - Transitioned event object
         */
        SimpleDialog.prototype.openDialog = function (e) {
            var $currentDialog = $('#' + $(e.currentTarget).data('dialog'));
            // Stores last element in focus before opening Dialog
            this.$focusOnClose = this.getLastFocusedElement();
            // Current Dialog
            $currentDialog.removeClass('dialog--hidden');
            $currentDialog.addClass('dialog--showing');
            // DialogLayer
            this.$dialogLayer.removeClass('dialogLayer--hidden');
            this.$dialogLayer.addClass('dialogLayer--showing');
            // Adds 'dialogOpened' class on the Body to deactivate scroll under the current Dialog
            this.$body.addClass('dialogOpened');
            // Makes focus inactive on every element in Main
            this.getEveryFocusableChildren(this.$main).attr('tabindex', "-1");
            // Focus on the first focusable element in the current Dialog
            this.focusOnFirstChild($currentDialog);
        };
        /**
         * Closes dialog linked to the button's data
         * Removes 'showing' class and adds 'hidden' on current Dialog
         * Removes 'showing' class and adds 'hidden' on current DialogLayer
         * @param {Event} e - Transitioned event object
         */
        SimpleDialog.prototype.closeDialog = function (e) {
            var $currentDialog = $(e.currentTarget).closest('.dialog');
            // Current Dialog
            $currentDialog.removeClass('dialog--showing');
            $currentDialog.addClass('dialog--hidden');
            // DialogLayer
            this.$dialogLayer.removeClass('dialogLayer--showing');
            this.$dialogLayer.addClass('dialogLayer--hidden');
            // Removes 'dialogOpened' class on the Body to reactivate scroll under the closing Dialog
            this.$body.removeClass('dialogOpened');
            // Makes focus active on every element in Main
            this.getEveryFocusableChildren(this.$main).attr('tabindex', "0");
            // Focus on the last focused element before opening the last Dialog
            this.$focusOnClose.focus();
        };
        /**
         * Adds the 2 last focused elements in a table
         * @param {Event} e - Transitioned event object
         */
        SimpleDialog.prototype.storeFocusedElements = function (e) {
            if (this.arrLastFocused.length < 2) {
                this.arrLastFocused.push($(e.currentTarget));
            }
            else {
                this.arrLastFocused.splice(0, 1);
                this.arrLastFocused.push($(e.currentTarget));
            }
        };
        /**
         * Returns the last focused element
         * @returns {JQuery} - Last focused element present in the table
         */
        SimpleDialog.prototype.getLastFocusedElement = function () {
            if (this.arrLastFocused.length > 1) {
                return $(this.arrLastFocused[0]);
            }
            else {
                return $(this.arrLastFocused[1]);
            }
        };
        /**
         * Focus on the first focusable child in a parent
         * @param {JQuery} $parent - Parent element in which to search for focusable children
         */
        SimpleDialog.prototype.focusOnFirstChild = function ($parent) {
            this.getEveryFocusableChildren($parent)[0].focus();
        };
        /**
         * Returns every focusable children in a parent
         * @param {JQuery} $parent - Parent element in which to search for focusable children
         * @returns {JQuery} - Focusable children
         */
        SimpleDialog.prototype.getEveryFocusableChildren = function ($parent) {
            return $parent.find(this.whatIsFocusable);
        };
        /**
         * Verifies which keycode when a key is pressed and do something accordingly
         * @param {any} e -- Transitioned event object (any, because keyCode doesn't exist on type Event)
         */
        SimpleDialog.prototype.triggerKeyboard = function (e) {
            // ESC key
            if (e.keyCode == this.keyCode.ESC) {
                this.closeDialog(e);
            }
        };
        return SimpleDialog;
    }());
    exports.SimpleDialog = SimpleDialog;
});
//# sourceMappingURL=SimpleDialog.js.map