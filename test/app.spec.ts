// app.spec.ts
import { mount } from '@vue/test-utils';
import App from './app.vue';  // Ensure the path is correct relative to this file

describe('App.vue', () => {
  it('renders the welcome page', () => {
    const wrapper = mount(App as any, {
      global: {
        stubs: {
          // Optionally, stub components here
          // 'router-link': true,
          // 'router-view': true,
        },
      },
    });

    // Debug output
    console.log(wrapper.html());

    // Check if the component exists
    expect(wrapper.exists()).toBe(true);

    // Verify that a specific welcome text exists
    expect(wrapper.text()).toContain('Welcome to Constant Reminders');
  });
});
