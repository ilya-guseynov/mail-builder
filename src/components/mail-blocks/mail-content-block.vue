<template>
  <table style="background:#eeeeee; padding:32px; width:100%;">
    <tbody>
      <tr>
        <td>
          <new-content-item-creator :position="0" @create-content-item="handleCreateContentItem"></new-content-item-creator>
          <div v-for="contentItem in mailBlock.content" :key="contentItem.id">{{ contentItem.type }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import NewContentItemCreator from "./new-content-item-creator";
import { createContentItem } from "../../mail-create-functions";

export default {
  name: "mail-content-block",

  components: {
    NewContentItemCreator,
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

  methods: {
    /**
     * Emits to parent component, that content must be updated with new data.
     * 
     * @param { Array } newContent
     */
    emitContentUpdate(newContent) {
      this.$emit("content-update", newContent);
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
        this.emitContentUpdate(newMailBlockContent);
      }
    },
  },
};
</script>
