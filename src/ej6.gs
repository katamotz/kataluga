


// Elije la imagen que corresponde a la palabra
class Ejercicio6:GLib.Object
	palabra: string
	correccion: Texto_color
	entrada: Entrada
	imagen: Imagen
	finalizado:bool=false
	salir:Imagen
	corregir:Imagen
	continuar:Imagen
	init 
		pass
	def inicio()
		cargar_escenario()
		finalizado=false
		palabra= selecciona_item_str_azar (datos.alumno_palabras)
		
		imagen= new Imagen (450,150, directorio_datos+"/fotos/"+tostring(4,datos.transforma_archivo_int(palabra) )+".png")
		imagen.arrastrable=false
		imagen.izq_pulsado.connect(on_imagen)
		imagen.valor_str=palabra.replace("_","")
		imagen.valor_int=datos.transforma_archivo_int(palabra)

		correccion= new Texto_color (400,330,Mm(palabra.replace("_","")))
		correccion.set_colorletra(azul)
		correccion.lista_de_colores.clear()
		correccion.arrastrable=false
		correccion.visible=false
		
		entrada= new Entrada (300,450,300,50,"")
				
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Escribe la palabra del dibujo.")))
		explicacion.set_tamanotexto(25)
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
			if entrada.get_texto().up()==palabra.replace("_","").up()
				sonidos.play("ondo")
				datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra.replace("_","")+" ---- Respuesta: "+entrada.get_texto())
				correccion.lista_de_colores.clear()
				//correccion.repinta()
				correccion.visible=true
				corregir.visible=false
				continuar.visible=true
				finalizado=true
			else
				sonidos.play ("gaizki")
				datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra.replace("_","")+" ---- Respuesta: "+entrada.get_texto())
				var lapalabra= palabra.replace("_","")
				correccion.lista_de_colores.clear()
				for var i=0 to ultima(entrada.get_texto())
					if toma_letra (entrada.get_texto(),i)!=toma_letra(lapalabra,i)
						correccion.lista_de_colores.add(i)
				//correccion.repinta()
				correccion.visible=true



	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,c.valor_int)+".ogg")
		
	def cargar_escenario()
		controles.clear()
	
	
	

