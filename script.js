const tarefas = document.querySelector('.tarefas');
const btnTarefas = document.querySelector('.btn-tarefas');
const inputTarefas = document.querySelector('.input-tarefas');

function createLi() {
    const li = document.createElement('li');
    return li;
};

function criaTarefa(textInput) {
    const li = createLi();
    li.innerHTML = textInput;
    tarefas.appendChild(li);
    criaBotaoApagar(li);
    limpaInput();
    salvarTarefas();
};

function criaBotaoApagar(li){
    const botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.innerText = 'Apagar tarefa';
    li.appendChild(botaoApagar);
};

function limpaInput(){
    inputTarefas.value = '';
    inputTarefas.focus();
};

btnTarefas.addEventListener('click', function () {
    if (!inputTarefas.value) return;
    criaTarefa(inputTarefas.value);
    
});

inputTarefas.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) { // Key 'Enter - code: 13
        if (!inputTarefas.value) return;
        criaTarefa(inputTarefas.value);
        
    };
});

document.addEventListener('click',function(e){
    const el = e.target;
    
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    };
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefasTexto = tarefa.firstChild.nodeValue.trim();; // Get only the text node (task text)
        listaDeTarefas.push(tarefasTexto); // put the texts inside the array
    };

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);

    console.log(listaDeTarefas);
};

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    };
};

adicionaTarefasSalvas();






