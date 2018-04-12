import { shallow } from '@vue/test-utils';
import Messages from '@/components/shared/Messages';

const getWrapper = (msgs = []) => (shallow(Messages, {
  propsData: {
    msgs,
  },
}));

describe('Messages.vue', () => {
  test('empty', () => {
    const wrapper = getWrapper();
    expect(wrapper.findAll('.messages .item').length)
      .toBe(0);
  });

  test('one', () => {
    const wrapper = getWrapper(['hi']);
    expect(wrapper.findAll('.messages .item').length)
      .toBe(1);
  });

  test('error', () => {
    const text = 'bye';
    const wrapper = getWrapper([{ text, class: 'error' }]);
    expect(wrapper.findAll('.messages .item').length)
      .toBe(1);
    expect(wrapper.find('.messages .item').element.textContent)
      .toBe(text);
  });
});
