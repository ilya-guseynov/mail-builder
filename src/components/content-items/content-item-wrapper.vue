<template>
  <component
    :is="currentContentItemComponent"
    :content-item="contentItem"
    @content-update="emitContentUpdate"
  ></component>
</template>

<script>
import ContentItemTextBlock from "./content-item-text-block";
import ContentItemImageBlock from "./content-item-image-block";
import ContentItemDivider from "./content-item-divider";
import ContentItemUnknown from "./content-item-unknown";
import { CONTENT_ITEM_TYPE } from "../../constants";

export default {
  name: "content-item-wrapper",

  props: {
    contentItem: {
      type: Object,
      required: true,
    },
  },

  emits: [
    "content-update",
  ],

  computed: {
    /**
     * Current content item component that will be rendered based on content item type.
     */
    currentContentItemComponent() {
      if (this.contentItem.type === CONTENT_ITEM_TYPE.TEXT_BLOCK) {
        return ContentItemTextBlock;
      } else if (this.contentItem.type === CONTENT_ITEM_TYPE.IMAGE_BLOCK) {
        return ContentItemImageBlock;
      } else if (this.contentItem.type === CONTENT_ITEM_TYPE.DIVIDER_BLOCK) {
        return ContentItemDivider;
      } else {
        return ContentItemUnknown;
      }
    },
  },

  methods: {
    /**
     * Emits to parent component, that content must be update with new data.
     *
     * @param { string | Array } newContent
     */
    emitContentUpdate(newContent) {
      this.$emit("content-update", this.contentItem, newContent);
    },
  },
};
</script>
