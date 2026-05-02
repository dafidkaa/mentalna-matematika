document.addEventListener('DOMContentLoaded', async () => {
    await I18n.init();
    window.app = App;
    App.init();
});
