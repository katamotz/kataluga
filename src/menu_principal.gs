uses Cairo
uses Gtk
	
class Menu_principal:Gtk.Window
	boton_ejercicio : list of Texto
	boton_tipo : list of Imagen
	boton_idioma: Imagen
	box:Gtk.Paned
	lienzo:DrawingArea
	caja_eventos:EventBox
	event lienzo_izq_pulsado()
	event lienzo_der_pulsado()
	event lienzo_soltado()
	arrastrando:bool
	guardado:bool
	control_seleccionado:int
	control_tomado:int
	lienzo_ancho:int
	lienzo_alto:int
	timer:uint
	init 
		lienzo_ancho=1000
		lienzo_alto=600
		arrastrando=false
		control_seleccionado=-1
		inicializa_pantalla()
	
	def on_toma (evento:Gdk.EventButton):bool // evento cuando se pulsa un boton del mouse
		if evento.button==1
			this.lienzo_izq_pulsado ()
			for var i=0 to ultimo_de_lista(controles)
				if controles[i].visible
					var romper_bucle=false
					case controles[i].tipo
						when "Imagen"
							if colision_xy_cuadrada ((int)evento.x,(int)evento.y,controles[i])
								if not is_alpha ((int)evento.x-controles[i].x,(int)evento.y-controles[i].y,controles[i].pixbufer)
									if not controles[i].figurafondo
										controles.insert (0,controles[i])
										control_seleccionado=0
										control_tomado=0
									else
										control_tomado=i
										control_seleccionado=i
									controles[control_tomado].izq_pulsado(controles[control_tomado])
									controles[control_tomado].tomado_x=(int)evento.x-controles[control_tomado].x
									controles[control_tomado].tomado_y=(int)evento.y-controles[control_tomado].y
									if controles[control_tomado].arrastrable do arrastrando=true
									romper_bucle=true
						when "Texto","Rectangulo","Entrada"
							if colision_xy_cuadrada ((int)evento.x,(int)evento.y,controles[i])
								if not controles[i].figurafondo
									controles.insert (0,controles[i])
									control_seleccionado=0
									control_tomado=0
								else
									control_tomado=i
									control_seleccionado=i
									
								controles[control_tomado].izq_pulsado(controles[control_tomado])
								controles[control_tomado].tomado_x=(int)evento.x-controles[control_tomado].x
								controles[control_tomado].tomado_y=(int)evento.y-controles[control_tomado].y
								if controles[control_tomado].arrastrable do arrastrando=true
								romper_bucle=true
								
					if romper_bucle do break
		else if evento.button==3
			this.lienzo_der_pulsado ()
			for var i=0 to ultimo_de_lista(controles)
				var romper_bucle=false
				case controles[i].tipo
					when "Imagen","Texto","Rectangulo"
						if colision_xy_cuadrada ((int)evento.x,(int)evento.y,controles[i])
							controles[i].der_pulsado(controles[i])
							romper_bucle=true
				if romper_bucle do break
			
		lienzo.queue_draw_area(0,0,lienzo_ancho,lienzo_alto) //Refresca la pantalla
		return true
		
		
	def on_deja (evento:Gdk.EventButton):bool // evento cuando se suelta un boton del mouse
		arrastrando=false
		
		if control_tomado>=0 do controles[control_tomado].soltado(controles[control_tomado])
		control_tomado=-1
		
		lienzo.queue_draw_area(0,0,lienzo_ancho,lienzo_alto) //Refresca la pantalla
		
		return true
		
	def on_mover (evento:Gdk.EventMotion):bool // evento cuando se mueve el mouse
		if arrastrando 
			if evento.x>5 and evento.x<lienzo_ancho-5 and evento.y>5 and evento.y<lienzo_alto-5
				case controles[control_tomado].tipo
					when "Imagen","Texto","Rectangulo"
					if controles[control_tomado].arrastrable
						controles[control_tomado].x=(int)evento.x-controles[control_tomado].tomado_x
						controles[control_tomado].y=(int)evento.y-controles[control_tomado].tomado_y
						
			pintar()
		return true
	def pintar()
		lienzo.queue_draw() //Refresca la pantalla
	def on_pinta(e:Gtk.Widget,ctx:Context) : bool // funcion para pintar el escenario
		lienzo.grab_focus()
		//dibujando todos los controles desde el último hasta el primero
		var i= ultimo_de_lista(controles)
		while i>=0
			// le advertimos al control si esta seleccionado o no
			if i!=control_seleccionado
				controles[i].seleccionado=false
			else
				controles[i].seleccionado=true
			// pintamos el control
			controles[i].pinta(ctx)// pintando un control
			// si esta seleccionado o tomado entonces 
			i--
			
		return true

	def on_tecla(evento:Gdk.EventKey):bool
		if control_seleccionado!=-1
			print control_seleccionado.to_string()
			if controles[control_seleccionado].tipo=="Entrada"
				controles[control_seleccionado].gestiona_tecla(evento.keyval,evento.str)
				print "Tecla dentro"
		print "Tecla fuera"
		lienzo.queue_draw() //Refresca la pantalla
		return true
	
		
	def inicializa_pantalla()
		
		this.destroy.connect(on_salir)
		// pon la ventana en la medida
		this.set_size_request(lienzo_ancho+40,lienzo_alto)
		//this.configure_event.connect(recalcula_cuadro)
		
		// lienzo es la zona da dibujo
		lienzo = new DrawingArea()
		lienzo.draw.connect(on_pinta)
		lienzo.queue_draw()
		var color=Gdk.RGBA(); color.red=0.2; color.green=0; color.blue=0.9; color.alpha=1;
		this.override_background_color(StateFlags.NORMAL,color)
		// introducimos lienzo (zona de dibujo) en una caja de eventos para recoger los eventos del raton.
		caja_eventos= new EventBox ()
		caja_eventos.add_events(Gdk.EventMask.BUTTON_PRESS_MASK)
		caja_eventos.button_press_event.connect(on_toma)
		
		caja_eventos.add_events(Gdk.EventMask.BUTTON_RELEASE_MASK)
		caja_eventos.button_release_event.connect(on_deja)
		
		caja_eventos.add_events(Gdk.EventMask.POINTER_MOTION_MASK)
		caja_eventos.motion_notify_event.connect(on_mover)
		
		caja_eventos.add_events(Gdk.EventMask.KEY_PRESS_MASK)
		caja_eventos.key_press_event.connect(on_tecla)
		
		lienzo.set_can_focus(true)
		lienzo.grab_focus()
		caja_eventos.add(lienzo)

		box=new Gtk.Paned (Gtk.Orientation.HORIZONTAL);
		box.set_position(40)
		box.add(caja_eventos)
		this.add(box)
		
		lienzo.show_all()
		caja_eventos.show_all()
		box.show_all()
		this.show_all()

	def inicio()
		cargar_escenario()
		this.show()
		this.set_size_request(lienzo_ancho,lienzo_alto)
		boton_ejercicio= new list of Texto
		boton_tipo= new list of Imagen
		
		for var i=0 to ultimo_de_lista(nomejer)
			boton_ejercicio.add(new Texto (300,30*i+10,Mm(t.t(nomejer[i]))))
			boton_ejercicio.last().valor_int=i
			boton_ejercicio.last().izq_pulsado.connect (on_continua)
			boton_ejercicio.last().set_tamanotexto(15)
			boton_ejercicio.last().arrastrable=false
			boton_ejercicio.last().visible=false
			boton_ejercicio.last().set_anchoborde(1)
		
		for var i=0 to 3
			boton_tipo.add (new Imagen(100,120*i+100,directorio_datos+"/imagenes/ejercicios/EjercicioTipo"+i.to_string()+".png"))
			boton_tipo.last().izq_pulsado.connect (on_tipo)
			boton_tipo.last().arrastrable=false
			boton_tipo.last().visible=true
			boton_tipo.last().valor_int=i
			
			
		//muestra la lista de los ejercicios activados	
		imprime_ejercicios(tipo_abierto)
		
		boton_idioma= new Imagen (0,0,directorio_datos+"/imagenes/banderas/bandera-"+t.idioma_aplicacion+".png")
		boton_idioma.izq_pulsado.connect(on_idioma)
		boton_idioma.visible=true
		boton_idioma.arrastrable=false
		boton_idioma.set_alto(40)
		boton_idioma.set_ancho(60)
		
		var boton_comienza_automatico= new Imagen (100,0,directorio_datos+"/imagenes/green_play.png")
		boton_comienza_automatico.izq_pulsado.connect(on_comienza_automatico)
		boton_comienza_automatico.set_alto(40)
		boton_comienza_automatico.set_ancho(40)
		boton_comienza_automatico.visible=true
		boton_comienza_automatico.arrastrable=false
	
		var boton_cambio_usuario= new Imagen (200,0,directorio_datos+"/imagenes/system-users.png")
		boton_cambio_usuario.arrastrable=false
		boton_cambio_usuario.visible=true
		boton_cambio_usuario.set_ancho(40)
		boton_cambio_usuario.set_alto(40)
		boton_cambio_usuario.izq_pulsado.connect (on_cambio_usuario)
		
		
		var boton_fuentes= new Imagen (300,0,directorio_datos+"/imagenes/fuente.png")
		boton_fuentes.izq_pulsado.connect(on_fuentes)
		boton_fuentes.visible=true
		boton_fuentes.arrastrable=false
		boton_fuentes.set_alto(40)
		boton_fuentes.set_ancho(40)
		
		var boton_mayusculas= new Imagen (400,0,directorio_datos+"/imagenes/mayusculas.png")
		boton_mayusculas.izq_pulsado.connect(on_mayusculas)
		boton_mayusculas.visible=true
		boton_mayusculas.arrastrable=false
		boton_mayusculas.set_alto(40)
		boton_mayusculas.set_ancho(40)
		
		var boton_config= new Imagen (500,0,directorio_datos+"/imagenes/Herramientas.png")
		boton_config.izq_pulsado.connect(on_configuracion)
		boton_config.visible=true
		boton_config.arrastrable=false
		boton_config.set_alto(40)
		boton_config.set_ancho(40)
		
	def cargar_escenario()
		controles.clear()
		pass

	def on_mayusculas(c:Control)
		if mayusculas
			mayusculas=false
		else
			mayusculas=true
		
		this.inicio()
		
	def on_idioma(c:Control)
		// buscamos el siguiente idioma
		var siguiente_idioma=0
		var posidioma= t.archivos_idiomas.index_of (t.idioma_aplicacion)
		for var i=0 to ultimo_de_lista (t.archivos_idiomas) 
			print t.archivos_idiomas[i]
		if posidioma==ultimo_de_lista (t.archivos_idiomas) 
			siguiente_idioma=0
		else
			siguiente_idioma=posidioma+1
		// una vez hallamos encontrado el siguiente idioma colocamos su bandera.
		boton_idioma.set_imagen(directorio_datos+"/imagenes/banderas/bandera-"+t.archivos_idiomas[siguiente_idioma]+".png")
		// reiniciamos el valor de la variable que guarda el idioma de la app
		t.idioma_aplicacion=t.archivos_idiomas[siguiente_idioma]
		// traducimos la app guardando los valores de traduccion de los archivos en la lista de traducciones.
		t.traduce(t.idioma_aplicacion)
		// destruye la actual pantalla de menu principal para comenzar otra nueva para que se traduzca.
		// entrar en la nueva pantalla de menu principal con la traduccion.
		this.inicio()
		
	def on_tipo(c:Control)
		// esconde todos los botones
		for var i=0 to ultimo_de_lista(nomejer) do boton_ejercicio[i].visible=false
		imprime_ejercicios (c.valor_int)
		tipo_abierto=c.valor_int

	def on_fuentes(c:Control)
		fuentes.show_all()
		
	def imprime_ejercicios(referencia:int)
		var tipo=""
		case referencia  // la referencia es el tipo
			when 0
				tipo="letras"
			when 1
				tipo="silabas"
			when 2
				tipo="palabras"
			when 3
				tipo="frases"
		var x=0
		for var i=0 to (ultimo_de_lista(nomejer))
			if tipoejer[i]==tipo 
				boton_ejercicio[i].set_posx(400)
				boton_ejercicio[i].set_posy(100+x*40)
				boton_ejercicio[i].visible=true
				x+=1
				
	def on_continua (c:Control)
		//destruye el menu principal
		automatico=false
		numauto=0
		iniciaejercicio(c.valor_int)
		
	def on_comienza_automatico()
		datos.guardar_informe ("Comienza una serie automática en la fecha:"+fecha_str+" "+hora_str)
		automatico=true
		numauto=0
		continuando()

	def on_cambio_usuario()
		cambio_usuario.inicio()

	def on_configuracion(c:Control)
		config.inicio()
		
	def on_salir()
		Gtk.main_quit()
