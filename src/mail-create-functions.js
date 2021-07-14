import { v4 as uuidV4 } from "uuid";
import {
  MAIL_BLOCK_TYPES,
  MAIL_BLOCK_DEFAULT_VALUES,
  CONTENT_ITEM_TYPE,
  CONTENT_ITEM_DEFAULT_VALUE,
  TEXT_BLOCK_TYPE,
  TEXT_BLOCK_DEFAULT_VALUE,
} from "./constants";

/**
 * Creates new mail block object based on provided type and order position.
 *
 * Returns `null` if incorrect type provided or position is not number or less than 0.
 *
 * @param { string } newMailBlockType
 *
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
    newMailBlockContent = [ createContentItem(CONTENT_ITEM_TYPE.TEXT_BLOCK, 0) ];
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

/**
 * Creates new content item object based on provided type and order position.
 *
 * Returns `null` if incorrect type provided or position is not number or less than 0.
 *
 * @param { string } newContentItemType
 *
 * @param { number } newContentItemPosition
 *
 * @returns { { position: number, type: string, content: string | Array | null, id: string } | null }
 */
function createContentItem(newContentItemType, newContentItemPosition) {
  if (typeof newContentItemPosition !== "number" || newContentItemPosition < 0) {
    return null;
  }

  let newContentItemContent = null;

  if (newContentItemType === CONTENT_ITEM_TYPE.TEXT_BLOCK) {
    newContentItemContent = [ createTextBlock(TEXT_BLOCK_TYPE.TEXT_PART_BLOCK, 0) ];
  } else if (newContentItemType === CONTENT_ITEM_TYPE.SMALL_TITLE_BLOCK) {
    newContentItemContent = CONTENT_ITEM_DEFAULT_VALUE.SMALL_TITLE_BLOCK;
  } else if (newContentItemType === CONTENT_ITEM_TYPE.IMAGE_BLOCK) {
    newContentItemContent = CONTENT_ITEM_DEFAULT_VALUE.IMAGE_BLOCK;
  } else if (newContentItemType === CONTENT_ITEM_TYPE.DIVIDER_BLOCK) {
    newContentItemContent = null;
  } else {
    return null;
  }

  return {
    id: uuidV4(),
    position: newContentItemPosition,
    type: newContentItemType,
    content: newContentItemContent,
  };
}

/**
 * Creates new text block object based on provided type and order position.
 *
 * Returns `null` if incorrect type provided or position is not number or less than 0.
 *
 * @param { string } newTextBlockType
 *
 * @param { number } newTextBlockPosition
 *
 * @returns { { position: number, type: string, content: string | object, id: string } | null }
 */
function createTextBlock(newTextBlockType, newTextBlockPosition) {
  if (typeof newTextBlockPosition !== "number" || newTextBlockPosition < 0) {
    return null;
  }

  let newTextBlockContent = null;

  if (newTextBlockType === TEXT_BLOCK_TYPE.TEXT_PART_BLOCK) {
    newTextBlockContent = TEXT_BLOCK_DEFAULT_VALUE.TEXT_PART_BLOCK;
  } else if (newTextBlockType === TEXT_BLOCK_TYPE.TEXT_LINK_BLOCK) {
    newTextBlockContent = TEXT_BLOCK_DEFAULT_VALUE.TEXT_LINK_BLOCK;
  } else {
    return null;
  }

  return {
    id: uuidV4(),
    position: newTextBlockPosition,
    type: newTextBlockType,
    content: newTextBlockContent,
  };
}

export { createMailBlock, createContentItem, createTextBlock };
