

// Ordena las palabras para formar la frase que se escucha. Frases cortas.

class Ejercicio17:GLib.Object
	palabras: list of Texto
	solucion: list of int
	lista_palabras:list of string
	imagen: Imagen
	frase_solucion:string
	lista_ordenada:list of string
	num:int=0
	x:int=420
	salir:Imagen
	corregir:Imagen
	iman:Rectangulo
	init 
		palabras= new list of Texto
		solucion= new list of int
		lista_palabras= new list of string
		lista_ordenada= new list of string
		
	def inicio()
		cargar_escenario()
		
		iman= new Rectangulo (20,400,800,150)
		iman.set_colorfondo(amarillo)
		
		// en frase_ordenada guardamos la solucion correcta para que sea comparada
		var numpal=100
		while numpal>5
			num=Random.int_range(0,tamano_de_lista(datos.todas_frases))
			//print num.to_string()
			frase_solucion=datos.todas_frases[num]
			lista_palabras= datos.divide_frase_en_palabras(frase_solucion)
			numpal=tamano_de_lista(lista_palabras)
			 
		lista_ordenada= datos.divide_frase_en_palabras(frase_solucion)
		desordena_lista_string (ref lista_palabras)
		solucion.clear()
		palabras.clear()
		
		
		imagen= new Imagen (500,50,directorio_datos+"/imagenes/play.png")
		imagen.arrastrable=false
		imagen.izq_pulsado.connect(on_imagen)
		
		var x=50
		var y=250
		for var i=0 to (ultimo_de_lista(lista_palabras))
			palabras.add(new Texto(x,y,Mm(lista_palabras[i] )))
			palabras.last().set_colorfondo(blanco)
			palabras.last().set_tamanotexto(20)
			palabras.last().soltado.connect (on_soltar_letra)
			palabras.last().izq_pulsado.connect(on_tomar_letra)
			palabras.last().valor_str=lista_palabras[i]
			palabras.last().valor_int=i
			x+=palabras.last().get_ancho()+2
			if x>800 
				y+=60
				x=200
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Ordena las palabras de esta frase.")))
		explicacion.set_tamanotexto(20)
		explicacion.set_colorletra(blanco)
		explicacion.set_fondovisible(false)
		explicacion.arrastrable=false
		
		///creando mandos
		
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
		corregir=new Imagen(920,100,directorio_datos+"/imagenes/corregir.png")
		corregir.set_tamano(50,50)
		corregir.arrastrable=false
		corregir.izq_pulsado.connect(on_corregir)
		
	def on_soltar_letra(c:Control)
		if colision_cuadrada(iman,c)
			c.valor_bool=true
			solucion.add(c.valor_int)
			c.set_posy((iman.get_posy()+iman.get_alto()/2)-(c.get_alto()/2))
		else
			c.valor_bool=false
			if solucion.contains(c.valor_int)
				solucion.remove_at(solucion.index_of(c.valor_int))
				
		organiza_iman()
		
	def on_tomar_letra(c:Control)
		sonidos.play("clik")
		c.valor_bool=false
		if solucion.contains(c.valor_int)
			solucion.remove_at(solucion.index_of(c.valor_int))
		
		organiza_iman()
		
	def organiza_iman()
		var posx=15+iman.get_posx()
		var posy=30+iman.get_posy()
		for var i=0 to ultimo_de_lista(solucion)
			if palabras[solucion[i]].valor_bool
				palabras[solucion[i]].set_posx(posx)
				palabras[solucion[i]].set_posy(posy)
				if posx> (500+iman.get_posx())
					posx=15+iman.get_posx()
					posy+=60
				else
					posx+=palabras[solucion[i]].get_ancho()+2
					
				
		
	def on_salir(c:Control)
		
		controles.clear()
		menu_principal.inicio()
		
	def on_corregir()
		if not lista_vacia (solucion)
			var error=false
			var frase_respuesta=""
			for var i=0 to ultimo_de_lista(solucion)
				frase_respuesta+= palabras[solucion[i]].valor_str+" "
				if palabras[solucion[i]].valor_str != lista_ordenada[i]
					error=true
				
			if (error) or (ultimo_de_lista(palabras)!=ultimo_de_lista(solucion))
				sonidos.play("gaizki")
				datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+frase_solucion+" ---- Respuesta:"+frase_respuesta)
			else
				sonidos.play("ondo")
				datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+frase_solucion+" ---- Respuesta:"+frase_respuesta)
				
				controles.clear()
				if not automatico
					this.inicio()
				else
					continuando()
		
	
	def on_imagen(c:Control)
		if lista_vacia (solucion)
			print "sonido:"+directorio_datos+"/sonidos/perpausak-"+datos.alumno_idioma+"/per"+(num+1).to_string()+".ogg"
			sonidos.play("archivo",directorio_datos+"/sonidos/perpausak-"+datos.alumno_idioma+"/per"+(num+1).to_string()+".ogg")
	
	
	def cargar_escenario()
		controles.clear()
	
	
	
	
