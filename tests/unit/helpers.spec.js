import { v4 as uuidV4 } from "uuid";
import { createNewMailBlock } from "../../src/helpers";
import MAIL_BLOCK_TYPES from "../../src/constants/mail-block-types";
import MAIL_BLOCK_DEFAULT_VALUES from "../../src/constants/mail-block-default-values";

const testUuid = "TEST_ID_CREATED_WITH_UUIDV4";
jest.mock("uuid");
uuidV4.mockImplementation(() => testUuid);

describe("helpers", () => {
  describe("createNewMailBlock", () => {
    it("returns null if provided type is not correct", () => {
      const wrongTypeBlock = createNewMailBlock("this is not a type string", 1);
      expect(wrongTypeBlock).toBeNull();
    });

    it("returns block with provided type if provided type is correct", () => {
      Object.values(MAIL_BLOCK_TYPES).forEach(blockType => {
        const block = createNewMailBlock(blockType, 1);
        expect(block.type).toEqual(blockType);
      });
    });

    it("returns block with provived position", () => {
      for (let position = 0; position <= 100; position++) {
        Object.values(MAIL_BLOCK_TYPES).forEach(blockType => {
          const block = createNewMailBlock(blockType, position);
          expect(block.position).toEqual(position);
        });
      }
    });

    it("returns block with id created with uuidV4", () => {
      Object.values(MAIL_BLOCK_TYPES).forEach(blockType => {
        const block = createNewMailBlock(blockType, 1);
        expect(block.id).toEqual(testUuid);
      });
    });

    describe("returns block with correct default content", () => {
      it("returns block with default title content if provided type is title", () => {
        const titleBlock = createNewMailBlock(MAIL_BLOCK_TYPES.MAIL_TITLE_BLOCK, 1);
        expect(titleBlock.content).toEqual(MAIL_BLOCK_DEFAULT_VALUES.TITLE_BLOCK_DEFAULT_VALUE);
      });

      it("returns block with default text content if provided type is text", () => {
        const textBlock = createNewMailBlock(MAIL_BLOCK_TYPES.MAIL_TEXT_BLOCK, 1);
        expect(textBlock.content).toEqual(MAIL_BLOCK_DEFAULT_VALUES.TEXT_BLOCK_DEFAULT_VALUE);
      });

      it("returns block with default content content if provided type is content", () => {
        const contentBlock = createNewMailBlock(MAIL_BLOCK_TYPES.MAIL_CONTENT_BLOCK, 1);
        const content = contentBlock.content;

        expect(content[0].type).toEqual(MAIL_BLOCK_TYPES.MAIL_TEXT_BLOCK);
        expect(content[0].position).toEqual(0);
        expect(content[0].content).toEqual(MAIL_BLOCK_DEFAULT_VALUES.TEXT_BLOCK_DEFAULT_VALUE);
        expect(content[0].id).toEqual(testUuid);
      });
    });
  });
});
