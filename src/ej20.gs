
// Donde esta la palabra mostrada en esta frase


class Ejercicio20:GLib.Object
	pregunta: Texto
	lista_palabras:list of string
	num:int=0
	pos_palabra:int=0
	imagen: Imagen
	entrada:Entrada
	finalizado:bool=false
		
	frase:string
	palabra_solucion:string
	frase_texto:Texto
	salir:Imagen
	continuar:Imagen
	corregir:Imagen
	init 
		lista_palabras= new list of string
	def inicio()
		cargar_escenario()
		finalizado=false
		
		// en frase_ordenada guardamos la solucion correcta para que sea comparada
		var numpal=100
		while numpal>8
			num=Random.int_range(0,tamano_de_lista(datos.todas_frases))
			frase=datos.todas_frases[num]
			lista_palabras= datos.divide_frase_en_palabras(frase)
			numpal=tamano_de_lista(lista_palabras)
		
		pos_palabra=Random.int_range(0,tamano_de_lista(lista_palabras))
		palabra_solucion=lista_palabras[pos_palabra]
		pregunta= new Texto (50,300, Mm(t.t("Adivina en que posición está la palabra: ") +palabra_solucion))
		pregunta.set_tamanotexto(20)
		pregunta.arrastrable=false
		
		entrada= new Entrada (500,400,100,50,"")
		//entrada.entrada.grab_key_focus()
		entrada.set_maximo_caracteres(3)
		
		frase_texto= new Texto (100,200,Mm(frase))
		frase_texto.arrastrable=false
		frase_texto.set_tamanotexto(20)
		frase_texto.visible=false
		
		imagen= new Imagen (350,50,directorio_datos+"/imagenes/play.png")
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
		
	def on_corregir(c:Control)
	
		if (pos_palabra+1).to_string()== entrada.get_texto()
			sonidos.play("ondo")
			datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+"---- Frase:"+frase+" ---- Palabra:"+palabra_solucion+" ---- Solución: "+(pos_palabra+1).to_string()+" ---- Respuesta:"+entrada.get_texto())
			
			frase_texto.visible=true
			finalizado=true
			c.visible=false
			continuar.visible=true
			corregir.visible=false
		else	
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+"---- Frase:"+frase+" ---- Palabra:"+palabra_solucion+" ---- Solución: "+(pos_palabra+1).to_string()+" ---- Respuesta:"+entrada.get_texto())
			
	def on_continuar()
		if finalizado
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
	
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/perpausak-"+datos.alumno_idioma+"/per"+(num+1).to_string()+".ogg")
	
	def cargar_escenario()
		controles.clear()
	
	
	
	



