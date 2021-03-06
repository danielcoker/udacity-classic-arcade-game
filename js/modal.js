/*
Modal JS script gotten from https://lowrey.me/modals-in-pure-es6-javascript/
*/

class Modal {
    constructor(overlay) {
        this.overlay = overlay;
        const closeButton = overlay.querySelector('.button-close')
        closeButton.addEventListener('click', this.close.bind(this));
        overlay.addEventListener('click', e => {
            if (e.srcElement.id === this.overlay.id) {
                this.close();
            }
        });
    }
    open() {
        this.overlay.classList.remove('is-hidden');
    }

    close() {
        this.overlay.classList.add('is-hidden');
    }
}