<template>
  <table style="background:#eeeeee; padding:32px; width:100%;">
    <tbody>
      <tr>
        <td>
          <div v-if="!hasContentItems">
            <new-content-item-creator :position="0" @create-content-item="handleCreateContentItem"></new-content-item-creator>
            <div>Создайте первый контентный блок выше</div>
          </div>
          <div v-else>
            <div v-for="contentItem in orderedContentItems" :key="contentItem.id">
              <new-content-item-creator :position="contentItem.position" @create-content-item="handleCreateContentItem"></new-content-item-creator>
              <content-item-wrapper :content-item="contentItem" @content-update="emitContentUpdate"></content-item-wrapper>
            </div>
            <new-content-item-creator :position="contentItemsCount" @create-content-item="handleCreateContentItem"></new-content-item-creator>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import NewContentItemCreator from "./new-content-item-creator";
import ContentItemWrapper from "../content-items/content-item-wrapper";
import { createContentItem } from "../../mail-create-functions";

export default {
  name: "mail-content-block",

  components: {
    NewContentItemCreator,
    ContentItemWrapper,
  },

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },
  },

  emits: [
    "content-update",
  ],

  computed: {
    /**
     * Returns content items of mail block from props sorted by their positions.
     */
    orderedContentItems() {
      return [...this.mailBlock.content].sort(
        (firstContentItem, secondContentItem) => (firstContentItem.position - secondContentItem.position)
      );
    },

    /**
     * Returns amount of content items in mail blocks from props.
     */
    contentItemsCount() {
      return this.mailBlock.content.length;
    },

    /**
     * Returns status if mail block from props contain any content items.
     */
    hasContentItems() {
      return this.mailBlock.content.length > 0;
    },
  },

  methods: {
    /**
     * Emits to parent component, that content must be updated with new data.
     *
     * @param { Array | string } newContent
     */
    emitContentUpdate(contentItemToUpdate, newItemContent) {
      const newMailBlockContent = [...this.mailBlock.content];

      for (let contentItem of newMailBlockContent) {
        if (contentItem.id === contentItemToUpdate.id) {
          contentItem.content = newItemContent;
        }
      }

      this.$emit("content-update", newMailBlockContent);
    },

    /**
     * Emits to parent component that content must be updated with new item, if its type is correct.
     *
     * Also increases positions of items below new position by 1.
     *
     * @param { string } newContentItemType
     * @param { position } newContentItemPosition
     */
    handleCreateContentItem(newContentItemType, newContentItemPosition) {
      const newContentItem = createContentItem(newContentItemType, newContentItemPosition);

      if (newContentItem) {
        const newMailBlockContent = [...this.mailBlock.content];

        for (let contentItem of newMailBlockContent) {
          if (contentItem.position >= newContentItemPosition) {
            contentItem.position += 1;
          }
        }

        newMailBlockContent.push(newContentItem);
        this.$emit("content-update", newMailBlockContent);
      }
    },
  },
};
</script>
