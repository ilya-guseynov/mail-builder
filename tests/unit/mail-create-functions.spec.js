import { v4 as uuidV4 } from "uuid";
import {
  createMailBlock,
  createContentItem,
  createTextBlock,
} from "../../src/mail-create-functions";
import {
  MAIL_BLOCK_TYPES,
  MAIL_BLOCK_DEFAULT_VALUES,
  CONTENT_ITEM_TYPE,
  CONTENT_ITEM_DEFAULT_VALUE,
  TEXT_BLOCK_TYPE,
  TEXT_BLOCK_DEFAULT_VALUE,
} from "../../src/constants";

const testPosition = 1;
const testUuid = "TEST_ID_CREATED_WITH_UUIDV4";
jest.mock("uuid");
uuidV4.mockImplementation(() => testUuid);

describe("mail-create-functions.js", () => {
  describe("createMailBlock", () => {
    it("returns null if provided position is not a number", () => {
      Object.values(MAIL_BLOCK_TYPES).forEach(mailBlockType => {
        const testMailBlock = createMailBlock(mailBlockType, "not a number");
        expect(testMailBlock).toBeNull();
      });
    });

    it("returns null if provided position is less than 0", () => {
      Object.values(MAIL_BLOCK_TYPES).forEach(mailBlockType => {
        const testMailBlock = createMailBlock(mailBlockType, -1);
        expect(testMailBlock).toBeNull();
      });
    });

    it("returns null if provided type is not correct", () => {
      const testMailBlock = createMailBlock("not a type", testPosition);
      expect(testMailBlock).toBeNull();
    });

    it("returns object with unique id, provided postion and provided type if position and type are correct", () => {
      Object.values(MAIL_BLOCK_TYPES).forEach(mailBlockType => {
        const testMailBlock = createMailBlock(mailBlockType, testPosition);

        expect(testMailBlock.id).toEqual(testUuid);
        expect(testMailBlock.position).toEqual(testPosition);
        expect(testMailBlock.type).toEqual(mailBlockType);
      });
    });

    describe("returns object with correct contnet for provided type", () => {
      it("returns a string with default value as content if it is title block", () => {
        const testTitleBlock = createMailBlock(MAIL_BLOCK_TYPES.TITLE_BLOCK, testPosition);
        expect(testTitleBlock.content).toEqual(MAIL_BLOCK_DEFAULT_VALUES.TITLE_BLOCK);
      });

      it("returns an array of content items with one content item text block as content if it is content block", () => {
        const testContentBlock = createMailBlock(MAIL_BLOCK_TYPES.CONTENT_BLOCK, testPosition);
        expect(testContentBlock.content[0].type).toEqual(CONTENT_ITEM_TYPE.TEXT_BLOCK);
      });
    });
  });

  describe("createContentItem", () => {
    it("returns null if provided position is not a number", () => {
      Object.values(CONTENT_ITEM_TYPE).forEach(contentItemType => {
        const testContentItem = createContentItem(contentItemType, "not a number");
        expect(testContentItem).toBeNull();
      });
    });

    it("returns null if provided position is less than 0", () => {
      Object.values(CONTENT_ITEM_TYPE).forEach(contentItemType => {
        const testContentItem = createContentItem(contentItemType, -1);
        expect(testContentItem).toBeNull();
      });
    });

    it("returns null if provided type is not correct", () => {
      const testContentItem = createContentItem("not a type", testPosition);
      expect(testContentItem).toBeNull();
    });

    it("returns object with unique id, provided postion and provided type if position and type are correct", () => {
      Object.values(CONTENT_ITEM_TYPE).forEach(contentItemType => {
        const testContentItem = createContentItem(contentItemType, testPosition);

        expect(testContentItem.id).toEqual(testUuid);
        expect(testContentItem.position).toEqual(testPosition);
        expect(testContentItem.type).toEqual(contentItemType);
      });
    });

    describe("returns object with correct contnet for provided type", () => {
      it("returns an array of text blocks with one text part block as content if it is text block", () => {
        const testTextBlock = createContentItem(CONTENT_ITEM_TYPE.TEXT_BLOCK, testPosition);
        expect(testTextBlock.content[0].type).toEqual(TEXT_BLOCK_TYPE.TEXT_PART_BLOCK);
      });

      it("returns a string with default value as content if it is small title block", () => {
        const testSmallTitleBlock = createContentItem(CONTENT_ITEM_TYPE.SMALL_TITLE_BLOCK, testPosition);
        expect(testSmallTitleBlock.content).toEqual(CONTENT_ITEM_DEFAULT_VALUE.SMALL_TITLE_BLOCK);
      });

      it("returns a string with default value as content if it is image block", () => {
        const testImageBlock = createContentItem(CONTENT_ITEM_TYPE.IMAGE_BLOCK, testPosition);
        expect(testImageBlock.content).toEqual(CONTENT_ITEM_DEFAULT_VALUE.IMAGE_BLOCK);
      });

      it("returns null as content if it is divider block", () => {
        const testDividerBlock = createContentItem(CONTENT_ITEM_TYPE.DIVIDER_BLOCK, testPosition);
        expect(testDividerBlock.content).toBeNull();
      });
    });
  });

  describe("createTextBlock", () => {
    it("returns null if provided position is not a number", () => {
      Object.values(TEXT_BLOCK_TYPE).forEach(textBlockType => {
        const testTextBlock = createTextBlock(textBlockType, "not a number");
        expect(testTextBlock).toBeNull();
      });
    });

    it("returns null if provided position is less than 0", () => {
      Object.values(TEXT_BLOCK_TYPE).forEach(textBlockType => {
        const testTextBlock = createTextBlock(textBlockType, -1);
        expect(testTextBlock).toBeNull();
      });
    });

    it("returns null if provided type is not correct", () => {
      const testTextBlock = createTextBlock("not a type", testPosition);
      expect(testTextBlock).toBeNull();
    });

    it("returns object with unique id, provided postion and provided type if position and type are correct", () => {
      Object.values(TEXT_BLOCK_TYPE).forEach(textBlockType => {
        const testTextBlock = createTextBlock(textBlockType, testPosition);

        expect(testTextBlock.id).toEqual(testUuid);
        expect(testTextBlock.position).toEqual(testPosition);
        expect(testTextBlock.type).toEqual(textBlockType);
      });
    });

    describe("returns object with correct contnet for provided type", () => {
      it("returns a string with default value as content if it is text part block", () => {
        const testTextPartBlock = createTextBlock(TEXT_BLOCK_TYPE.TEXT_PART_BLOCK, testPosition);
        expect(testTextPartBlock.content).toEqual(TEXT_BLOCK_DEFAULT_VALUE.TEXT_PART_BLOCK);
      });

      it("returns on object with two string with default values as content if it is text link block", () => {
        const testTextLinkBlock = createTextBlock(TEXT_BLOCK_TYPE.TEXT_LINK_BLOCK, testPosition);
        expect(testTextLinkBlock.content).toEqual(TEXT_BLOCK_DEFAULT_VALUE.TEXT_LINK_BLOCK);
      });
    });
  });
});
