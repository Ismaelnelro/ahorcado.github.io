let sound = new Audio('./sounds/walkingforest.wav');
let almacen_de_letras_erradas = [];


/*ELEGIR CHARACTER*/
let personaje = 1
let btnCharacterChoosen = document.getElementById("personaje");
let intro = new Audio('./sounds/intro.mp3');
let intr2 = new Audio('./sounds/jHyVHAID8jXQ.128.mp3');




btnCharacterChoosen.addEventListener('click', () => {
    intro.play()
    intr2.play()
    setTimeout(() => {
        intr2.play()
    }, 120000);
    btnCharacterChoosen.setAttribute('disabled', 'true');
    let containerPersonajes = document.getElementById("containerPersonajes");
    containerPersonajes.className = "personajesVisibles";

    for (let p = 0; p < 6; p++) {
        let btnPersonaje = document.createElement("div")
        btnPersonaje.className = "cards"
        btnPersonaje.id = `${p.toString()}`
        let img = document.createElement("img");
        img.src = `img/characters/character${p}.png`
        btnPersonaje.appendChild(img);
        containerPersonajes.appendChild(btnPersonaje)
    }

    let elegidos = document.querySelectorAll(".cards");
    let paginaInicio = document.querySelector("#paginaInicial");
    let paginaJuego = document.querySelector("#paginaJuego");

    elegidos.forEach(p => {
        p.addEventListener('mouseenter', () => {
            let sonido = new Audio('./sounds/sonidoEleccionPersonaje.mp3');
            sonido.play()
        })
    })

    elegidos.forEach(neo => {
        neo.addEventListener('click', () => {
            personaje = parseInt(neo.id)
            containerPersonajes.classList = "visibilidad"
            paginaInicio.className = "visibilidad"
            paginaJuego.className = ""
            elegir_palabra();
            ejecucion()
        })
    });
})




/*Pagina de inicio*/
let $btnSave = document.querySelector("#newWord");
let $clickSound = document.querySelectorAll(".btn");

//Sonido para cada btn del juego 
$clickSound.forEach(e => {
    e.addEventListener('click', () => {
        let btnSound = new Audio('./sounds/latido.wav')
        btnSound.play();
    })
});


var $warning = document.querySelector(".advertencia")
var $mensaje = document.querySelector(".mensaje")
alerta = () => {
    $warning.className = "advertencia"
}
msg = () => {
    $mensaje.className = "advertencia"
}



// GUARDADO Y VALIDACION DE PALABRA NUEVA
let arrPalabrasSecretos = ["terror", "antorchas", "troll", "nocturno", "miedo", "oscuridad", "aldea", "granjeros"]

function validacion(texto) {
    let bandera = true;
    for (let i = 0; i < texto.length; i++) {
        var Unicode = texto.codePointAt(i)
        if (!(Unicode >= 97 && Unicode <= 122 && texto.length <= 10)) {
            bandera = false;
            break;
        }
    }

    if (bandera) {
        arrPalabrasSecretos.push(texto.toLowerCase());
        $warning.className = "advertencia visibilidad";
        inputAdd = document.querySelector(".inputAdd").className = "inputAdd visibilidad"
        btnAdd = document.querySelector("#save").className = "visibilidad";
        msg();
    } else {
        alerta();
    }
    
}

$btnSave.addEventListener('click', () => {
    intro.play();
    intr2.play();
    $btnSave.setAttribute('disabled', 'true');
    let contenedor = document.querySelector("#paginaInicial");
    let input = document.createElement("input");
    input.className = "inputAdd"
    input.placeholder = "max 10 letras"
    contenedor.appendChild(input)
    input.focus()

    let btn = document.createElement("button");
    btn.textContent = "AGREGAR"
    btn.id = "save"
    contenedor.appendChild(btn)

    let $Add = document.getElementById("save");
    $Add.addEventListener('click', () => {
        let valorInput = document.querySelector("input");
        validacion(valorInput.value)
    })

})


let palabraSecreta = '';
let arrPalabraSecreta;
let longuitudPalabra;
let almacenToCompletar = [];

elegir_palabra = () => {
    let index = Math.floor(Math.random() * arrPalabrasSecretos.length)
    palabraSecreta = arrPalabrasSecretos[index];
    arrPalabraSecreta = palabraSecreta.split('');
    longuitudPalabra = palabraSecreta.length;
    almacenToCompletar.length = longuitudPalabra;
    generar_guiones_y_espacios_de_letras(longuitudPalabra, arrPalabraSecreta)
}

