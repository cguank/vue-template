/*
 Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.getSelectedHtml = function () {
  //note: next line works for IE, but not other browsers, so not using (createRange() not supported)
  //return editor.getSelection().getNative().createRange().htmlText;

  //assumes only one ckeditor on a page
  //find the iframe and see what is selected
  var iframe = document.querySelector(".cke_contents iframe");

  // var iframe = $("td.cke_contents iframe");
  var sel = iframe.contentDocument.getSelection();
  let div = document.createElement("div");
  if (sel.rangeCount > 0) {
    range = sel.getRangeAt(0);
    var clonedSelection = range.cloneContents();
    div.append(clonedSelection)
    //console.log(div);

    return div
  } else
    return "";
};

CKEDITOR.dialog.add("mathjax", function (d) {
  var c, b = d.lang.mathjax;
  return {
    title: b.title,
    minWidth: 500,
    maxWidth: 500,
    minHeight: 100,
    contents: [{
      id: "info",
      elements: [{
        id: "equation",
        type: "textarea",
        label: b.dialogInput,
        validate: CKEDITOR.dialog.validate.notEmpty("Abbreviation field cannot be empty."),
        onLoad: function () {
          var a = this;
          if (!CKEDITOR.env.ie || 8 != CKEDITOR.env.version) this.getInputElement().on("keyup", function () {
            c.setValue("\\(" + a.getInputElement().getValue() + "\\)")
          })
        },
        setup: function (a) { //a.data.math获得输入框的值
          let selectText = CKEDITOR.getSelectedHtml().innerHTML;
          let trim = selectText.replace(/<span.*?data-latexstr="(.*?)".*?<\/span><\/span>/g, function (m, p1) {
            return p1;
          });
          selectText = trim;
          console.log(trim);
          if (selectText === '数字公式 小部件') {
            selectText = CKEDITOR.plugins.mathjax.trim(a.data.math)
          } else {
            a.data.math = `\\(${selectText}\\)`;
          }
          console.log(a.data.math);
          this.setValue(selectText)
        },
        commit: function (a) {//a是wedget
          a.setData("math", "\\(" + this.getValue() +
            "\\)");
          a.parts.span.$.setAttribute("data-latexstr", this.getValue()) //给span添上自定义属性,为了正则取值
        }
      }, {
        id: "documentation",
        type: "html",
        html: '\x3cdiv style\x3d"width:100%;text-align:right;margin:-8px 0 10px"\x3e\x3ca class\x3d"cke_mathjax_doc" href\x3d"' + b.docUrl + '" target\x3d"_black" style\x3d"cursor:pointer;color:#00B2CE;text-decoration:underline"\x3e' + b.docLabel + "\x3c/a\x3e\x3c/div\x3e"
      }, !(CKEDITOR.env.ie && 8 == CKEDITOR.env.version) && {
        id: "preview",
        type: "html",
        html: '\x3cdiv style\x3d"width:100%;text-align:center;"\x3e\x3ciframe style\x3d"border:0;width:0;height:0;font-size:20px" scrolling\x3d"no" frameborder\x3d"0" allowTransparency\x3d"true" src\x3d"' +
          CKEDITOR.plugins.mathjax.fixSrc + '"\x3e\x3c/iframe\x3e\x3c/div\x3e',
        onLoad: function () {
          var a = CKEDITOR.document.getById(this.domId).getChild(0);
          c = new CKEDITOR.plugins.mathjax.frameWrapper(a, d)
        },
        setup: function (a) {
          c.setValue(a.data.math)
        }
      }]
    }]
  }
});
