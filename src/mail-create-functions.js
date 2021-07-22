import { v4 as uuidV4 } from "uuid";
import { MAIL_BLOCK_TYPES, MAIL_BLOCK_DEFAULT_VALUES} from "./constants";

/**
 * Creates new mail block object based on provided type and order position.
 *
 * Returns `null` if incorrect type provided or position is not number or less than 0.
 *
 * @param { string } newMailBlockType
 * @param { number } newMailBlockPosition
 *
 * @returns { { id: string, position: number, type: string, content: string | Array } | null }
 */
function createMailBlock(newMailBlockType, newMailBlockPosition) {
  if (typeof newMailBlockPosition !== "number" || newMailBlockPosition < 0) {
    return null;
  }

  let newMailBlockContent = null;

  if (newMailBlockType === MAIL_BLOCK_TYPES.TITLE_BLOCK) {
    newMailBlockContent = MAIL_BLOCK_DEFAULT_VALUES.TITLE_BLOCK;
  } else if (newMailBlockType === MAIL_BLOCK_TYPES.CONTENT_BLOCK) {
    newMailBlockContent = MAIL_BLOCK_DEFAULT_VALUES.CONTENT_BLOCK;
  } else if (newMailBlockType === MAIL_BLOCK_TYPES.HEADER_BLOCK) {
    newMailBlockContent = MAIL_BLOCK_DEFAULT_VALUES.HEADER_BLOCK;
  } else {
    return null;
  }

  return {
    id: uuidV4(),
    position: newMailBlockPosition,
    type: newMailBlockType,
    content: newMailBlockContent,
  };
}

export { createMailBlock };
