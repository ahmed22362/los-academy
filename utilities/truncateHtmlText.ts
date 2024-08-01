import { htmlToText } from "html-to-text";

export const truncateHtmlText = (html: string, length: number) => {
  const text = htmlToText(html, {
    wordwrap: false,
  });
  return text.length > length ? text.substring(0, length) + "..." : text;
};
