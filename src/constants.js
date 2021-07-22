const MAIL_BLOCK_TYPES = {
  TITLE_BLOCK: "TITLE_BLOCK",
  CONTENT_BLOCK: "CONTENT_BLOCK",
  HEADER_BLOCK: "HEADER_BLOCK",
};

const MAIL_BLOCK_DEFAULT_VALUES = {
  TITLE_BLOCK: "<p>Новый заголовок</p>",
  CONTENT_BLOCK: "<p>Новый Текст</p>",
  HEADER_BLOCK: 
    "<p style='font-size: 14px;color: #7F7F7F;letter-spacing: 0;margin: 0;padding:0;'>Weekly 650</p>" +
    "<p style='font-weight: bold;font-size: 16px;color: #000000;margin: 8px 0 0 0;padding:0;letter-spacing: 0;'>14 июля</p>",
};

const RT_LOGO_IMAGE_URL = "https://cdn.rt.com/email/logo_2.png";

export { 
  MAIL_BLOCK_TYPES,
  MAIL_BLOCK_DEFAULT_VALUES,
  RT_LOGO_IMAGE_URL,
};
