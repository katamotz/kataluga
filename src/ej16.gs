


// Elige el lugar de la silaba

class Ejercicio16:GLib.Object
	silabas: list of Texto
	silaba_texto: Texto
	silaba_respuesta: string
	respuesta_int: int
	imagen: Imagen
	palabra:string
	silaba_solucion:string
	finalizado:bool=false
	num:int=0
	x:int=420
	salir:Imagen
	corregir:Imagen
	continuar:Imagen
	iman:Rectangulo
	init 
		silabas= new list of Texto
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
		
		palabra=datos.alumno_palabras[num]
		var listasilabas= datos.divide_palabra_en_silabas(palabra)
		silaba_solucion= datos.elegir_elemento_de_lista(listasilabas)
		palabra=palabra.replace("_","")
	
		silaba_texto= new Texto (700,100,Mm(silaba_solucion))
		silaba_texto.arrastrable=false
		
		silabas.clear()
		var x=350
		
		for var i=0 to (ultimo_de_lista(listasilabas))
			silabas.add(new Texto(x,255,Mm("m")))
			silabas.last().arrastrable=false
			silabas.last().set_colorfondo(blanco)
			silabas.last().set_colorletra(blanco)
			silabas.last().izq_pulsado.connect(on_tomar_silaba)
			silabas.last().valor_int=i
			silabas.last().valor_str="silaba"
			silabas.last().valor_str2=listasilabas[i]
			x+=silabas.last().get_ancho()+5
		
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(210,50,Mm(t.t("Pulsa la casilla donde se encuentra ésta sílaba:")))
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
		
	def on_tomar_silaba(c:Control)
		if not (finalizado) and (c.valor_str=="silaba")
			for var i=0 to ultimo_de_lista(silabas)
				silabas[i].set_colorfondo(blanco)
				silabas[i].set_colorletra(blanco)
			c.set_colorfondo(negro)
			c.set_colorletra(negro)
			silaba_respuesta=c.valor_str2
			respuesta_int=c.valor_int
		
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
			if silaba_solucion != silaba_respuesta
				sonidos.play("gaizki")
				datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+silaba_solucion+" ---- Respuesta:"+silaba_respuesta)
			
				var posx=350
				for var i=0 to ultimo_de_lista(silabas)
					if silabas[i].valor_str2==silaba_solucion
						silabas[i].set_colorfondo(amarillo)
						silabas[i].set_colorletra(azul)
					else
						silabas[i].set_colorfondo(blanco)
						silabas[i].set_colorletra(azul)
						
					silabas[i].set_texto(Mm(silabas[i].valor_str2))
					silabas[i].set_posx(posx)
					posx+=silabas[i].get_ancho()+2
					
					
				silabas[respuesta_int].set_colorfondo(rojo)
	
			else
				var posx=350
				for var i=0 to ultimo_de_lista(silabas)
					silabas[i].set_colorfondo(blanco)
					silabas[i].set_colorletra(azul)
					silabas[i].set_texto(Mm(silabas[i].valor_str2))
					silabas[i].set_posx(posx)
					posx+=silabas[i].get_ancho()+2

				silabas[respuesta_int].set_colorfondo(amarillo)
				sonidos.play("ondo")
				datos.guardar_informe ("Bien "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+silaba_solucion+" ---- Respuesta:"+silaba_respuesta)
			
			
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,c.valor_int)+".ogg")
	
	
	def cargar_escenario()
		controles.clear()
	
	
	
	