/*GENERANDO ESCENARIO AUTOEJECUTABLE*/
function generar_guiones_y_espacios_de_letras(longuitudPalabra, arrPalabraSecreta) {
    console.log("=========================")
    console.log("=======BIENVENIDOS=======")
    console.log("=====JUEGO AHORCADO======")
    console.log("=========================")
    let $Box_guiones = document.querySelector('.box_espacios');
    let $Box_letras = document.querySelector('.box_letras');

    for (let i = 0; i < longuitudPalabra; i++) {
        let $guion = document.createElement('div')
        $guion.className = 'guiones'
        $Box_guiones.appendChild($guion)

        let $letterBox = document.createElement('div');
        $letterBox.className = 'box_letra'
        $letterBox.id = `${i.toString()}`

        let $p = document.createElement('p');
        $p.textContent = `${arrPalabraSecreta[i]}`;
        $p.className = 'texto_letra_inactiva'
        $letterBox.appendChild($p);
        $Box_letras.appendChild($letterBox)
    }

}


/*BTN DE INGRESAR LETRA*/
let $input = document.querySelector("#input");
let $busqueda = document.querySelector('#btn');
$busqueda.addEventListener("click", () => {
    $letra = $input.value;
    Main($letra, arrPalabraSecreta);
    $letra.value = '';
})


/*FUNCION PRINCIPAL*/
function Main(letra, arr) {
    verificar(letra, arr);
}


verificar = (input, arr) => {
    let arrIndex = [];
    let arrletras = [];

    if (!arr.includes(input)) {
        guardar_letras_erradas(input)
        let error = new Audio("./sounds/violindesafinado.wav")
        error.play()
    } else {
        arr.forEach((ArrLetra, index) => {
            if (input === ArrLetra) {
                arrIndex.push(index)
                arrletras.push(input)
            }
        });
    }
    guardar_letra_acertada(arrletras, arrIndex);
}


/*=============================================================*/
/*=================PASOS SI NO ACIERTO LETRA===================*/
/*=============================================================*/

guardar_letras_erradas = (input) => {
    let LetraIncorrecta = input;
    almacen_de_letras_erradas.push(LetraIncorrecta);
    mostar_letra_errada(LetraIncorrecta);
}


mostar_letra_errada = (letra_errada) => {
    let $box_errores = document.querySelector("#box_errores");
    let $box_letra_errada = document.createElement("div")
    $box_letra_errada.classList = "box_letra_errada"
    $box_letra_errada.textContent = `${letra_errada}`
    $box_errores.appendChild($box_letra_errada)
    mostrar_hangman()
};

var hang_man = ["muslo2,canilla2,pie2","pelvis,muslo1,canilla1,pie1","arma","hombro2,antebrazo2,mano2", "hombro1,antebrazo1,mano1","cuerpo","cabeza,mandibula,oreja1,oreja2","soga"]
mostrar_hangman = () => {
    if (hang_man.length != 0) {

        let mostrar = hang_man[0].split(",")
        for (let i = 0; i < mostrar.length; i++) {
            let $hang = document.getElementById(`${mostrar[i]}`).className ="error_activo";
        }
        hang_man.shift();

    }
    if (hang_man == 0) {
        alert("PERDISTE");

        setTimeout(() => {
            location.reload()
        }, 2000);
    }
}


/*=============================================================*/
/*===================PASOS SI  ACIERTO LETRA===================*/
/*=============================================================*/


guardar_letra_acertada = (arrletras, arrIndex) => {
    for (let i = 0; i < arrIndex.length; i++) {
        almacenToCompletar[arrIndex[i]] = arrletras[i];
    }
    mostar_letras_acertada(almacenToCompletar);
}


mostar_letras_acertada = (arr) => {
    let $box_letras = document.querySelectorAll('.box_letra')

    $box_letras.forEach((letraEscondida) => {
        arr.includes(letraEscondida.textContent) ?
            letraEscondida.firstElementChild.className = 'texto_letra_activa' : '';
    })
    chequear_victoria(arr)
}


chequear_victoria = (almacenToCompletar) => {
    const aCompletar = almacenToCompletar.join("");
    aCompletar === palabraSecreta ? ganaste() : "";
}

ganaste = () => {
    alert("FELICIDADES HEMOS VENCIDO AL REY TROL MI PUEBLO ESTA A SALVO")
    setTimeout(() => {
        location.reload()
    }, 2000);
}



/*=============================================================*/
/*=================PERSONAJE ANIMADO ELEGIDO===================*/
/*=============================================================*/


/*CANVAS*/
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const w = canvas.width = 1000;
const h = canvas.height = 80;
const frameWidthCharacter = 50;
const frameHightCharacter = 75;

/*Parametros characters*/
let xPos = 0;
let yPos = 0;
const fps = 60;
let frameIndex = 0;
const secondsToUpdate = .2 * fps;
const spriteSheet = new Image()
let count = 0;
let distancia = 730;

