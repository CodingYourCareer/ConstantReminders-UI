import { mount } from '@vue/test-utils';
import App from './app.vue';
// jest.setup.ts
import '@testing-library/jest-dom';  



describe('app.vue', () => {
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

    console.log(wrapper.html()); // Add this line to debug the wrapper

    // Check if the component exists
    expect(wrapper.exists()).toBe(true);

    // Verify that a specific welcome text exists
    expect(wrapper.text()).toContain('Welcome to Constant Reminders');
  });
});
