import 'normalize.css';
import './sass/index.scss';

import './img/logo.png';

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
}

function clickPhone(e) {
    let element = e.currentTarget;
    let mask = '+7(___)___-____';
    if (!element.value) {
        element.value = mask;
    }
    setCaretToPos(element, element.value.search("_"));
}

function blurPhone(e) {
    let element = e.currentTarget;
    let numberPhone = element.value.match(/(\d)/g);
    if (numberPhone && numberPhone.length <= 1) {
        element.value = '';
    }
}

function inputPhone(e) {
    let element = e.currentTarget;
    let mask = '+7(___)___-____',
        numberPhone = element.value.match(/(\d)/g);
    if (numberPhone && element.value.length != mask.length) {
        let reg1 = /\)/g,
            reg2 = /\-/g;
        numberPhone.splice(0, 1);

        if (!reg1.test(element.value)) {
            numberPhone.splice(2, 1);
        }
        if (!reg2.test(element.value)) {
            numberPhone.splice(5, 1);
        }
        while (numberPhone.length < 10) {
            numberPhone.push('_');
        }
        numberPhone.splice(10, numberPhone.length);
        numberPhone.splice(6, 0, '-');
        numberPhone.splice(3, 0, ')');
        numberPhone.splice(0, 0, '+7(');
        element.value = numberPhone.join('');
        setCaretToPos(element, element.value.search("_"));
    }
}

let phoneInput = document.querySelectorAll('.payment__input[type="tel"]');
for (let i of phoneInput) {
    i.addEventListener("click", clickPhone);
    i.addEventListener("focus", clickPhone);
    i.addEventListener("blur", blurPhone);
    i.addEventListener('input', inputPhone);
}

function showModel (e) {
    let dataFor = e.currentTarget.dataset.for;
    if (document.querySelector(`#${dataFor}`).checked) {
        document.querySelector('#model0').checked = true;
    } else {
        document.querySelector(`#${dataFor}`).checked = true;
    }

}

document.querySelectorAll('.model__item').forEach(i => i.addEventListener('click', showModel));