const ckEditorConfigPost = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "link",
      "strikethrough",
      "code",
      "codeBlock",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
    ],
  },
  language: "en",
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  mediaEmbed: {
    previewsInData: true,
  },
};

const ckEditorConfigComment = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "link",
      "strikethrough",
      "code",
      "codeBlock",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "blockQuote",
      "insertTable",
      "undo",
      "redo",
    ],
  },
  language: "en",
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
};

const exports = {
  ckEditorConfigPost,
  ckEditorConfigComment
}

export default exports;
