import { mount } from "@vue/test-utils";
import MailBuilder from "../../../src/components/mail-builder";
import MailPreview from "../../../src/components/mail-preview";
import MailWorkspace from "../../../src/components/mail-workspace";
import { MAIL_BLOCK_TYPES } from "../../../src/constants";
import { createTestMailTitleBlock } from "../../helpers";

describe("mail-builder.vue", () => {
  it("renders mail-preview component", () => {
    const wrapper = mount(MailBuilder);
    expect(wrapper.findComponent(MailPreview).exists()).toBe(true);
  });

  it("renders mail-workspace component", () => {
    const wrapper = mount(MailBuilder);
    expect(wrapper.findComponent(MailWorkspace).exists()).toBe(true);
  });

  it("renders button to clear mail blocks data", () => {
    const wrapper = mount(MailBuilder);
    expect(wrapper.find(".mail-builder__clear-button").exists()).toBe(true);
  });

  it("clears mail blocks data when clear button is clicked", () => {
    const wrapper = mount(MailBuilder);
    const { testMailTitleBlock } = createTestMailTitleBlock();

    wrapper.setData({
      mailBlocks: [
        testMailTitleBlock,
      ],
    });

    wrapper.find(".mail-builder__clear-button").trigger("click");

    expect(wrapper.vm.mailBlocks).toEqual([]);
  });

  it("creates new mail block when mail-workspace component emit add mail block event", () => {
    const wrapper = mount(MailBuilder);
    wrapper.findComponent(MailWorkspace).vm.$emit("add-mail-block", MAIL_BLOCK_TYPES.TITLE_BLOCK, 10);

    expect(wrapper.vm.mailBlocks[0].position).toEqual(10);
    expect(wrapper.vm.mailBlocks[0].type).toEqual(MAIL_BLOCK_TYPES.TITLE_BLOCK);
    wrapper.vm.mailBlocks = [];
  });

  it("increases positions of mail blocks with higher postitions when add new block on child add main block event", () => {
    const wrapper = mount(MailBuilder);
    wrapper.vm.mailBlocks = [];

    wrapper.findComponent(MailWorkspace).vm.$emit("add-mail-block", MAIL_BLOCK_TYPES.TITLE_BLOCK, 0);
    expect(wrapper.vm.mailBlocks[0].position).toEqual(0);

    wrapper.findComponent(MailWorkspace).vm.$emit("add-mail-block", MAIL_BLOCK_TYPES.TITLE_BLOCK, 1);
    expect(wrapper.vm.mailBlocks[0].position).toEqual(0);
    expect(wrapper.vm.mailBlocks[1].position).toEqual(1);

    wrapper.findComponent(MailWorkspace).vm.$emit("add-mail-block", MAIL_BLOCK_TYPES.TITLE_BLOCK, 1);
    expect(wrapper.vm.mailBlocks[0].position).toEqual(0);
    expect(wrapper.vm.mailBlocks[1].position).toEqual(2);
    expect(wrapper.vm.mailBlocks[2].position).toEqual(1);

    wrapper.vm.mailBlocks = [];
  });
});