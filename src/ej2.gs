


// Elige el lugar de la letra en la palabra

class Ejercicio2:GLib.Object
	letras: list of Texto
	letra_texto: Texto
	solucion: string
	solucion_int: int
	imagen: Imagen
	palabra:string
	letra_ejercicio:string
	finalizado:bool=false
	num:int=0
	x:int=420
	salir:Imagen
	corregir:Imagen
	continuar:Imagen
	iman:Rectangulo
	init 
		letras= new list of Texto
	def inicio()
		cargar_escenario()
		finalizado=false
		num= Random.int_range(0,tamano_de_lista(datos.alumno_palabras))
		var archivo = datos.todas_palabras.index_of(datos.alumno_palabras[num])
		
		imagen= new Imagen (50,50,directorio_datos+"/fotos/"+tostring(4,archivo)+".png")
		imagen.arrastrable=false
		imagen.izq_pulsado.connect(on_imagen)
		imagen.valor_int=archivo
		imagen.valor_str=datos.alumno_palabras[num]
		
		palabra=datos.alumno_palabras[num].replace("_","")
		var listaletras= datos.crea_lista_de_letras_desde_palabra(palabra)
		letra_ejercicio= datos.elegir_elemento_de_lista(listaletras)
		
		letra_texto= new Texto (280,110,Mm(letra_ejercicio))
		letra_texto.arrastrable=false
		
		letras.clear()
		var x=100
		
		for var i=0 to (ultima(palabra))
			var et=new Texto(x,255,Mm(toma_cadena(palabra,i,i+1)))
			letras.add(et)
			letras.last().arrastrable=false
			letras.last().set_colorfondo(blanco)
			letras.last().set_colorletra(blanco)
			letras.last().izq_pulsado.connect(on_tomar_letra)
			letras.last().valor_str="letra"
			letras.last().valor_int=i
			x+=letras.last().get_ancho()+4
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(210,50,Mm(t.t("Elige el lugar de la letra en esta palabra:")))
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
		
		continuar=new Imagen(920,170,directorio_datos+"/imagenes/flecha_der.png")
		continuar.set_tamano(50,50)
		continuar.arrastrable=false
		continuar.izq_pulsado.connect(on_continuar)
		continuar.visible=false
	
	def on_tomar_letra(c:Control)
		if not (finalizado) and (c.valor_str=="letra")
			for var i=0 to ultimo_de_lista(letras)
				letras[i].set_colorfondo(blanco)
				letras[i].set_colorletra(blanco)
			c.set_colorfondo(negro)
			c.set_colorletra(negro)
			solucion=c.get_texto()
			solucion_int=c.valor_int
		
	def on_salir(c:Control)
		
		controles.clear()
		menu_principal.inicio()

	def on_continuar()
		if finalizado
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		
	def on_corregir()
		if not finalizado
			finalizado=true
			corregir.visible=false
			continuar.visible=true
			if letra_ejercicio.up()!= solucion.up()
				sonidos.play("gaizki")
				datos.guardar_informe ("Mal"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Palabra: "+palabra+" ---- Solución: "+letra_ejercicio+" ---- Respuesta: "+solucion)
				for var i=0 to ultimo_de_lista(letras)
					if letras[i].get_texto()==letra_ejercicio
						letras[i].set_colorfondo(amarillo)
						letras[i].set_colorletra(azul)
					else
						letras[i].set_colorfondo(blanco)
						letras[i].set_colorletra(azul)
				letras[solucion_int].set_colorfondo(rojo)
			else
				for var i=0 to ultimo_de_lista(letras)
					letras[i].set_colorfondo(blanco)
					letras[i].set_colorletra(azul)
				letras[solucion_int].set_colorfondo(amarillo)
				sonidos.play("ondo")
				datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Palabra: "+palabra+" ---- Solución: "+letra_ejercicio+" ---- Respuesta: "+solucion)
				
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,c.valor_int)+".ogg")
	
	
	def cargar_escenario()
		controles.clear()
	
	
	
	
