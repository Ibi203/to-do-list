addEventsToInputs();
changeTitleToInput();

function addEventsToInputs() {//maakt een functiw 
    var taskInput = document.getElementsByClassName("toDo__input");//pakt document  bij de class
    for (var i = 0; i < taskInput.length; i++) {//maakt een for loop
        taskInput[i].onkeyup = function (event) {//laat de funtie werken onclick
            newTask(event);//voet de event
        }
    }
}

function changeTitleToInput() {
    var headers = document.getElementsByClassName("toDo__header");//roept alles uit de class
    for (var i = 0; i < headers.length; i++) {
        headers[i].onclick = function (event) {//voeg een onclick toe
            var oldTitle = this.children[0].innerText;//slaat oude titelop
            this.children[0].remove();//verwijdert huidige titel
            var newInput = document.createElement("input");//maakt nieuwe input
            newInput.classList = "toDo__headerInput";//geeft nieuwe input een class
            newInput.value = oldTitle;//zet oude titel als waarde
            this.appendChild(newInput);//voegt nieuwe input elemt toe aan header
            newInput.focus();//zet de focus op newinput

            newInput.onkeyup = function (event) {//voegt een onkeyup event
                if (event.key === "Enter") {//zet de onkeyup op enter
                    var newTitle = event.target.value;//slaat titelop
                    var newHeading = document.createElement("h2");//maakt nieuwe h2
                    event.target.parentElement.appendChild(newHeading);//
                    newHeading.innerText = newTitle//zet de nieuwe titel in de h2
                    newHeading.classList = "toDo__heading"//geeft h2 een class
                    this.remove();//verwijdert input
                }

            }

        }
    }
}

function newTask(event) {
    if (event.key === "Enter") {//onkey up op enter instellen
        var tasks = event.target.parentElement.parentElement.children[1].children[0];//vind de ul
        var newTask = document.createElement("li")//maakt nieuwe li
        newTask.innerText = event.target.value;//zet de waarde in de nieuwe li
        newTask.classList = "toDo__task";//geeft een class
        newTask.dataset.running = "false";//zet de data atribut voor de taak
        tasks.appendChild(newTask);//voeg nieuwe taak toe
        event.target.value = "";//maak input leeg
        newTask.onclick = function (event) {//voeg onclick toe
            setOrClearTimer(event)//voer event setorcleartimer
        }
    }
}

var tasks = document.getElementsByClassName("toDo__task");
var timer = null;
for (var i = 0; i < tasks.length; i++) {
    tasks[i].onclick = function (event) {//voegt een onclick toe
        setOrClearTimer(event);
    }
}


function toDone(event) {
    timer = setTimeout(function () {//maakt een timeout
        var doneTask = document.createElement("li");//maakt een li
        doneTask.classList = "toDo__task toDo__task--done";//voeg een class toe
        doneTask.innerText = event.target.innerText;//kopeert de tekst
        document.getElementById("js--done").appendChild(doneTask);//voegt een item toe aan de lijst
        event.target.remove();//verwijdeert de taak
    }, 3000)//zet timer van 3 sec
}


function setOrClearTimer(event) {
    if (event.target.dataset.running === "false") {//controleert of timer uit staat
        event.target.classList.toggle("toDo__task--done")//veranderdt de stijl terug
        event.target.dataset.running = "true";//zet de status op true
        toDone(event);//roept to done event

    }
    else if (event.target.dataset.running === "true") {//contoleert of timer actief is
        event.target.classList.toggle("toDo__task--done")//verander de stijl
        clearTimeout(timer);//stopt timer
        event.target.dataset.running = "false";//zet de data weer op flase
    }
}

var fab = document.getElementById("js--fab");
fab.onclick = function () {
    makeNewCard();
}//roep make newcard

function makeNewCard() {
    // Make the card
    var newTodo = document.createElement("article");//makt nieuwe article
    newTodo.classList = "toDo";//voeg claas

    // Make the header
    var newHeader = document.createElement("header");//maakt nieuwe header
    newHeader.classList = "toDo__header";//voegt class toe

    // Make the heading
    var newHeading = document.createElement("h2");
    newHeading.classList = "toDo__heading";//voegt class toe
    newHeading.innerText = "Default";//zet inner text op default

    // Make the section
    var newSection = document.createElement("section");
    newSection.classList = "toDo__body";//voegt class toe

    // Make the UL
    var newList = document.createElement("ul");
    newList.classList = "toDo__tasks";//voegt class toe

    //  Make the footer
    var newFooter = document.createElement("footer");
    newList.classList = "ToDo__footer";//voegt class toe

    // Make the input
    var newInput = document.createElement("input");
    newInput.classList = "toDo__input";//voegt class toe
    newInput.type = "text";//zet input type op text
    newInput.placeholder = "Enter a task...";//maakt de placeholder
    newInput.id = "js--input";//geeft nieuwe id

    newFooter.appendChild(newInput); // Voegt het 'input' element toe aan de 'footer'
    newSection.appendChild(newList); // Voegt de 'ul' toe aan de 'section'
    newHeader.appendChild(newHeading); // Voegt de 'h2' toe aan de 'header'
    newTodo.appendChild(newHeader); // Voegt de 'header' toe aan de 'article'
    newTodo.appendChild(newSection); // Voegt de 'section' toe aan de 'article'
    newTodo.appendChild(newFooter); // Voegt de 'footer' toe aan de 'article'

    // Voegt de gehele nieuwe takenlijst toe aan het body-element van de pagina
    document.getElementsByTagName("body")[0].appendChild(newTodo);

    // Roept de functies aan om events toe te voegen aan de nieuwe input en header
    addEventsToInputs();
    changeTitleToInput();
}
