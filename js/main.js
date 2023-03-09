//esto es loprimero que se ejecuta (declaraciond de variables que guardan elementos html)
const keywordsKey = "keywords";
let keyWordInput = document.getElementById("name");
let btnAddKeyWord = document.getElementById("btn_add_key_word");
let uiKeyWordList = document.getElementById("key_word_list");

// declaro una funcion que lo que hace es anexar al <ul> de la pantalla un <li> con el valor
// que recibe como parametro
var appendLItoUIList = (keyword) => {

    const uiNewListItem = document.createElement("li");

    uiNewListItem.innerText = keyword

    uiKeyWordList.appendChild(uiNewListItem);
}

// aca declaro otra funcion que lo que hace es
// recibe como parametro una lista
var serializeAndSave = (keyWords) => {
    let serialized = JSON.stringify(keyWords);
    localStorage.setItem(keywordsKey, serialized)
}

var readAndParse = () => {
    let serialized = localStorage.getItem(keywordsKey) ?? "[]"
    return JSON.parse(serialized)
}


var storedKeywords = readAndParse();
storedKeywords.forEach(element => appendLItoUIList(element));

// Este es el evento click del boton
btnAddKeyWord.onclick = () => {
    let keyword = keyWordInput.value

    if (!keyword) {
        alert("escribi algo antes de apretar, gil");
        return;
    }

    appendLItoUIList(keyword);
    
    keyWordInput.value = ""
    
    storedKeywords.push(keyword)

    serializeAndSave(storedKeywords)
} 