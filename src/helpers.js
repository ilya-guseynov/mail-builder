import { v4 as uuidV4 } from "uuid";
import MAIL_BLOCK_TYPES from "./constants/mail-block-types";
import MAIL_BLOCK_DEFAULT_VALUES from "./constants/mail-block-default-values";

function createNewMailBlock(type, position) {
  if (!Object.values(MAIL_BLOCK_TYPES).includes(type)) {
    return null;
  }

  return {
    position,
    type,
    content: _createNewMailBlockContent(type),
    id: uuidV4(),
  };
}

function _createNewMailBlockContent(type) {
  if (type === MAIL_BLOCK_TYPES.MAIL_CONTENT_BLOCK) {
    return [ createNewMailBlock(MAIL_BLOCK_TYPES.MAIL_TEXT_BLOCK, 0) ];
  } else if (type === MAIL_BLOCK_TYPES.MAIL_TEXT_LINK_BLOCK) {
    return { linkUrl: "https://rtd.rt.com", linkText: "Ссылка" };
  } else if (type === MAIL_BLOCK_TYPES.MAIL_DIVIDER_BLOCK) {
    return null;
  }

  return MAIL_BLOCK_DEFAULT_VALUES[type];
}

export { createNewMailBlock };
