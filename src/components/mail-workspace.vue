<template>
  <div class="mail-workspace mail-workspace--no-blocks" v-if="!hasMailBlocks">
    <new-block-creator :position="0" @create-mail-block="emitAddMailBlock"></new-block-creator>
    <div class="mail-workspace__no-blocks-message">Создайте первый блок выше</div>
  </div>
  <div class="mail-workspace" v-else>
    <table style="border-spacing:0; width:100%; max-width:600px;">
      <tbody>
        <tr>
          <td style="padding:0;">
            <div class="mail-workspace__block" v-for="mailBlock in orderedMailBlocks" :key="mailBlock.id">
              <new-block-creator :position="mailBlock.position" @create-mail-block="emitAddMailBlock"></new-block-creator>
              <mail-block-container
                :mail-block="mailBlock"
                :is-first-block="mailBlock.position > 0"
                :is-last-block="mailBlock.position < mailBlocksCount - 1"
                @remove-mail-block="emitRemoveMailBlock(mailBlock.position)"
                @update-mail-block-position="emitUpdateMailBlockPosition"
                @update-mail-block-content="emitUpdateMailBlockContent"
              ></mail-block-container>
            </div>
            <new-block-creator :position="mailBlocksCount" @create-mail-block="emitAddMailBlock"></new-block-creator>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NewBlockCreator from "./new-block-creator";
import MailBlockContainer from "./mail-block-container";

export default {
  name: "mail-workspace",

  components: {
    NewBlockCreator,
    MailBlockContainer,
  },

  props: {
    mailBlocks: {
      type: Array,
      required: true,
    },
  },

  emits: [
    "add-mail-block",
    "remove-mail-block",
    "update-mail-block-content",
    "update-mail-block-position",
  ],

  computed: {
    /**
     * Returns mail blocks sorted by their positions.
     */
    orderedMailBlocks() {
      return [...this.mailBlocks].sort(
        (firstMailBlock, secondMailBlock) => (firstMailBlock.position - secondMailBlock.position)
      );
    },

    /**
     * Returns status if there are at least one mail block.
     */
    hasMailBlocks() {
      return this.mailBlocks.length > 0;
    },

    /**
     * Returns amount of mail blocks.
     */
    mailBlocksCount() {
      return this.mailBlocks.length;
    },
  },

  methods: {
    /**
     * Emits to parent component, that mail block with provided type must be created on provided position.
     */
    emitAddMailBlock(newMailBlockType, newMailBlockPosition) {
      this.$emit("add-mail-block", newMailBlockType, newMailBlockPosition);
    },

    /**
     * Emits to parent component, that mail block with provided position must be removed.
     */
    emitRemoveMailBlock(blockToRemovePosition) {
      this.$emit("remove-mail-block", blockToRemovePosition);
    },

    /**
     * Emits to parent component, that provided mail block content must be changed to new content.
     */
    emitUpdateMailBlockContent(blockToUpdate, newContent) {
      this.$emit("update-mail-block-content", blockToUpdate, newContent);
    },

    /**
     * Emits to parent component, that provided mail block position must be changed to new position.
     */
    emitUpdateMailBlockPosition(blockToUpdateId, newPosition) {
      const blockToUpdate = this.mailBlocks.find(mailBlock => mailBlock.id === blockToUpdateId);
      this.$emit("update-mail-block-position", blockToUpdate, newPosition);
    },
  },
};
</script>

<style lang="scss" scoped>
.mail-workspace {
  width: 100%;
  margin-top: 300px;

  &__no-blocks-message {
    text-align: center;
  }

  &__block {
    width: 100%;
  }
}
</style>