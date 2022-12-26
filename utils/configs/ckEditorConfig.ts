const ckEditorConfig = {
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
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "text-sm sm:text-base" },
      {
        model: "heading1",
        view: "h2",
        title: "Heading 1",
        class: "text-xl sm:text-2xl",
      },
      {
        model: "heading2",
        view: "h3",
        title: "Heading 2",
        class: "text-lg sm:text-xl",
      },
      {
        model: "heading3",
        view: "h4",
        title: "Heading 3",
        class: "text-base sm:text-lg",
      },
    ],
  },
  link: {
    addTargetToExternalLinks: true,
  },
};

export default ckEditorConfig;
