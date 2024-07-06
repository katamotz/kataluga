

// Cuantas palabras tiene una frase.

class Ejercicio21:GLib.Object
	pregunta: Texto
	lista_palabras:list of string
	num:int=0
	imagen: Imagen
	entrada:Entrada
	frase:string
	frase_texto:Texto
	finalizado:bool=false
	salir:Imagen
	continuar:Imagen
	corregir:Imagen
	init 
		lista_palabras= new list of string
	def inicio()
		finalizado=false
		cargar_escenario()
		
		// en frase_ordenada guardamos la solucion correcta para que sea comparada
		var numpal=100
		while numpal>5
			num=Random.int_range(0,tamano_de_lista(datos.todas_frases))
			frase=datos.todas_frases[num]
			lista_palabras= datos.divide_frase_en_palabras(frase)
			numpal=tamano_de_lista(lista_palabras)
		
		
		pregunta= new Texto (300,300,Mm(t.t("Cuenta las palabras: ")))
		pregunta.set_tamanotexto(30)
		pregunta.arrastrable=false
		
		entrada= new Entrada (500,400,100,50,"")
		//entrada.entrada.grab_key_focus()
		entrada.set_maximo_caracteres(3)
		
		frase_texto= new Texto (100,200,Mm(frase))
		frase_texto.arrastrable=false
		frase_texto.set_tamanotexto(20)
		frase_texto.visible=false
		
		imagen= new Imagen (500,50,directorio_datos+"/imagenes/play.png")
		imagen.arrastrable=false
		imagen.izq_pulsado.connect(on_imagen)
		
			
		///creando mandos
		
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
		corregir=new Imagen(920,100,directorio_datos+"/imagenes/corregir.png")
		corregir.set_tamano(50,50)
		corregir.arrastrable=false
		corregir.izq_pulsado.connect(on_corregir)
		
		continuar=new Imagen(920,170,directorio_datos+"/imagenes/flecha_der.png")
		continuar.set_tamano(50,50)
		continuar.arrastrable=false
		continuar.izq_pulsado.connect(on_continuar)
		continuar.visible=false
		
	def on_salir(c:Control)
		
		controles.clear()
		menu_principal.inicio()
	
	def on_continuar(c:Control)
		if finalizado
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
				
	def on_corregir(c:Control)
		if tamano_de_lista(lista_palabras).to_string()== entrada.get_texto()
			sonidos.play("ondo")
			datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+"---- Frase:"+frase+" ---- Solución: "+tamano_de_lista(lista_palabras).to_string()+" ---- Respuesta:"+entrada.get_texto())
			continuar.visible=true
			corregir.visible=false
			frase_texto.visible=true
			finalizado=true
			c.visible=false
		else
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+"---- Frase:"+frase+" ---- Solución: "+tamano_de_lista(lista_palabras).to_string()+" ---- Respuesta:"+entrada.get_texto())
			
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/perpausak-"+datos.alumno_idioma+"/per"+(num+1).to_string()+".ogg")
	
	
	def cargar_escenario()
		controles.clear()
	
	
	
	
