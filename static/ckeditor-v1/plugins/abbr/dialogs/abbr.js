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

CKEDITOR.dialog.add('abbrDialog', function (editor) {
  return {
    title: '一键转latex',
    minWidth: 400,
    minHeight: 200,

    contents: [{
        id: 'tab-basic',
        label: 'Basic Settings',
        elements: [{
            type: 'text',
            id: 'abbr',
            label: 'Abbreviation',
            validate: CKEDITOR.dialog.validate.notEmpty("Abbreviation field cannot be empty."),

          setup: function (element) {  
            console.log('abbr setup');
              this.setValue(element.getText());
            },

          commit: function (element) {
              console.log('abbr commit');
              element.setText(this.getValue());
            }
          },
          {
            type: 'text',
            id: 'title',
            label: 'Explanation',
            validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty."),

            setup: function (element) {
              this.setValue(element.getAttribute("title"));
            },

            commit: function (element) {
              element.setAttribute("title", this.getValue());
            }
          }
        ]
      },
    ],

    onShow: function () {
      var selection = editor.getSelection();
      var element = selection.getStartElement();
      console.log(CKEDITOR.getSelectedHtml());
      
      if (element)
        element = element.getAscendant('abbr', true);

      if (!element || element.getName() != 'abbr') {
        element = editor.document.createElement('abbr');
        this.insertMode = true;
      } else
        this.insertMode = false;

      this.element = element;
      if (!this.insertMode)
        this.setupContent(this.element);
    },

    onOk: function () {
      console.log('abbr onok');
      var dialog = this;
      var abbr = this.element;
      this.commitContent(abbr);

      if (this.insertMode)
        editor.insertElement(abbr);
    }
  };
});
