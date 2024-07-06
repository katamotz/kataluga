

// Elige el lugar de la letra en la palabra.

class Ejercicio15:GLib.Object
	palabras: list of Texto
	solucion: list of int
	lista_ordenada:list of string
	imagen: Imagen
	palabra:string
	palabra_ordenada:string
	numpal:int=0
	x:int=420
	mireloj : uint
	tiempo:int
	salir:Imagen
	corregir:Imagen
	iman:Rectangulo
	init 
		lista_ordenada= new list of string
		palabras= new list of Texto
		solucion= new list of int
		
	def inicio()
		tiempo=20
		// el numero de palabras puede variar, pero por el momento es 3 siempre, 0,1,2
		var npal=2
		numpal=npal
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		
		// iman es el cuadrado donde se meterán las palabras
		iman= new Rectangulo (500,100,300,400)
		iman.set_colorfondo(amarillo)
		
		// en palabra_ordenada guardamos la solucion correcta para que sea comparada
		var lista_palabras= datos.toma_palabras_alumno(npal)
		
		lista_ordenada= copia_lista_str(lista_palabras)
		desordena_lista_string(ref lista_palabras)
		solucion.clear()
		palabras.clear()
		
		var imagen= new Imagen(70,240,directorio_datos+"/imagenes/play.png")
		imagen.izq_pulsado.connect(on_imagen)
		imagen.arrastrable=false
		
		var y=150
		for var i=0 to ultimo_de_lista (lista_palabras)
			var et=new Texto(200,y,Mm(lista_palabras[i].replace("_","")))
			palabras.add(et)
			palabras.last().set_colorfondo(blanco)
			palabras.last().set_colorletra(transparente)
			palabras.last().set_tamanotexto(30)
			palabras.last().soltado.connect (on_soltar_letra)
			palabras.last().izq_pulsado.connect(on_tomar_letra)
			palabras.last().valor_str=lista_palabras[i]
			palabras.last().valor_int=i
			y+=palabras.last().get_alto()+2
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Escucha la secuencia de palabras y colocalas en orden.")))
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
		
		mireloj = Timeout.add(2000, timer)
		
		
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
		var pos=50+iman.get_posy()
		for var i=0 to ultimo_de_lista(solucion)
			if palabras[solucion[i]].valor_bool
				palabras[solucion[i]].set_posy(pos)
				palabras[solucion[i]].set_posx(iman.get_posx()+20)
				pos+=palabras[solucion[i]].get_alto()+2

		
	def on_salir(c:Control)
		Source.remove (mireloj)
		
		controles.clear()
		menu_principal.inicio()
		
	def on_corregir()
		var ondo=true
		for var i=0 to ultimo_de_lista(solucion)
			if lista_ordenada[i]!=palabras[solucion[i]].valor_str
				ondo=false
		if tamano_de_lista(solucion)<tamano_de_lista(lista_ordenada) do ondo=false
		if not ondo 
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- No ordenó correctamente la lista de palabras.")
			
		else
			sonidos.play("ondo")
			datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- La lista de palabras fue ordenada correctamente.")	
			Source.remove (mireloj)
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
				
	def timer():bool
		if tiempo<=ultimo_de_lista(lista_ordenada)
			sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,datos.transforma_archivo_int(lista_ordenada[tiempo]))+".ogg")
		else
			for var i=0 to ultimo_de_lista(palabras) do palabras[i].set_colorletra(negro)
		tiempo+=1
		
		return true
		
	def on_imagen(c:Control)
		for var i=0 to ultimo_de_lista(palabras) do palabras[i].set_colorletra(transparente)
		tiempo=0
		
	def cargar_escenario()
		controles.clear()
	
