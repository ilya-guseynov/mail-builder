import { shallowMount } from "@vue/test-utils";
import App from "../../src/app";
import MailBuilder from "../../src/components/mail-builder";

describe("app.vue", () => {
  const wrapper = shallowMount(App);

  it("renders mail-builder component", () => {
    expect(wrapper.findComponent(MailBuilder).exists()).toBe(true);
  });
});
