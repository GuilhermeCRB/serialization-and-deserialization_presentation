const objectJS = {
    cliente: {
        id: 2020,
        nome: "Maria Aparecida"
    },
    pagamentos: [
        {
            id: 123,
            descricao: "Compra do livro Cangaceiro JavaScript",
            valor: 50.5
        },
        {
            id: 124,
            descricao: "Mensalidade escolar",
            valor: 1500
        }
    ]
};

function objToString(obj, ndeep) {
    if(obj == null){ return String(obj); }
    switch(typeof obj){
      case "string": return '"'+obj+'"';
      case "function": return obj.name || obj.toString();
      case "object":
        var indent = Array(ndeep||1).join('\t'), isArray = Array.isArray(obj);
        return '{['[+isArray] + Object.keys(obj).map(function(key){
             return '\n\t' + indent + key + ': ' + objToString(obj[key], (ndeep||1)+1);
           }).join(',') + '\n' + indent + '}]'[+isArray];
      default: return obj.toString();
    }
}
  

function printObject(){
    let objDiv = document.querySelector(".object_js");
    objDiv.innerHTML = `<pre>${objToString(objectJS)}</pre>`;
};

async function serializeXML(){
    try{
        const objXML = await axios.post("http://localhost:5000/xml-stringify", objectJS);
        console.log(objXML.data)

        let resultDiv = document.querySelector(".result p");
        resultDiv.innerHTML = `<pre>${objXML.data.replaceAll("<","&lt").replaceAll(">","&gt")}</pre>`;
    }catch(e){
        console.log(e);
    }
}

async function deserializeXML(){
    const obj = document.querySelector(".result p").innerHTML;
    const xmlString = obj.replace("<pre>", "").replace("</pre>","").replaceAll("&lt","<").replaceAll("&gt",">").replaceAll(";", "");
    const objXML = new DOMParser().parseFromString(xmlString, "text/xml");
    console.log(objXML)

    try{
        const objectJS = await axios.post("http://localhost:5000/xml-parser", {obj: objXML});

        let resultDiv = document.querySelector(".result p");
        resultDiv.innerHTML = `<pre>${objToString(objectJS.data)}</pre>`;
    }catch(e){
        console.log(e);
    }
}

async function serializeJSON(){
    try{
        const objJSON = await axios.post("http://localhost:5000/json-stringify", objectJS);

        let resultDiv = document.querySelector(".result p");
        resultDiv.innerHTML = `<pre>${objJSON.data.obj}</pre>`;
    }catch(e){
        console.log(e);
    }
}

async function deserializeJSON(){
    const obj = document.querySelector(".result p").innerHTML;
    objJSON = obj.replace("<pre>", "").replace("</pre>","");

    try{
        const objectJS = await axios.post("http://localhost:5000/json-parser", {obj: objJSON});

        let resultDiv = document.querySelector(".result p");
        resultDiv.innerHTML = `<pre>${objToString(objectJS.data)}</pre>`;
    }catch(e){
        console.log(e);
    }
}


async function serializeYAML(){
    try{
        const objYAML = await axios.post("http://localhost:5000/yaml-stringify", objectJS);

        let resultDiv = document.querySelector(".result p");
        console.log(objYAML.data)
        resultDiv.innerHTML = `<pre>${objYAML.data}</pre>`;
    }catch(e){
        console.log(e);
    }
}

async function deserializeYAML(){
    const obj = document.querySelector(".result p").innerHTML;
    objYAML = obj.replace("<pre>", "").replace("</pre>","");

    try{
        const objectJS = await axios.post("http://localhost:5000/yaml-parser", {obj: objYAML});

        let resultDiv = document.querySelector(".result p");
        console.log(objectJS.data)
        resultDiv.innerHTML = `<pre>${objToString(objectJS.data)}</pre>`;
    }catch(e){
        console.log(e);
    }
}

printObject();