/*Estado del personaje*/
const State = {
    states: {
        0: {
            src: "/img/male.png",
            ejey: 0,
            static: "/img/staticmale.png",
            staticxy: 0
        },
        1: {
            src: "/img/male.png",
            ejey: 80,
            static: "/img/staticmale.png",
            staticxy: 72
        },
        2: {
            src: "/img/male.png",
            ejey: 160,
            static: "/img/staticmale.png",
            staticxy: 144
        },
        3: {
            src: "/img/female.png",
            ejey: 0,
            static: "/img/staticfemale.png",
            staticxy: 0
        },
        4: {
            src: "/img/female.png",
            ejey: 80,
            static: "/img/staticfemale.png",
            staticxy: 72
        },
        5: {
            src: "/img/female.png",
            ejey: 160,
            static: "/img/staticfemale.png",
            staticxy: 144
        }
    },
    getState: function (character) {
        if (this.states[character]) {
            return this.states[character];
        }
    }
}

/*bandera*/
let bandera = true;

function animate(state) {
    spriteSheet.src = state.src

    if (bandera) {
        context.drawImage(
            spriteSheet,
            frameIndex * frameWidthCharacter,
            state.ejey,
            frameWidthCharacter,
            frameHightCharacter,
            xPos,
            yPos,
            frameWidthCharacter,
            frameHightCharacter
        );
        count++;
        if (count > secondsToUpdate) {
            frameIndex++;
            xPos += 10;
            count = 0;
        }

        if (xPos == distancia) {
            bandera = false;
        }

        if (frameIndex > 2) {
            frameIndex = 0
        }
    }
}


charla = () => {
    let $cuadroDialogo = document.querySelector("#dialogo");
    $cuadroDialogo.className = "dialogo"
    var lista = ["Necesitamos tu ayuda!", "Nuesta aldea esta siendo destruida", "debemos vencer al rey Troll", "pero para ello necesitamos", "descubrir la palabra secreta", "nos ayudas?"];
    let p = document.createElement("p")
    p.className = "texto_dialogo"

    let contador = 0
    var ref;
    dialogo = (contador) => {
        p.textContent = lista[contador]
        $cuadroDialogo.appendChild(p);
    }

    var ref = setInterval(() => {
        if (contador < lista.length) {
            dialogo(contador)
            contador++;
        }
    }, 2000);

    setTimeout(() => {
        decision()
    }, 12400);

    if (contador == (lista.length) - 1) {
        clearInterval(ref)
    }
}



function frameStop(state) {
    spriteSheet.src = state.static
    context.drawImage(
        spriteSheet,
        0,
        state.staticxy,
        frameWidthCharacter,
        frameHightCharacter,
        xPos,
        yPos,
        frameWidthCharacter,
        frameHightCharacter
    );
}


/*ELEGIR AYUDAR*/
function decision() {
    mostrar = document.querySelector(".containerAyuda").className = "containerAyuda"
    let eleccion = document.querySelectorAll(".eleccion");
    eleccion.forEach(e => {

        e.addEventListener('click', () => {
            e.id == "si" ? habilitarSeccion() : location.reload();
        })
    })
}

function habilitarSeccion() {
    habilitar1 = document.querySelector(".container_letras_erradas").className = "container_letras_erradas";
    habilitar2 = document.querySelector(".container_input").className = "container_input";
    deshabilitar1 = document.querySelector(".containerAyuda").className = "containerAyuda visibilidad"
    deshabilitar2 = document.getElementById("canvas").className = "visibilidad"
    deshabilitar3 = document.getElementById("dialogo").className = "visibilidad"
}




function ejecucion() {
    intr2.play()
    if (bandera) {
        function frame() {
            context.clearRect(0, 0, w, h);
            animate(State.getState(personaje))
            requestAnimationFrame(ejecucion)
        }
        frame();
        sound.play()
    } else {
        sound.pause()
        console.log("animacion detenida");
        function frame2() {
            context.clearRect(0, 0, w, h);
            frameStop(State.getState(personaje))
            requestAnimationFrame(frame2)
        }
        frame2()
        charla()
    }
}





//iniciamos el juego
let $btnInicio = document.getElementById("start");
$btnInicio.addEventListener('click', () => {
    let paginaInicio = document.querySelector("#paginaInicial");
    let paginaJuego = document.querySelector("#paginaJuego");
    let containerPersonajes = document.getElementById("containerPersonajes");
    setTimeout(() => {
        paginaInicio.className = "visibilidad"
        containerPersonajes.className = "visibilidad"
        paginaJuego.className = ""
        elegir_palabra();
        ejecucion()
    }, 2000);
})