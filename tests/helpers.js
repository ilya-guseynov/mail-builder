import { MAIL_BLOCK_TYPES } from "../src/constants";
import { createMailBlock } from "../src/mail-create-functions";

function createTestMailTitleBlock() {
  const testPosition = 1;
  const testType = MAIL_BLOCK_TYPES.TITLE_BLOCK;
  const testId = "TEST_ID";

  const testMailTitleBlock = createMailBlock(testType, testPosition);
  testMailTitleBlock.id = testId;

  return {
    testPosition,
    testType,
    testId,
    testMailTitleBlock,
  };
}

export {
  createTestMailTitleBlock,  
};
