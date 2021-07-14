const MAIL_BLOCK_TYPES = {
  TITLE_BLOCK: "TITLE_BLOCK",
  CONTENT_BLOCK: "CONTENT_BLOCK",
};

const MAIL_BLOCK_DEFAULT_VALUES = {
  TITLE_BLOCK: "Новый заголовок",
  TEXT_PART_BLOCK: "Новый текст",
};

const CONTENT_ITEM_TYPE = {
  TEXT_BLOCK: "TEXT_BLOCK",
  SMALL_TITLE_BLOCK: "SMALL_TITLE_BLOCK",
  IMAGE_BLOCK: "IMAGE_BLOCK",
  DIVIDER_BLOCK: "DIVIDER_BLOCK",
};

const CONTENT_ITEM_DEFAULT_VALUE = {
  SMALL_TITLE_BLOCK: "Новый маленький заголовок",
  IMAGE_BLOCK: "https://medialeaks.ru/wp-content/uploads/2017/10/catbread-03-600x400.jpg",
};

const TEXT_BLOCK_TYPE = {
  TEXT_PART_BLOCK: "TEXT_PART_BLOCK",
  TEXT_LINK_BLOCK: "TEXT_LINK_BLOCK",
};

const TEXT_BLOCK_DEFAULT_VALUE = {
  TEXT_PART_BLOCK: "Текст",
  TEXT_LINK_BLOCK: {
    text: "Текст ссылки",
    link: "https://rtd.rt.com",
  },
};

export { 
  MAIL_BLOCK_TYPES, 
  MAIL_BLOCK_DEFAULT_VALUES, 
  CONTENT_ITEM_TYPE, 
  CONTENT_ITEM_DEFAULT_VALUE,
  TEXT_BLOCK_TYPE,
  TEXT_BLOCK_DEFAULT_VALUE,
};