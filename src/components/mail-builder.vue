<template>
  <div class="mail-builder">
    <div class="mail-builder__workspace">
      <table>
        <tbody>
          <tr>
            <td>
              <new-block-creator
                v-if="!hasBlocks"
                :position="0"
                @create-title-block="addTitleBlock"
                @create-content-block="addContentBlock"
              ></new-block-creator>
              <table v-for="(block, index) in orderedBlocks" :key="index">
                <tbody>
                  <tr>
                    <td>
                      <new-block-creator
                        :position="block.position"
                        @create-title-block="addTitleBlock"
                        @create-content-block="addContentBlock"
                      ></new-block-creator>
                      <div class="mail-builder__block-container" draggable="true" @dragstart="startDrag($event, block)" @drop="onDrop($event, block)" @dragover.prevent @dragenter.prevent>
                        <div class="mail-builder__change-position">
                          <button
                            class="mail-builder__change-position-button" 
                            v-if="block.position > 0"
                            @click="updateBlockPosition(block, block.position - 1)"
                          >↑</button>
                          <button 
                            class="mail-builder__change-position-button"
                            v-if="block.position < blocksCount - 1"
                            @click="updateBlockPosition(block, block.position + 1)"
                          >↓</button>
                        </div>
                        <div class="mail-builder__remove-button-container">
                          <button class="mail-builder__remove-button" @click="removeBlock(block.position)">X</button>
                        </div>
                        <mail-block-wrapper
                          :block="block"
                          @content-update="updateBlockContent"
                        ></mail-block-wrapper>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <new-block-creator
                v-if="hasBlocks"
                :position="blocksCount"
                @create-title-block="addTitleBlock"
                @create-content-block="addContentBlock"
              ></new-block-creator>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!hasBlocks">Создайте свой первый блок выше.</div>
    </div>
    <div class="mail-builder__preview-triggers">
      <button class="mail-builder__preview-trigger" @click="setJsonPreviewStatus(true)">Посмотреть JSON</button>
    </div>
    <json-preview v-if="jsonPreviewActive" :mail="mail" @close-preview="setJsonPreviewStatus(false)"></json-preview>
  </div>
</template>

<script>
import JsonPreview from "./json-preview";
import NewBlockCreator from "./new-block-creator";
import MailBlockWrapper from "./mail-block-wrapper";
import { createNewMailBlock } from "../helpers";
import MAIL_BLOCK_TYPES from "../constants/mail-block-types";

export default {
  name: "mail-builder",

  components: { JsonPreview, NewBlockCreator, MailBlockWrapper },

  data() {
    return {
      jsonPreviewActive: false,
      mail: {
        blocks: [],
      },
    };
  },

  computed: {
    orderedBlocks() {
      const blocksCopy = [...this.mail.blocks];
      blocksCopy.sort((firstBlock, secondBlock) => (firstBlock.position - secondBlock.position));
      return blocksCopy;
    },

    hasBlocks() {
      return this.mail.blocks.length > 0;
    },

    blocksCount() {
      return this.mail.blocks.length;
    },
  },

  mounted() {
    this.loadMailFromLocalStorage();
  },

  methods: {
    startDrag(event, block) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", block.id);
    },

    onDrop(event, block) {
      const itemID = event.dataTransfer.getData("text");
      const replaceBlock = this.mail.blocks.find(block => block.id === itemID);
      this.updateBlockPosition(block, replaceBlock.position);
    },

    saveMailToLocalStorage() {
      localStorage.setItem("MAIL_BUILDER_LOCAL_STORAGE_STATE", JSON.stringify(this.mail));
    },

    loadMailFromLocalStorage() {
      const mailFromLocalStorage = localStorage.getItem("MAIL_BUILDER_LOCAL_STORAGE_STATE");

      if (mailFromLocalStorage) {
        this.mail = JSON.parse(mailFromLocalStorage);
      }
    },

    updatePositions(newPosition) {
      for (let block of this.mail.blocks) {
        if (block.position >= newPosition) {
          block.position += 1;
        }
      }
    },

    addTitleBlock(addPosition) {
      this.updatePositions(addPosition);
      this.mail.blocks.push(createNewMailBlock(MAIL_BLOCK_TYPES.MAIL_TITLE_BLOCK, addPosition));
      this.saveMailToLocalStorage();
    },

    addContentBlock(addPosition) {
      this.updatePositions(addPosition);
      this.mail.blocks.push(createNewMailBlock(MAIL_BLOCK_TYPES.MAIL_CONTENT_BLOCK, addPosition));
      this.saveMailToLocalStorage();
    },

    updateBlockContent(updateBlock, newContent) {
      for (let block of this.mail.blocks) {
        if (block.id === updateBlock.id) {
          block.content = newContent;

          if (newContent === "") {
            this.removeBlock(updateBlock.position);
          }
        }
      }
      this.saveMailToLocalStorage();
    },

    updateBlockPosition(updateBlock, newPosition) {
      for (let block of this.mail.blocks) {
        if (block.position === newPosition) {
          block.position = updateBlock.position;
        }
      }
      for (let block of this.mail.blocks) {
        if (block.id === updateBlock.id) {
          block.position = newPosition;
        }
      }
      this.saveMailToLocalStorage();
    },

    removeBlock(removePosition) {
      this.mail.blocks = this.mail.blocks.filter(block => block.position !== removePosition);
      for (let block of this.mail.blocks) {
        if (block.position > removePosition) {
          block.position -= 1;
        }
      }
      this.saveMailToLocalStorage();
    },

    setJsonPreviewStatus(active) {
      this.jsonPreviewActive = active;
    },
  },
};
</script>

<style lang="scss" scoped>
.mail-builder {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__workspace {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  & table {
    width: 100%;
    max-width: 600px;
  }

  &__preview-triggers {
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
  }

  &__preview-trigger {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    transition: all .5s;
    border-bottom: 1px solid transparent;
    padding-bottom: 5px;
    font-size: 14px;

    &:hover {
      border-bottom: 1px solid gray;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__block-container {
    position: relative;

    &:hover .mail-builder__remove-button {
      opacity: 1;
    }

    &:hover .mail-builder__change-position {
      opacity: 1;
    }
  }

  &__remove-button-container {
    position: absolute;
    left: 0;
    transform: translateX(-100%);
    padding-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__remove-button {
    height: 20px;
    font-size: 20px;
    width: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    background: none;
    color: black;
    opacity: 0;
    transition: all .2s;

    &:hover {
      background: rgb(236, 236, 236);
    }
  }

  &__change-position {
    position: absolute;
    left: 0;
    transform: translateX(-100%);
    padding-right: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: all .2s;
  }

  &__change-position-button {
    height: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    background: none;
    color: black;
    transition: all .2s;

    &:hover {
      background: rgb(236, 236, 236);
    }
  }
}
</style>