# SimpleDialog

## [Demo](http://jeremygoulet96.github.io/SimpleDialog)

## BEM

### HTML
```
div#dialogLayer     // Two possible states:
                    dialogLayer--hidden
                    dialogLayer--showing
    div.dialog      // Two possible states:
                    dialog--hidden
                    dialog--showing
                    // Two possible looks:
                    dialog--modal
                    dialog--alert
        div.dialog__container
            header.dialog__header
            div.dialog__content
            footer.dialog__footer
```

### Emmett
`div#dialogLayer.dialogLayer--hidden>div[role='dialog'].dialog.dialog--modal#dialog$*1>div.dialog__container>(header.dialog__header>h2.dialog__title{Title})+(div.dialog__content>p{Text})+(footer.dialog__footer>(div.dialog__actions>button.dialog__button.dialog__button--cancel{Cancel}))`

## Installation for Devs
1. Install Node dependencies (run this command in the root folder)  
`npm install`

2. Install Bower dependencies (run this command in the root folder)  
`bower install`

3. Start Gulp to convert SASS to CSS and to Uglify JS (and to also start Browser-Sync) (run this command in the app folder)  
`gulp`

## WAI-ARIA Authoring Practices (taken from [W3C - WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/#dialog_modal))
A dialog is a window overlayed on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.

Like non-modal dialogs, modal dialogs contain their tab sequence. That is, Tab and Shift + Tab do not move focus outside the dialog. However, unlike most non-modal dialogs, modal dialogs do not provide means for moving keyboard focus outside the dialog window without closing the dialog.

The alertdialog role is a special-case dialog role designed specifically for dialogs that divert users' attention to a brief, important message. Its usage is described in the alert dialog design pattern.

#### Keyboard Interaction
In the following description, the term tabbable element refers to any element with a `tabindex` value of zero or greater. Note that values greater than 0 are strongly discouraged.

* When a dialog opens, focus moves to an element inside the dialog. See notes below regarding initial focus placement.
* Tab:
    * Moves focus to the next tabbable element inside the dialog.
    * If focus is on the last tabbable element inside the dialog, moves focus to the first tabbable element inside the dialog.
* Shift + Tab:
    * Moves focus to the previous tabbable element inside the dialog.
    * If focus is on the first tabbable element inside the dialog, moves focus to the last tabbable element inside the dialog.
* Escape: Closes the dialog.

>##### NOTE
1. When a dialog opens, focus placement depends on the nature and size of the content.
    * In all circumstances, focus moves to an element contained in the dialog.
    * Unless a condition where doing otherwise is advisable, focus is initially set on the first focusable element.
    * If content is large enough that focusing the first interactive element could cause the beginning of content to scroll out of view, it is advisable to add `tabindex=-1` to a static element at the top of the dialog, such as the dialog title or first paragraph, and initially focus that element.
    * If a dialog contains the final step in a process that is not easily reversible, such as deleting data or completing a financial transaction, it may be advisable to set focus on the least destructive action, especially if undoing the action is difficult or impossible. The Alert Dialog Pattern is often employed in such circumstances.
    * If a dialog is limited to interactions that either provide additional information or continue processing, it may be advisable to set focus to the element that is likely to be most frequently used, such as an OK or Continue button.
2. When a dialog closes, focus returns to the element that invoked the dialog unless either:
    * The invoking element no longer exists. Then, focus is set on another element that provides logical work flow.
    * The work flow design includes the following conditions that can occasionally make focusing a different element a more logical choice:
    * It is very unlikely users need to immediately re-invoke the dialog.
    * The task completed in the dialog is directly related to a subsequent step in the work flow.
    * For example, a grid has an associated toolbar with a button for adding rows. the Add Rows button opens a dialog that prompts for the number of rows. After the dialog closes, focus is placed in the first cell of the first new row.
3. It is strongly recommended that the tab sequence of all dialogs include a visible element with role `button` that closes the dialog, such as a close icon or cancel button.

#### WAI-ARIA Roles, States, and Properties 
* The element that serves as the dialog container has a role of dialog.
* All elements required to operate the dialog are descendants of the element that has role `dialog`.
* The dialog container element has aria-modal set to `true`.
* The dialog has either:
    * A value set for the aria-labelledby property that refers to a visible dialog title.
    * A label specified by aria-label.
* Optionally, the aria-describedby property is set on the element with the `dialog` role to indicate which element or elements in the dialog contain content that describes the primary purpose or message of the dialog. Specifying descriptive elements enables screen readers to announce the description along with the dialog title and initially focused element when the dialog opens.
