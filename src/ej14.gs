

// Ordena las silabas para formar la palabra de la imagen. Con silabas sobrantes.

class Ejercicio14:GLib.Object
	silabas: list of Texto
	solucion: list of int

	imagen: Imagen
	palabra:string
	palabra_ordenada:string
	num:int=0
	x:int=420
	salir:Imagen
	corregir:Imagen
	iman:Rectangulo
	init 
		silabas= new list of Texto
		solucion= new list of int
	def inicio()
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		
		num= Random.int_range(0,tamano_de_lista(datos.alumno_palabras))
		var archivo = datos.todas_palabras.index_of(datos.alumno_palabras[num])
		
		// la imagen es el elemento de ayuda para que el alumno/a pueda ver que palabra tiene que rellenar.
		imagen= new Imagen (50,50,directorio_datos+"/fotos/"+tostring(4,archivo)+".png")
		imagen.arrastrable=false
		imagen.izq_pulsado.connect(on_imagen)
		imagen.valor_int=archivo
		imagen.valor_str=datos.alumno_palabras[num]
		
		// iman es el cuadrado donde se meterán las silabas
		iman= new Rectangulo (50,400,800,150)
		iman.set_colorfondo(amarillo)
		
		// en palabra_ordenada guardamos la solucion correcta para que sea comparada
		palabra=datos.alumno_palabras[num]
		var ls= palabra.split("_")
		var lista_silabas= convierte_array_en_lista(ls)
		var otra_lista_silabas= copia_lista_str(lista_silabas)
		for var i=0 to ultimo_de_lista(otra_lista_silabas) do otra_lista_silabas[i]= datos.crea_pseudopalabra_vocales(otra_lista_silabas[i])
		lista_silabas.insert_all(ultimo_de_lista(lista_silabas), otra_lista_silabas)
		desordena_lista_string(ref lista_silabas)
		palabra=palabra.replace("_","")
		palabra_ordenada=palabra
		solucion.clear()
		silabas.clear()
		
		var x=200
		
		for var i=0 to ultimo_de_lista (lista_silabas)
			var et=new Texto(x,255,Mm(lista_silabas[i]))
			silabas.add(et)
			silabas.last().set_tamanotexto(30)
			silabas.last().set_colorfondo(blanco)
			silabas.last().soltado.connect (on_soltar_letra)
			silabas.last().izq_pulsado.connect(on_tomar_letra)
			silabas.last().valor_str=lista_silabas[i]
			silabas.last().valor_int=i
			x+=silabas.last().get_ancho()+2
		
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(210,50,Mm(t.t("Selecciona las sílabas para formar la palabra.")))
		explicacion.set_tamanotexto(20)
		explicacion.set_colorletra(blanco)
		explicacion.set_fondovisible(false)
		explicacion.set_borde(false)
		explicacion.arrastrable=false
		
		///palabra_respuesta mandos
		
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
		var pos=15+iman.get_posx()
		for var i=0 to ultimo_de_lista(solucion)
			if silabas[solucion[i]].valor_bool
				silabas[solucion[i]].set_posx(pos)
				pos+=silabas[solucion[i]].get_ancho()+2

		
	def on_salir(c:Control)
		
		controles.clear()
		menu_principal.inicio()
		
	def on_corregir()
		var palabra_respuesta=""
		for var i=0 to ultimo_de_lista(solucion)
			palabra_respuesta+=silabas[solucion[i]].valor_str
			
		if palabra_respuesta != palabra_ordenada
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra_ordenada+" ---- Respuesta: "+palabra_respuesta)
			
		else
			sonidos.play("ondo")
			datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra_ordenada+" ---- Respuesta: "+palabra_respuesta)
			
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		
	
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,c.valor_int)+".ogg")
	
	
	def cargar_escenario()
		controles.clear()
	
	
	
	
