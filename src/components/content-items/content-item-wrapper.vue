<template>
  <component
    :is="currentContentItemComponent"
    :content-item="contentItem"
    @content-update="emitContentUpdate"
  ></component>
</template>

<script>
import ContentItemSmallTitle from "./content-item-small-title";
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
        return ContentItemUnknown;
      } else if (this.contentItem.type === CONTENT_ITEM_TYPE.SMALL_TITLE_BLOCK) {
        return ContentItemSmallTitle;
      } else if (this.contentItem.type === CONTENT_ITEM_TYPE.IMAGE_BLOCK) {
        return ContentItemUnknown;
      } else if (this.contentItem.type === CONTENT_ITEM_TYPE.DIVIDER_BLOCK) {
        return ContentItemUnknown;
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
