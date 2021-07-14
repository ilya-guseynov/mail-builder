<template>
  <div class="mail-block-container">
    <table style="border-spacing:0; width:100%;">
      <tbody>
        <tr>
          <td
            style="padding:0;"
            class="mail-block-container__inner"
            draggable="true"
            @dragstart="startDragMailBlock($event)"
            @drop="onDropMailBlockOnAnotherBlock($event)"
            @dragover.prevent
            @dragenter.prevent
          >
            <div class="mail-block-container__change-position">
              <button
                class="mail-block-container__change-position-button"
                v-if="isFirstBlock"
                @click="emitUpdateMailBlockPosition(mailBlock.position - 1)"
              >↑</button>
              <button
                class="mail-block-container__change-position-button"
                v-if="isLastBlock"
                @click="emitUpdateMailBlockPosition(mailBlock.position + 1)"
              >↓</button>
            </div>
            <div class="mail-block-container__remove-button-container">
              <button class="mail-block-container__remove-button" @click="emitRemoveMailBlock">X</button>
            </div>
            <mail-block-wrapper :mail-block="mailBlock" @content-update="emitUpdateMailBlockContent"></mail-block-wrapper>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MailBlockWrapper from "./mail-blocks/mail-block-wrapper";

export default {
  name: "mail-block-container",

  components: {
    MailBlockWrapper,
  },

  emits: [
    "remove-mail-block",
    "update-mail-block-position",
    "update-mail-block-content",
  ],

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },

    isFirstBlock: {
      type: Boolean,
      required: true,
    },

    isLastBlock: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    /**
     * Emits to parent component, that current mail block must be removed.
     */
    emitRemoveMailBlock() {
      this.$emit("remove-mail-block");
    },

    /**
     * Emits to parent component, that current component content must be changed to new one.
     *
     * @param { string | Array | object } newContent
     */
    emitUpdateMailBlockContent(newContent) {
      this.$emit("update-mail-block-content", this.mailBlock, newContent);
    },

    /**
     * Emits to parent component, that current component position must be changed to new one.
     *
     * @param { number } newPosition
     */
    emitUpdateMailBlockPosition(newPosition) {
      this.$emit("update-mail-block-position", this.mailBlock.id, newPosition);
    },

    /**
     * Handles event, when mail block is draged by user.
     *
     * @param { object } event
     */
    startDragMailBlock(event) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", this.mailBlock.id);
    },

    /**
     * Handles event, when mail block is droped by user.
     *
     * @param { object } event
     */
    onDropMailBlockOnAnotherBlock(event) {
      const dropedMailBlockId = event.dataTransfer.getData("text");
      this.$emit("update-mail-block-position", dropedMailBlockId, this.mailBlock.position);
    },
  },
};
</script>

<style lang="scss" scoped>
.mail-block-container {
  &__inner {
    position: relative;

    &:hover .mail-block-container__remove-button {
      opacity: 1;
    }

    &:hover .mail-block-container__change-position {
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