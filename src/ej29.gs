

// Une las palabras con imagenes pero con un tiempo limitado para leer. Temporización automática.

class Ejercicio29:GLib.Object
	palabra_ordenada:string
	solucion: string
	imagen: Imagen
	letras: list of Texto
	palabra:string
	num:int=0
	salir:Imagen
	corregir:Imagen
	iman:list of Rectangulo
	objeto_pulsado:Control
	mireloj : uint
	numtext:int=0
	nave:Imagen
	fuego:Imagen
	fuegox:int=0
	fuegoy:int=0
	textosolucion:Texto
	init
		letras= new list of Texto
		solucion=""
	def inicio()
		numtext=0
		
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		num= Random.int_range(0,tamano_de_lista(datos.alumno_palabras))
		var archivo = datos.todas_palabras.index_of(datos.alumno_palabras[num])
		
		imagen= new Imagen (50,100,directorio_datos+"/fotos/"+tostring(4,archivo)+".png")
		imagen.arrastrable=false
		imagen.izq_pulsado.connect(on_imagen)
		imagen.valor_int=archivo
		imagen.valor_str=datos.alumno_palabras[num]
		
		nave= new Imagen (400,500,directorio_datos+"/imagenes/erabilgarri/nave.png")
		nave.arrastrable=false
		nave.set_ancho(70)
		nave.set_alto(60)

		fuego= new Imagen (100,500,directorio_datos+"/imagenes/erabilgarri/fuego.png")
		fuego.arrastrable=false
		fuego.visible=false
		fuego.set_ancho(30)
		fuego.set_alto(30)
		
		// en palabra_ordenada guardamos la solucion correcta para que sea comparada
		palabra=datos.alumno_palabras[num].replace("_","")
		palabra_ordenada=palabra
		palabra=desordena_string(palabra)
		solucion=""
		letras.clear()
		
		var x=300
		for var i=0 to (ultima(palabra))
			var et=new Texto(x,100,Mm(toma_cadena(palabra,i,i+1)))
			letras.add(et)
			letras.last().valor_str=toma_cadena(palabra,i,i+1)
			letras.last().valor_int=i
			letras.last().valor_int2=Random.int_range(1,5)
			letras.last().set_tamanotexto(40)
			x+=letras.last().get_ancho()+20

		mireloj = Timeout.add(50, mover)
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Coloca en cada cuadrado pequeño la palabra que corresponda a la imagen.")))
		explicacion.set_tamanotexto(20)
		explicacion.set_colorletra(blanco)
		explicacion.set_fondovisible(false)
		explicacion.arrastrable=false
		
		textosolucion= new Texto(50,500,Mm("-"))
		textosolucion.set_tamanotexto(20)
		textosolucion.arrastrable=false
		
		///creando mandos
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
		corregir=new Imagen(920,100,directorio_datos+"/imagenes/corregir.png")
		corregir.set_tamano(50,50)
		corregir.arrastrable=false
		corregir.izq_pulsado.connect(on_corregir)
		
		//controlar el teclado
		menu_principal.key_press_event.connect(on_teclado)
		
	def on_teclado(evt:Gdk.EventKey):bool
		var tecla= evt.keyval
		if tecla==65363 and nave.get_posx()<900 // mueve nave a la derecha
			nave.set_posx(nave.get_posx()+10)
			
		if tecla==65361 and nave.get_posx()>200 // mueve nave a la izquierda
			nave.set_posx(nave.get_posx()-10)
		if tecla==32  //dispara
			fuego.visible=true
			fuego.set_posx(nave.get_posx()+25)
			fuego.set_posy(nave.get_posy()-10)
			
		print "tecla:"+tecla.to_string()
		return true
		
	def on_salir(c:Control)
		Source.remove (mireloj)
		controles.clear()
		menu_principal.key_press_event.disconnect(on_teclado)
		menu_principal.inicio()

	def on_corregir()
		var ondo=true
		if palabra_ordenada!=solucion
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ "---- Solución:"+palabra_ordenada+" ---- Respuesta:"+solucion)
			ondo=false
			sonidos.play("gaizki")
			for var i=0 to ultimo_de_lista(letras) do letras[i].visible=true
			textosolucion.set_texto("")
			solucion=""
		else
			sonidos.play("ondo")
			datos.guardar_informe ("Bien "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+"---- Solución:"+palabra_ordenada+" ---- Respuesta:"+solucion)
			Source.remove (mireloj)
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		
			
	def mover ():bool
		// movimiento de las letras hacia abajo
		for var i=0 to ultimo_de_lista(letras)
			var posicion=letras[i].get_posy()
			var avance=letras[i].valor_int2
			if posicion>400
				letras[i].set_posy(100)
			else
				letras[i].set_posy(posicion+avance)
		
		// movimiento del fuego
		var fuegoy=fuego.get_posy()
		if fuego.visible
			fuego.set_posy(fuegoy-10)
		if fuegoy<100 do fuego.visible=false
		
		// colisión fuego con letra
		for var i=0 to ultimo_de_lista(letras)
			if fuego.visible and letras[i].visible and colision_cuadrada(fuego,letras[i]) 
				letras[i].visible=false
				fuego.visible=false
				sonidos.play("clik")
				solucion+=(letras[i].valor_str)
				textosolucion.set_texto(Mm(solucion))
				break
		
		menu_principal.lienzo.queue_draw()
		return true
		
		
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,datos.transforma_archivo_int(c.valor_str))+".ogg")
		pass
		
	def cargar_escenario()
		controles.clear()
	
