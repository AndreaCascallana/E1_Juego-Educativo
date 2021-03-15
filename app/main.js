window.onload = () => {

    // Global Vars
    let score = 0;
    let moves = 0;

    let arrow = document.querySelector('.fa-arrow-right');


    const dragAndDrop = () => {

        function dragMoveListener(event) {
            var target = event.target
            // keep the dragged position in the data-x/data-y attributes
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        };

        // this function is used later in the resizing and gesture demos
        window.dragMoveListener = dragMoveListener;

        interact('.drag-drop')
            .draggable({
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: '.content',
                        endOnly: true
                    })
                ],
                autoScroll: true,
                // dragMoveListener from the dragging demo above
                listeners: { move: dragMoveListener }
            });



        /* The dragging code for '.draggable' from the demo above
        * applies to this demo as well so it doesn't have to be repeated. */

        // enable draggables to be dropped into this
        interact('.dropzone').dropzone({
            // only accept elements matching this CSS selector
            accept: '.option',
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.80,

            // listen for drop related events:

            ondropactivate: function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active');
            },
            ondragenter: function (event) {
                var dropzoneElement = event.target;

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('drop-ok');
            },
            ondrop: function (event) {

                // Global Vars
                /** Variables que capturan tanto los elementos que intervienen en el drag and drop
                    como a sus respectivos IDs **/
                var dropzoneElement = event.target;
                var draggableElement = event.relatedTarget;
                let dropzoneID = dropzoneElement.id;
                let draggableElementID = draggableElement.id;

                let popup = document.querySelector('.popup');
                let popupBg = document.querySelector('.popup_content');
                let velo = document.querySelector('.velo');


                // Methods
                /** Funcionalidades que determinan si el drag and drop será o no acertado **/
                let isVidrioOK = () => {
                    let dropezoneOK = dropzoneID == "vidrio";
                    let dragOK = draggableElementID == "botella";
                    return dropezoneOK && dragOK;

                };
                let isVidrioNotOK = () => {
                    let dropezoneOK = dropzoneID == "residuos" ||
                        dropzoneID == "organico" ||
                        dropzoneID == "envases" ||
                        dropzoneID == "papel" ||
                        dropzoneID == "ptolimpio";
                    let dragNotOK = draggableElementID == "botella";

                    let glassIcon = document.querySelector('.info .icons .fa-glass');
                    let vidrioText = document.querySelector('.popup .vidrio');

                    if (dropezoneOK && dragNotOK) {
                        glassIcon.classList.add('active');
                        vidrioText.classList.add('active');

                        popup.classList.add('active');
                        popupBg.classList.add('active');
                        velo.classList.add('active');
                    };

                };

                let isResiduosOK = () => {
                    let dropezoneOK = dropzoneID == "residuos";
                    let dragOK = draggableElementID == "balon";
                    return dropezoneOK && dragOK;
                };
                let isResiduosNotOK = () => {
                    let dropezoneOK = dropzoneID == "vidrio" ||
                        dropzoneID == "organico" ||
                        dropzoneID == "envases" ||
                        dropzoneID == "papel" ||
                        dropzoneID == "ptolimpio";
                    let dragNotOK = draggableElementID == "balon";

                    let baloonIcon = document.querySelector('.info .icons .fa-futbol-o');
                    let residuosText = document.querySelector('.popup .residuos');

                    if (dropezoneOK && dragNotOK) {
                        baloonIcon.classList.add('active')
                        residuosText.classList.add('active');

                        popup.classList.add('active');
                        popupBg.classList.add('active');
                        velo.classList.add('active');
                    };

                };

                let isOrganicoOK = () => {
                    let dropezoneOK = dropzoneID == "organico";
                    let dragOK = draggableElementID == "limon" || draggableElementID == "planta";
                    return dropezoneOK && dragOK;
                };
                let isOrganicoNotOK = () => {
                    let dropezoneOK = dropzoneID == "vidrio" ||
                        dropzoneID == "residuos" ||
                        dropzoneID == "envases" ||
                        dropzoneID == "papel" ||
                        dropzoneID == "ptolimpio";
                    let dragNotOK = draggableElementID == "limon" ||
                        draggableElementID == "planta";

                    let lemonIcon = document.querySelector('.info .icons .fa-lemon-o');
                    let plantIcon = document.querySelector('.info .icons .fa-envira');
                    let organicoText = document.querySelector('.popup .organico');

                    if (dropezoneOK && dragNotOK) {
                        if (draggableElementID == "limon") {
                            lemonIcon.classList.add('active');
                            organicoText.classList.add('active');

                            popup.classList.add('active');
                            popupBg.classList.add('active');
                            velo.classList.add('active');
                        } else {
                            plantIcon.classList.add('active');
                            organicoText.classList.add('active');

                            popup.classList.add('active');
                            popupBg.classList.add('active');
                            velo.classList.add('active');
                        }
                    };

                };

                let isEnvasesOK = () => {
                    let dropezoneOK = dropzoneID == "envases";
                    let dragOK = draggableElementID == "envoltorio" || draggableElementID == "paraguas";
                    return dropezoneOK && dragOK;
                };
                let isEnvasesNotOK = () => {
                    let dropezoneOK = dropzoneID == "vidrio" ||
                        dropzoneID == "residuos" ||
                        dropzoneID == "organico" ||
                        dropzoneID == "papel" ||
                        dropzoneID == "ptolimpio";
                    let dragNotOK = draggableElementID == "envoltorio" ||
                        draggableElementID == "paraguas";

                    let plasticIcon = document.querySelector('.info .icons .fa-shopping-bag');
                    let umbrellaIcon = document.querySelector('.info .icons .fa-umbrella');
                    let envasesText = document.querySelector('.popup .envases');

                    if (dropezoneOK && dragNotOK) {
                        if (draggableElementID == "envoltorio") {
                            plasticIcon.classList.add('active');
                            envasesText.classList.add('active');

                            popup.classList.add('active');
                            popupBg.classList.add('active');
                            velo.classList.add('active');
                        } else {
                            umbrellaIcon.classList.add('active');
                            envasesText.classList.add('active');

                            popup.classList.add('active');
                            popupBg.classList.add('active');
                            velo.classList.add('active');
                        }
                    };

                };

                let isPapelOK = () => {
                    let dropezoneOK = dropzoneID == "papel";
                    let dragOK = draggableElementID == "libro";
                    return dropezoneOK && dragOK;
                };
                let isPapelNotOK = () => {
                    let dropezoneOK = dropzoneID == "vidrio" ||
                        dropzoneID == "residuos" ||
                        dropzoneID == "prganico" ||
                        dropzoneID == "envases" ||
                        dropzoneID == "ptolimpio";
                    let dragNotOK = draggableElementID == "libro";

                    let bookIcon = document.querySelector('.info .icons .fa-book');
                    let papelText = document.querySelector('.popup .papel');

                    if (dropezoneOK && dragNotOK) {
                        bookIcon.classList.add('active');
                        papelText.classList.add('active');

                        popup.classList.add('active');
                        popupBg.classList.add('active');
                        velo.classList.add('active');
                    };

                };

                let isPtoLimpioOK = () => {
                    let dropezoneOK = dropzoneID == "ptolimpio";
                    let dragOK = draggableElementID == "pila" || draggableElementID == "impresora";
                    return dropezoneOK && dragOK;
                };
                let isPtoLimpioNotOK = () => {
                    let dropezoneOK = dropzoneID == "vidrio" ||
                        dropzoneID == "residuos" ||
                        dropzoneID == "organico" ||
                        dropzoneID == "envases" ||
                        dropzoneID == "papel";
                    let dragNotOK = draggableElementID == "pila" ||
                        draggableElementID == "impresora";


                    let baterryIcon = document.querySelector('.info .icons .fa-battery-quarter');
                    let printerIcon = document.querySelector('.info .icons .fa-print');
                    let ptolimpioText = document.querySelector('.popup .ptolimpio');

                    if (dropezoneOK && dragNotOK) {
                        if (draggableElementID == "pila") {
                            baterryIcon.classList.add('active');
                            ptolimpioText.classList.add('active');

                            popup.classList.add('active');
                            popupBg.classList.add('active');
                            velo.classList.add('active');
                        } else {
                            printerIcon.classList.add('active');
                            ptolimpioText.classList.add('active');

                            popup.classList.add('active');
                            popupBg.classList.add('active');
                            velo.classList.add('active');
                        };
                    };
                };



                /** Variable que acumula todas las funcionalidades anteriormente declaradas 
                    que estipula que éstas deben ser ciertas para que se considere acertado el movimiento **/
                let ok = isPtoLimpioOK() == true ||
                    isVidrioOK() == true ||
                    isResiduosOK() == true ||
                    isOrganicoOK() == true ||
                    isEnvasesOK() == true ||
                    isPapelOK() == true;


                let notOk = isPtoLimpioNotOK() == true ||
                    isVidrioNotOK() == true ||
                    isResiduosNotOK() == true ||
                    isOrganicoNotOK() == true ||
                    isEnvasesNotOK() == true ||
                    isPapelNotOK() == true;




                // /** condicional que cambia los estilos de los elementos draggeables para que el usuario sepa si su movimiento ha estado acertado o no
                //     y que en caso negativo, visibilice un popup explicativo **/
                if (ok) {
                    draggableElement.classList.add('drop-ok');
                    score++;
                    console.log(score);
                } else {
                    draggableElement.classList.add('drop-not-ok');
                    notOk;
                    score -1;
                };



                moves++;
                console.log(moves);
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            }
        });

    };
    dragAndDrop();




    const closePopup = () => {

        // Global Vars
        let popup = document.querySelector('.popup');
        let velo = document.querySelector('.velo');
        let closePopupToggle = document.querySelector('.close .fa-times');

        let glassIcon = document.querySelector('.info .icons .fa-glass');
        let vidrioText = document.querySelector('.popup .vidrio');
        let baloonIcon = document.querySelector('.info .icons .fa-futbol-o');
        let residuosText = document.querySelector('.popup .residuos');
        let lemonIcon = document.querySelector('.info .icons .fa-lemon-o');
        let plantIcon = document.querySelector('.info .icons .fa-envira');
        let organicoText = document.querySelector('.popup .organico');
        let plasticIcon = document.querySelector('.info .icons .fa-shopping-bag');
        let umbrellaIcon = document.querySelector('.info .icons .fa-umbrella');
        let envasesText = document.querySelector('.popup .envases');
        let bookIcon = document.querySelector('.info .icons .fa-book');
        let papelText = document.querySelector('.popup .papel');
        let baterryIcon = document.querySelector('.info .icons .fa-battery-quarter');
        let printerIcon = document.querySelector('.info .icons .fa-print');
        let ptolimpioText = document.querySelector('.popup .ptolimpio');



        // Events
        closePopupToggle.addEventListener('click', () => {
            popup.classList.remove('active');
            velo.classList.remove('active');

            glassIcon.classList.remove('active');
            vidrioText.classList.remove('active');
            baloonIcon.classList.remove('active');
            residuosText.classList.remove('active');
            lemonIcon.classList.remove('active');
            plantIcon.classList.remove('active');
            organicoText.classList.remove('active');
            plasticIcon.classList.remove('active');
            umbrellaIcon.classList.remove('active');
            envasesText.classList.remove('active');
            bookIcon.classList.remove('active');
            papelText.classList.remove('active');
            baterryIcon.classList.remove('active');
            printerIcon.classList.remove('active');
            ptolimpioText.classList.remove('active');
        });
    };
    closePopup()





    const closeInitScreen = () => {
        /** Función para invisibilizar la pantalla inicial **/


        // Global Vars
        let initScreen = document.querySelector('.init_screen');

        initScreenOpened = true;


        // Methods
        if (initScreenOpened == true) {
            initScreen.classList.add('unactive');
        };
    };




    const startGame = () => {
        /** Funcionalidad completa para inicializar el juego y hacer visible el nivel 1 **/


        // Global Vars
        let startToggle = document.querySelector('.buttons .start');
        let gameLevels = document.querySelector('.levels_game_screen');
        let level1Topbar = document.querySelector('.top_bar .top_bar_content .level1');
        let trashContent = document.querySelector('.trash_content');
        let trashOptionsLevel1 = document.querySelector('.trash_options .level1');

        gameStarted = false;




        // Methods
        /** Función que hace visible el nivel 1 del juego **/
        let startGame = () => {
            gameLevels.classList.add('active');
            level1Topbar.classList.add('active');
            trashContent.classList.add('active');
            trashOptionsLevel1.classList.add('active');

            gameStarted = true;
        };


        // Events
        /** Si el juego no está iniciado, inicializamos el juego 
            y cerramos la pantalla de inicio**/
        startToggle.addEventListener('click', () => {
            if (!gameStarted) {
                startGame();
                closeInitScreen();
            };
        });
    };
    startGame();



    const changeLevels = () => {
        /** Funcionalidad completa para avanzar al siguiente nivel y eliminar de pantalla el nivel anterior **/


        // Global Vars
        let nextLevelToggle = document.querySelector('.top_bar_content .fa-arrow-right');
        let startToggle = document.querySelector('.buttons .start');

        /** LEVEL 1 **/
        let level1Title = document.querySelector('.top_bar_content .level1');
        let level1Options = document.querySelector('.trash_options .level1');
        let level1active = true;


        /** LEVEL 2 **/
        let level2Title = document.querySelector('.top_bar_content .level2');
        let level2Options = document.querySelector('.trash_options .level2');
        let level2active = null;


        /** LEVEL 3 **/
        let level3Title = document.querySelector('.top_bar_content .level3');
        let level3Options = document.querySelector('.trash_options .level3');
        let levels = document.querySelector('.levels_game_screen');
        let level3active = null;


        /** END GAME **/
        let initScreen = document.querySelector('.init_screen');
        let initIcon = initScreen.querySelector('.init');
        let initText = initScreen.querySelector('.text_content .init');

        let successEnd = initScreen.querySelector('.end_success');
        let warningEnd = initScreen.querySelector('.end_warning');
        let dangerEnd = initScreen.querySelector('.end_danger');
        let successEndIcon = initScreen.querySelector('.end_success .fa-globe');
        let warningEndIcon = initScreen.querySelector('.end_warning .fa-thumbs-up');
        let dangerEndIcon = initScreen.querySelector('.end_danger .fa-exclamation-triangle');

        let successTextEnd = initScreen.querySelector('.text_content .end_success');
        let warningTextEnd = initScreen.querySelector('.text_content .end_warning');
        let dangerTextEnd = initScreen.querySelector('.text_content .end_danger');

        let gameOver = null;




        // Methods
        /** Funciones para activar (OPEN) y desactivar (CLOSE) cada nivel **/

        /** LEVEL 1 **/
        // Invisibilizar el contenido del nivel 1
        let closeLevel1 = () => {

            level1active = false;

            level1Title.classList.remove('active');
            level1Options.classList.remove('active');

            arrow.classList.remove('active');
        };


        /** LEVEL 2 **/
        // Visibilizar el contenido del nivel 2
        let openLevel2 = () => {

            level2active = true;

            level2Title.classList.add('active');
            level2Options.classList.add('active');

            moves = 0;
        };

        // Invisibilizar el contenido del nivel 2
        let closeLevel2 = () => {

            level2active = false;

            level2Title.classList.remove('active');
            level2Options.classList.remove('active');

            arrow.classList.remove('active');
        };


        /** LEVEL 3 **/
        // Visibilizar el contenido del nivel 3
        let openLevel3 = () => {

            level3active = true;

            level3Title.classList.add('active');
            level3Options.classList.add('active');

            moves = 0;
        };

        // Invisibilizar el contenido del nivel 3
        let closeLevel3 = () => {

            level3active = false;

            level3Title.classList.remove('active');
            level3Options.classList.remove('active');
            levels.classList.remove('active');
        };

        // Visibilizar las diferentes opciones del final del juego según la puntuación obtenida
        let endGame = () => {

            if (score == 9) {
                initScreen.classList.remove('unactive');
                initIcon.classList.add('unactive');
                initText.classList.add('unactive');

                successEnd.classList.add('active');
                successTextEnd.classList.add('active');
                successEndIcon.classList.add('active');

                gameOver = true;
            } else if (score < 9 && score >= 5) {
                initScreen.classList.remove('unactive');
                initIcon.classList.add('unactive');
                initText.classList.add('unactive');

                warningEnd.classList.add('active');
                warningTextEnd.classList.add('active');
                warningEndIcon.classList.add('active');

                gameOver = true;
            } else {
                initScreen.classList.remove('unactive');
                initIcon.classList.add('unactive');
                initText.classList.add('unactive');

                dangerEnd.classList.add('active');
                dangerTextEnd.classList.add('active');
                dangerEndIcon.classList.add('active');

                gameOver = true;
            }
        };


        // Indicativo de la posibilidad de cambiar de nivel una vez realizados todos los movimientos posibles
        if (level1active == true) {
            if (moves == 2) {
                arrow.classList.add('active');
            };
        };
        if (level2active == true) {
            if (moves == 3) {
                arrow.classList.add('active');
            };
        };
        if (level3active == true) {
            if (moves == 4) {
                arrow.classList.add('active');
            };
        };


        

        // Events
        /** Evento que escucha siempre a la flecha y activa un nivel u otro 
         *  en función del nivel en el que se encuentre **/
        nextLevelToggle.addEventListener('click', () => {
            if (level1active == true) {
                closeLevel1();
                openLevel2();
            } else if (level2active == true) {
                closeLevel2();
                openLevel3();
            } else {
                closeLevel3();
                endGame();
            }
        });


        startToggle.addEventListener('click', () => {
            if (gameOver == true) {
                location.reload();
            };
        });
    };
    changeLevels();




    const backInit = () => {
        /** Funcionalidad completa para avanzar al siguiente nivel y eliminar de pantalla el nivel anterior **/


        // Global Vars
        let backInit = document.querySelector('.levels_game_screen .top_bar_content .fa-home');

        let init = document.querySelector('.init_screen');

        let levelsScreen = document.querySelector('.levels_game_screen');




        // Events
        backInit.addEventListener('click', () => {
            init.classList.remove('unactive');
            levelsScreen.classList.remove('active');

            gameStarted = false;

            location.reload();
        });
    };
    backInit();
};