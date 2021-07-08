import { v4 as uuidV4 } from "uuid";
import MAIL_BLOCK_TYPES from "./constants/mail-block-types";
import MAIL_BLOCK_DEFAULT_VALUES from "./constants/mail-block-default-values";

function createNewMailBlock(type, position) {
  switch (type) {
    case MAIL_BLOCK_TYPES.MAIL_TITLE_BLOCK:
      return {
        position,
        type: MAIL_BLOCK_TYPES.MAIL_TITLE_BLOCK,
        content: MAIL_BLOCK_DEFAULT_VALUES.TITLE_BLOCK_DEFAULT_VALUE,
        id: uuidV4(),
      };
    case MAIL_BLOCK_TYPES.MAIL_CONTENT_BLOCK:
      return {
        position,
        type: MAIL_BLOCK_TYPES.MAIL_CONTENT_BLOCK,
        content: [ createNewMailBlock(MAIL_BLOCK_TYPES.MAIL_TEXT_BLOCK, 0) ],
        id: uuidV4(),
      };
    case MAIL_BLOCK_TYPES.MAIL_TEXT_BLOCK:
      return {
        position,
        type: MAIL_BLOCK_TYPES.MAIL_TEXT_BLOCK,
        content: MAIL_BLOCK_DEFAULT_VALUES.TEXT_BLOCK_DEFAULT_VALUE,
        id: uuidV4(),
      };
    default:
      return null;
  }
}

export {
  createNewMailBlock,
};
