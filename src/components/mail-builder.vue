<template>
  <div class="mail-builder">
    <div class="mail-builder__workspace-container">
      <mail-workspace
        :mail-blocks="mailBlocks"
        @add-mail-block="addMailBlock"
        @remove-mail-block="removeMailBlock"
        @update-mail-block-content="updateMailBlockContent"
        @update-mail-block-position="updateMailBlockPosition"
      ></mail-workspace>
    </div>
    <mail-preview :mailBlocks="mailBlocks"></mail-preview>
  </div>
</template>

<script>
import MailWorkspace from "./mail-workspace";
import MailPreview from "./mail-preview";
import { createMailBlock } from "../mail-create-functions";

export default {
  name: "mail-builder",

  components: {
    MailWorkspace,
    MailPreview,
  },

  data() {
    return {
      mailBlocks: [],
    };
  },

  mounted() {
    this.loadMailBlocksFromLocalStorage();
  },

  methods: {
    /**
     * Adds new mail block object if provided type is correct.
     *
     * Increases all blocks positions below new position by 1.
     *
     * @param { string } newMailBlockType
     * @param { number } newMailBlockPosition
     */
    addMailBlock(newMailBlockType, newMailBlockPosition) {
      const newMailBlock = createMailBlock(newMailBlockType, newMailBlockPosition);

      if (newMailBlock) {
        for (let block of this.mailBlocks) {
          if (block.position >= newMailBlockPosition) {
            block.position += 1;
          }
        }

        this.mailBlocks.push(newMailBlock);
        this.saveMailBlocksToLocalStorage();
      }
    },

    /**
     * Removes mail block with provided position.
     *
     * Decreases all blocks position below remove positon bu 1.
     *
     * @param { number } blockToRemovePosition
     */
    removeMailBlock(blockToRemovePosition) {
      this.mailBlocks = this.mailBlocks.filter(block => block.position !== blockToRemovePosition);

      for (let block of this.mailBlocks) {
        if (block.position > blockToRemovePosition) {
          block.position -= 1;
        }
      }

      this.saveMailBlocksToLocalStorage();
    },

    /**
     * Update provided mail block with provided content.
     *
     * Removes mail block if new content is empty string.
     *
     * @param { object } blockToUpdate
     * @param { string } blockToUpdate.id
     * @param { string | object | Array } newContent
     */
    updateMailBlockContent(blockToUpdate, newContent) {
      for (let block of this.mailBlocks) {
        if (block.id === blockToUpdate.id) {
          block.content = newContent;

          if (newContent === "") {
            this.removeMailBlock(blockToUpdate.position);
          }
        }
      }

      this.saveMailBlocksToLocalStorage();
    },

    /**
     * Changes positions of provided block and block with provided position.
     *
     * @param { object } blockToUpdate
     * @param { string } blockToUpdate.id
     * @param { number } blockToUpdate.position
     * @param { number } newPosition
     */
    updateMailBlockPosition(blockToUpdate, newPosition) {
      for (let block of this.mailBlocks) {
        if (block.position === newPosition) {
          block.position = blockToUpdate.position;
        }
      }

      for (let block of this.mailBlocks) {
        if (block.id === blockToUpdate.id) {
          block.position = newPosition;
        }
      }

      this.saveMailBlocksToLocalStorage();
    },

    /**
     * Saves current status of mail blocks to local storage.
     */
    saveMailBlocksToLocalStorage() {
      localStorage.setItem("MAIL_BUILDER_LOCAL_STORAGE_STATE", JSON.stringify(this.mailBlocks));
    },

    /**
     * Tries to get mail blocks data from local storage and set it to local state if there is data.
     */
    loadMailBlocksFromLocalStorage() {
      const mailFromLocalStorage = localStorage.getItem("MAIL_BUILDER_LOCAL_STORAGE_STATE");

      if (mailFromLocalStorage) {
        this.mailBlocks = JSON.parse(mailFromLocalStorage);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mail-builder {
  width: 100%;
  margin-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__workspace-container {
    width: 100%;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>