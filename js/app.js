//Constructores
function seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Prototyoes
seguro.prototype.cotizarSeguro = function(){
    /* 
        1 = "Americano" 1.15
        2 = "Asiatico" 1.05
        3 = "Europeo" 1.35
    */
   let cantidad;
   const base = 2000;
   switch(this.marca){
        case "1":
            cantidad = base * 1.15;
            break;
        case "2":
            cantidad = base * 1.05;
            break;
        case "3":
            cantidad = base * 1.35;
            break;
        default:
            break;
   }
   //Cada año anterior el valor del seguro se reducirá un  3%
   const diferencia = new Date().getFullYear() - this.year;
   cantidad = cantidad - ((diferencia * 3) * cantidad) / 100;
   if(this.tipo === "completo"){
       cantidad *= 1.30;
   }
   return cantidad;
}

function UI(){

}

//Prototypes
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 22;
    const selectYear = document.querySelector("#year");
    for(let i = max; i>=min; i--){
        const yearOption = document.createElement("option");
        yearOption.value = i;
        yearOption.innerText = i;
        selectYear.appendChild(yearOption);
    }   
}
UI.prototype.mostrarMensaje = function(mensaje, tipo){
    const div = document.createElement("div");
    if(tipo === "error" ){
        div.classList.add("error");
    }
    else{
        div.classList.add("correcto");
    }
    div.classList.add("mensaje", "mt-10");
    div.textContent = mensaje;  
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"));
    setTimeout( ()=>{
        div.remove();
    }, 5000)
    
}
UI.prototype.mostrarResultado = function(seguro, total){
    const div = document.createElement("div");
    div.classList.add("mt-10");
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Total: ${total} </p>
    `;
    const divResultado = document.querySelector("#resultado");
    divResultado.appendChild(div);
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";
}

const ui = new UI();

eventListeners();
document.addEventListener("DOMContentLoaded", () =>{
    ui.llenarOpciones();
});

function eventListeners(){
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguro); 
}
function cotizarSeguro(e){
    e.preventDefault();
    const marca = document.querySelector("#marca").value;
    const year = document.querySelector("#year").value;
    const tipo = document.querySelector("input[name='tipo']:checked").value;
    if(marca === "" || year === "" || tipo === "" ){
        ui.mostrarMensaje("Todos los campos son obligatorios", "error");
        return;
    }
    ui.mostrarMensaje("cotizando", "exito");
    const seguroAuto = new seguro(marca, year, tipo);
    const total = seguroAuto.cotizarSeguro();
    ui.mostrarResultado(seguroAuto, total);
       
}
