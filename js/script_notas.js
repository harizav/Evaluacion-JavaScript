		var jsonText = '{"estudiantes":['+
			'{"codigo":"001","nombre":"Rocio","Nota": 9},'+
			'{"codigo":"002","nombre":"Mario","Nota": 8},'+
			'{"codigo":"003","nombre":"Rafael","Nota": 5},'+
			'{"codigo":"004","nombre":"Humberto","Nota": 6},'+
			'{"codigo":"005","nombre":"Carlos","Nota": 7},'+
			'{"codigo":"006","nombre":"Pedro","Nota": 2},'+
			'{"codigo":"007","nombre":"Leonardo","Nota": 1},'+
			'{"codigo":"008","nombre":"Santiago","Nota": 10},'+
			'{"codigo":"009","nombre":"Camilo","Nota": 3},'+
			'{"codigo":"010","nombre":"Hugo","Nota": 1}'+']}'; 
			
		var jsObj = JSON.parse(jsonText);
		
		function evento_Mostrar() {
			//alert("entre");
			    leerJson(jsObj);
		}
		
		function leerJson(json) {
			limpiarTabla();
			var i;
            
			for (i=0; i<json.estudiantes.length;i++) {

				var inicio = document.createElement("tr");
				document.getElementById("tabla").appendChild(inicio);

				var codigo = document.createElement("td");
				var str = parseInt(json.estudiantes[i].codigo);
			

				var codigoTxt = document.createTextNode(json.estudiantes[i].codigo);
				codigo.appendChild(codigoTxt);
				inicio.appendChild(codigo);

				var nombre = document.createElement("td");
				var ucasenombre = json.estudiantes[i].nombre;
				var nombreTxt = document.createTextNode(ucasenombre.toUpperCase());
				nombre.appendChild(nombreTxt);
				inicio.appendChild(nombre);


				var nota = document.createElement("td");
				var notaTxt = document.createTextNode(json.estudiantes[i].Nota);
				nota.appendChild(notaTxt);
				inicio.appendChild(nota);
			}
		}

		
		function evento_Npromedio() {
		        PromedioJson(jsObj);
		}
		
		function PromedioJson(json) {
			var i;
			var snotas=0;
			var Promedio;
			
			for (i=0;i<json.estudiantes.length;i++) {
				snotas += json.estudiantes[i].Nota;
			}
		    Promedio = snotas/(json.estudiantes.length);
			alert("Promedio del Curso es: " + Promedio.toLocaleString('de-DE'))
		}

		function evento_Nmayor() {
		        Nmayor(jsObj);
		}
		
		function Nmayor(json) {
			var i;
			var varNota = "";
			var varCode = "";
    		var varNombre = "";
			
			for (i=0;i<json.estudiantes.length;i++) {
			     if (i==0){
			          varNota = json.estudiantes[i].Nota;				   
				 }
			    if ( (parseInt(varNota)) < json.estudiantes[i].Nota) {
			          varNota = json.estudiantes[i].Nota;
					  varCode = json.estudiantes[i].codigo;
					  varNombre = json.estudiantes[i].nombre;
			    }
			}
			alert("La Nota Mayor es del estudiante: \nCódigo Estudiante: " + varCode + "\nEstudiante: " + varNombre + "\nNota: " + varNota )
		}
		
		function evento_Nmenor() {
		        Nmenor(jsObj);
		}
		
		function Nmenor(json) {
			var i;
			var varNota = "";
			var varCode = "";
    		var varNombre = "";
			
			for (i=0;i<json.estudiantes.length;i++) {
			    if (i==0){
			          varNota = json.estudiantes[i].Nota;				
				}
			    if ( (parseInt(varNota)) > json.estudiantes[i].Nota) {
			          varNota = json.estudiantes[i].Nota;
					  varCode = json.estudiantes[i].codigo;
					  varNombre = json.estudiantes[i].nombre;
					  
			    }
			}
			alert("La Nota menor es del estudiante: \nCódigo Estudiante: " + varCode + "\nEstudiante: " + varNombre + "\nNota: " + varNota )
		}
	     
		function evento_Registrar(){
		    var json = jsObj;
			var codigoInput = document.getElementById("estcod").value;
			var nombreInput = document.getElementById("estnom").value;
			var notaInput = document.getElementById("estnot").value;

		 // relleno();

			var int_codigo = codigoInput;
			var str_nombre = parseInt(nombreInput);
			var int_nota = parseInt(notaInput);

			var cod_val = true;
			var not_val = true;
			var nom_val = true;


			if (int_codigo >= 0 && int_codigo <= 99999 && int_codigo != "") {

		   for (var wi = 0; wi <= json.estudiantes.length - 1; wi++){
			  var a = json.estudiantes[wi].codigo;
				if (int_codigo == a){
				  alert("El codigo no se puede repetir.");
				  cod_val = false;
				}else {
				  cod_val = true;
				}
			}
			}else {
				alert("Codigo no puede ser menor a 0 o mayor a 99999, tampoco contener letras ni quedar vacio.");
				cod_val = false;
			}

			if([str_nombre >= 0 || str_nombre <= 0] && nombreInput == ""){
				alert("Nombre invalido, compruebe si contiene numero o si se encuentra vacio.");
				cod_val = false;
			}else {
				nom_val = true;
			}

			if(int_nota >= 1 && int_nota <= 10 && int_nota != ""){
				not_val = true;
			}else {
				alert("Nota no puede ser menor a 1 ni mayor a 10, tampoco contener letras ni quedar vacio.");
				not_val = false;
			}

			if(cod_val == true & nom_val == true && not_val == true){
				llenarJson();
				limpiarTabla();
				evento_Mostrar();
			}
		}


		//Funcion para vaciar la tabla-------------------------------------
		function limpiarTabla(){
			var tabla = document.getElementById("tabla");

			for (var i = 2; i<12; i++){
				var hijo = document.getElementById("tabla").lastChild;
				if (hijo.nodeName == "TR"){
					tabla.removeChild(hijo);
				}
			}
		}
		//---------------------------------------------------------------

		//Funcion para cargarle datos al JSON------------------------------
		function llenarJson(){
			var json = jsObj;
			var nombreInput = document.getElementById("estnom");
			var codigoInput = document.getElementById("estcod");
			var notaInput = document.getElementById("estnot");

			json.estudiantes.push({codigo: codigoInput.value, nombre: nombreInput.value, Nota: parseFloat(notaInput.value)});
			document.getElementById("estnom").value = "";
			document.getElementById("estcod").value = "";
			document.getElementById("estnot").value = "";}
		//---------------------------------------------------------------

//-------------------------------------------------------------
//Agregando EVENTO ONLOAD con EVENTLISTENER al BODY----------------
document.getElementsByTagName("body")[0].addEventListener("load", evento_Mostrar());
///////////////////////////////////////////////////////////////////

//Agregando EVENTO CLICK con EVENTLISTENER al boton de REGRISTRAR---
document.getElementById("btnRegistrar").addEventListener("click", evento_Registrar);
////////////////////////////////////////////////////////////////////

//Agregando EVENTO CLICK con EVENTLISTENER al boton del Menor------
document.getElementById("btn_menor").addEventListener("click", evento_Nmenor);
///////////////////////////////////////////////////////////////////

//Agregando EVENTO CLICK con EVENTLISTENER al boton del Mayor------
document.getElementById("btn_mayor").addEventListener("click", evento_Nmayor);
///////////////////////////////////////////////////////////////////

//Agregando EVENTO CLICK con EVENTLISTENER al boton del Promedio---
document.getElementById("btn_promedio").addEventListener("click", evento_Npromedio);
///////////////////////////////////////////////////////////////////