import { v4 as uuidV4 } from "uuid";
import { MAIL_BLOCK_TYPES, MAIL_BLOCK_DEFAULT_VALUES, CONTENT_ITEM_TYPE } from "./constants";

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
    return [ createNewMailBlock(CONTENT_ITEM_TYPE.MAIL_TEXT_BLOCK, 0) ];
  }

  return MAIL_BLOCK_DEFAULT_VALUES[type];
}

export { createNewMailBlock };
