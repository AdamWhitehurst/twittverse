export const textToHTMLLink = text =>
  // Parse text into html
  text
    // Replace newline characters with break tags
    .replace(/(\r\n|\n|\r)/gm, "<br/>")
    // Replace all @ mentions with external links
    .replace(
      /(https?:\/\/[^\s]+)/g,
      `<a class="external-link" href="javascript:void(0);" onclick="require('electron').shell.openExternal('$&');">$&</a>`
    )
    // Replace all http text with external links
    .replace(
      /[@]([\w]*)/g,
      `<a class="external-link" href="javascript:void(0);" onclick="require('electron').shell.openExternal('https://twitter.com/$&');">$&</a>`
    );

export const bigImage = imgText => imgText.replace("_normal.jpg", ".jpg");
export const julianToDate = dateText => new Date(dateText).toDateString();
