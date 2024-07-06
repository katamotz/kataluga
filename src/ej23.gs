
// Copia de frases

class Ejercicio23:GLib.Object
	lista_palabras:list of string
	num:int=0
	imagen: Imagen
	entrada:Entrada
	frase_solucion:string
	frase_texto:Texto_color
	frase_ayuda:Texto_color
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
			frase_solucion=datos.todas_frases[num]
			lista_palabras= datos.divide_frase_en_palabras(frase_solucion)
			numpal=tamano_de_lista(lista_palabras)
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,(t.t("Copia esta frase:")))
		explicacion.set_tamanotexto(20)
		explicacion.set_colorletra(blanco)
		explicacion.set_fondovisible(false)
		explicacion.arrastrable=false
		
		frase_ayuda= new Texto_color (50,200,frase_solucion)
		frase_ayuda.set_tamanotexto(30)
		frase_ayuda.arrastrable=false
		
		frase_texto= new Texto_color (50,300,"")
		frase_texto.set_tamanotexto(30)
		frase_texto.arrastrable=false
		frase_texto.visible=true
		
		entrada= new Entrada (50,400,900,50,"")
		entrada.set_ancho(900)
		entrada.set_maximo_caracteres(longitud(frase_solucion)+5)
		
		
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
		var frase_respuesta=entrada.get_texto()
		var texto_crudo=entrada.get_texto()
		if frase_respuesta!=""
			frase_texto.set_texto(entrada.get_texto())
			frase_texto.visible=true
		
			//Busca el punto y elimina todo lo que hay después de él
			var lugarpunto=busca_cadena(frase_respuesta,".")+1
			if lugarpunto>-1
				frase_respuesta=toma_cadena(frase_respuesta,0,lugarpunto)

			// convierte string en lista de letras
			var lista_usuario = datos.crea_lista_de_letras_desde_palabra(frase_respuesta)
			var lista_correcta = datos.crea_lista_de_letras_desde_palabra(frase_solucion)
			
			var cont=0
			var lista_fallos= new list of int
			lista_fallos.clear()
			while (cont<=ultimo_de_lista(lista_usuario)) and (cont<=ultimo_de_lista(lista_correcta))
				if lista_usuario[cont] != lista_correcta[cont]
					lista_fallos.add(cont)
					
					print "fallo"
				cont+=1
			print "fin fallos"
			var frasedelcorrector= new list of string
			frasedelcorrector.clear()
			if not lista_vacia(lista_fallos)  // si existe algo escrito
				for var i=0 to ultimo_de_lista(lista_fallos) // Marca en rojo los fallos
					var lugar=lista_fallos[i]
					frase_texto.lista_de_colores.add(lugar)
					if  lista_correcta[lugar] in "áéíóúüÁÉÍÓÚ"
						frasedelcorrector.add("esan3")
					if ((lista_correcta[lugar]).down() != lista_correcta[lugar]) and ((lista_correcta[lugar]).down() == lista_usuario[lugar])
						frasedelcorrector.add("esan2")
					if  lista_correcta[lugar] in ",:?¿!¡"
						frasedelcorrector.add("esan1")
					if  lista_correcta[lugar] in "hH"
						frasedelcorrector.add("esan0")  
				
				if longitud(frase_respuesta)>longitud(frase_solucion) // marca cuando se ha pasado de largura
					for var x=ultima(frase_respuesta) to ultima(frase_solucion) // marcar el resto de texto en rojo
						frase_texto.lista_de_colores.add(x)
				
				//frase_texto.repinta()
				// ahora emitimos sonidos para que entienda los fallos
				if not lista_vacia(frasedelcorrector)
					sonidos.habla_ayudas(frasedelcorrector)
				else
					sonidos.play("gaizki")
					datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+frase_solucion+" ---- Respuesta:"+frase_respuesta)
			
			else
				//print "no hay fallos"
				if longitud(texto_crudo)<longitud(frase_solucion) // no hay fallos pero no ha terminado.
					frasedelcorrector.add("esan4")
					sonidos.habla_ayudas(frasedelcorrector)
					pass
				else 
					//print "bien"
					if frase_respuesta==frase_solucion //Escrita correctamente
						sonidos.play("ondo")
						continuar.visible=true
						datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+frase_solucion+" ---- Respuesta:"+frase_respuesta)
						finalizado=true
						c.visible=false
			
		
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/perpausak-"+datos.alumno_idioma+"/per"+(num+1).to_string()+".ogg")
	
	
	def cargar_escenario()
		controles.clear()
	
	
	
