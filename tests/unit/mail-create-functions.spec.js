import { v4 as uuidV4 } from "uuid";
import { createMailBlock } from "../../src/mail-create-functions";
import { MAIL_BLOCK_TYPES, MAIL_BLOCK_DEFAULT_VALUES } from "../../src/constants";

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

    it("returns object with unique id, provided position and provided type if position and type are correct", () => {
      Object.values(MAIL_BLOCK_TYPES).forEach(mailBlockType => {
        const testMailBlock = createMailBlock(mailBlockType, testPosition);

        expect(testMailBlock.id).toEqual(testUuid);
        expect(testMailBlock.position).toEqual(testPosition);
        expect(testMailBlock.type).toEqual(mailBlockType);
      });
    });

    describe("returns object with correct content for provided type", () => {
      it("returns a string with default value as content if it is title block", () => {
        const testTitleBlock = createMailBlock(MAIL_BLOCK_TYPES.TITLE_BLOCK, testPosition);
        expect(testTitleBlock.content).toEqual(MAIL_BLOCK_DEFAULT_VALUES.TITLE_BLOCK);
      });

      it("returns an array of content items with one content item text block as content if it is content block", () => {
        const testContentBlock = createMailBlock(MAIL_BLOCK_TYPES.CONTENT_BLOCK, testPosition);
        expect(testContentBlock.content).toEqual(MAIL_BLOCK_DEFAULT_VALUES.CONTENT_BLOCK);
      });
    });
  });
});
