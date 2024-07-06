

// Ordena las letras para formar la palabra de la imagen

class Ejercicio1:GLib.Object
	letras: list of Texto
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
		letras= new list of Texto
		solucion= new list of int
	def inicio()
		cargar_escenario()
		
		num= Random.int_range(0,tamano_de_lista(datos.alumno_palabras))
		var archivo = datos.todas_palabras.index_of(datos.alumno_palabras[num])
		
		imagen= new Imagen (50,50,directorio_datos+"/fotos/"+tostring(4,archivo)+".png")
		imagen.arrastrable=false
		imagen.izq_pulsado.connect(on_imagen)
		imagen.valor_int=archivo
		imagen.valor_str=datos.alumno_palabras[num]
		
		iman= new Rectangulo (50,400,800,150)
		
		// en palabra_ordenada guardamos la solucion correcta para que sea comparada
		palabra=datos.alumno_palabras[num].replace("_","")
		palabra_ordenada=palabra
		palabra=desordena_string(palabra)
		solucion.clear()
		letras.clear()
		
		var x=100
		for var i=0 to (ultima(palabra))
			var et=new Texto(x,255,Mm(toma_cadena(palabra,i,i+1)))
			letras.add(et)
			letras.last().soltado.connect (on_soltar_letra)
			letras.last().izq_pulsado.connect(on_tomar_letra)
			letras.last().valor_str=toma_cadena(palabra,i,i+1)
			letras.last().valor_int=i
			letras.last().set_tamanotexto(40)
			x+=letras.last().get_ancho()+2
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(210,50,Mm(t.t("Elige las letras para formar la palabra:")))
		explicacion.set_tamanotexto(20)
		explicacion.set_fondovisible(false)
		explicacion.set_colorletra(blanco)
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
		sonidos.play("archivo",directorio_datos+"/sonidos/fonemak-"+datos.alumno_idioma+"/"+c.valor_str+".ogg")
		c.valor_bool=false
		if solucion.contains(c.valor_int)
			solucion.remove_at(solucion.index_of(c.valor_int))
		
		organiza_iman()
		
	def organiza_iman()
		var pos=15+iman.get_posx()
		for var i=0 to ultimo_de_lista(solucion)
			if letras[solucion[i]].valor_bool
				letras[solucion[i]].set_posx(pos)
				pos+=letras[solucion[i]].get_ancho()+2

		
	def on_salir(c:Control)
		menu_principal.inicio()
		
	def on_corregir()
		var error=false
		var palabra_respuesta=""
		for var i=0 to ultimo_de_lista(solucion)
			palabra_respuesta+=letras[solucion[i]].valor_str
			if letras[solucion[i]].valor_str != toma_letra(palabra_ordenada,i)
				error=true
			
		if (error) or (ultima(palabra_ordenada)!=ultimo_de_lista(solucion))
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra_ordenada+" ---- Respuesta: "+palabra_respuesta)
		else
			sonidos.play("ondo")
			datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra_ordenada+" ---- Respuesta: "+palabra_respuesta)
			
			if not automatico
				this.inicio()
			else
				continuando()
	
	def on_imagen(c:Control)
		//print "dimelo"
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,c.valor_int)+".ogg")
	
	
	def cargar_escenario()
		controles.clear()
		pass
	
	
	
	
