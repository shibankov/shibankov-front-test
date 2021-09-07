(function () {

    function onReady()
    {
        //Popup
        function popup() {
            let popupLink = document.querySelectorAll(".popup-link"),
              body = document.querySelector("body"),
              closePopUp = document.querySelectorAll(".close-popup"),
              popupActive = document.querySelector(".popup.open"),
              popups = document.querySelectorAll (".popup");

            for (let link of popupLink){
                link.addEventListener("click",function (e) {
                    e.preventDefault();
                    let popupName = link.getAttribute('href'),
                      curentPopup = document.querySelector(popupName);
                    popupOpen(curentPopup);
                });
            }

            for (let close of closePopUp){
                close.addEventListener("click",function (e) {
                    e.preventDefault();
                    popupClose(close.closest('.popup'));
                });
            }

            function bodyLock() {
                body.classList.add('lock');
            }

            function popupOpen(curentPopup) {

                for (let popup of popups){
                    if (popup.classList.contains("open")){
                        popup.classList.remove("open");
                    }
                }

                bodyLock();

                curentPopup.classList.add('open');
                curentPopup.addEventListener("click",function (e) {
                    if (!e.target.closest(".popup__body")){
                        popupClose(e.target.closest('.popup'));
                    }
                });
            }

            function popupClose(popupActive) {
                popupActive.classList.remove("open");
                body.classList.remove('lock');
            }

        }
        popup();
        //End popup

        //Mask
        let elsPhone = document.querySelectorAll('.recall-form__input');
        let elPhoneOptions = {mask: '+{7}(000)000-00-00'};
        let maskPhone;

        for (let elPhone of elsPhone){
            if(elPhone.dataset.valid === 'phone'){
                maskPhone = IMask(elPhone, elPhoneOptions);
            }
        }
        //End mask

        //Validation
        let patterns = {
            company_name: /.+/,
            contact_person: /.+/,
            phone: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
            email:/^.+@.+\..+$/
        };
        let forms = document.querySelectorAll('.recall-form');

        for (let form of forms){
            let inputs = form.querySelectorAll('.recall-form__input');
            form.addEventListener('submit',function (e) {
                let err = false;

                for (let i = 0;i < inputs.length; i++){
                    let inp = inputs[i];
                    inp.value = inp.value.trim();
                    let pattern = patterns[inp.dataset.valid];
                    if(!pattern.test(inp.value)){
                        inp.classList.add('inp-еrror');
                        err = true;
                    }
                }

                if(err){
                    e.preventDefault();
                    for (let inp of inputs){
                        inp.classList.add('inp-еrror');
                    }
                }

            });
            form.addEventListener('focusin',function (e) {
                if (e.target.classList.contains('recall-form__input')){
                    e.target.classList.remove('inp-еrror');
                }
            });
        }
        //End validation
    }

    document.addEventListener('DOMContentLoaded', onReady);
})();
