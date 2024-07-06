uses Gtk

//[falta] crear segun idioma en la funcion crear alumnos

class Ventana_nuevo_nombre: Window
	nuevo_alumno:Entry
	boton_idioma:Button
	aceptar:Button
	posidioma:int
	init
		title=(t.t("Escribe el nombre del nuevo alumno"))
		posidioma= t.archivos_idiomas.index_of (t.idioma_aplicacion)
		
	def inicio()
		nuevo_alumno= new Entry()
		boton_idioma= new Button()
		aceptar= new Button.with_label(t.t("Aceptar"))
		aceptar.clicked.connect(on_aceptar)
		
		var img_idioma= new Image.from_file (directorio_datos+"/imagenes/banderas/bandera-eu.png")
		boton_idioma.set_image (img_idioma)
		boton_idioma.clicked.connect(on_idioma)
		
		var box= new Box (Orientation.HORIZONTAL,5)
		box.add (boton_idioma) 
		box.add (nuevo_alumno) 
		box.add (aceptar)
		this.add(box)
		
		this.set_keep_above(true)
		show_all()
		
	def on_aceptar()
		var existe=false
		for var i=0 to ultimo_de_lista(usuarios.lista_alumnos)
			if usuarios.lista_alumnos[i][4:longitud(usuarios.lista_alumnos[i])]==nuevo_alumno.get_text() do existe=true
		
		// busca caracteres raros para impedir
		var formato_erroneo=false
		var caracteres_validos="abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ-_"
		
		for var i=0 to ultima( nuevo_alumno.get_text())
			var c=toma_cadena (nuevo_alumno.get_text(),i)
			if busca_cadena (caracteres_validos,c)==-1
				formato_erroneo=true
			
		if not existe // si no existe
			if not formato_erroneo // si el formato es correcto
				usuarios.crear_alumno(nuevo_alumno.get_text())
				var msg2=new MessageDialog(this, Gtk.DialogFlags.MODAL, Gtk.MessageType.WARNING, Gtk.ButtonsType.OK, t.t("Alumno creado con una configuracion basica en el idioma :")+usuarios.idioma)
				case msg2.run()
					when Gtk.ResponseType.OK
						usuarios.cargar_alumno()
						msg2.destroy()
			else // el nombre no es correcto
				var msg2=new MessageDialog(this, Gtk.DialogFlags.MODAL, Gtk.MessageType.WARNING, Gtk.ButtonsType.OK, t.t("El nombre no es correcto."))
				case msg2.run()
					when Gtk.ResponseType.OK
						msg2.destroy()
		else //el alumno ya existe
			var msg2=new MessageDialog(this, Gtk.DialogFlags.MODAL, Gtk.MessageType.WARNING, Gtk.ButtonsType.OK, t.t("Alumno ya existe"))
			case msg2.run()
				when Gtk.ResponseType.OK
					msg2.destroy()

		
	def on_idioma ()
		if posidioma==ultimo_de_lista (t.archivos_idiomas) 
			posidioma=0
		else
			posidioma=posidioma+1
		// una vez hallamos encontrado el siguiente idioma colocamos su bandera.
		
		var img_idioma= new Image.from_file (directorio_datos+"/imagenes/banderas/bandera-"+t.archivos_idiomas[posidioma]+".png")
		boton_idioma.set_image(img_idioma)
		// reiniciamos el valor de la variable que guarda el idioma para el alumno
		usuarios.idioma=t.archivos_idiomas[posidioma]
		
		



class Usuarios:Gtk.Window
	alumno:Gtk.ComboBoxText
	lista_alumnos:list of string
	d:GLib.Dir
	entrar:Button
	borrar:Button
	nuevo:Button
	nombre_txt:string
	ventana_nuevo_nombre: Ventana_nuevo_nombre
	idioma:string
	init
		this.title=t.t("Cambiar Alumno")
		this.set_default_size(400,250)
		ventana_nuevo_nombre= new Ventana_nuevo_nombre ()
		ventana_nuevo_nombre.set_modal(true)
		ventana_nuevo_nombre.set_transient_for (this)
	
	def cargar_alumno()
		alumno.remove_all()
		lista_alumnos.clear()
		var name=""
		try
			d = Dir.open( directorio_usuario +"/")
		except
			pass
		var i=0
		var posicion=0
		while ( (name = d.read_name()) != null)
			if name[0:4]=="ktm_"
				alumno.append_text(name[4:longitud(name)])
				if name[4:longitud(name)]== datos.alumno_nombre
					posicion=i
					nombre_txt=name[4:longitud(name)]
				lista_alumnos.add(name)
			i++
			
		alumno.set_active(posicion)
		
	def inicio()
		lista_alumnos= new list of string
		alumno= new Gtk.ComboBoxText()
		cargar_alumno()
		idioma=t.idioma_aplicacion
		alumno.set_wrap_width(3)
		alumno.changed.connect(on_alumno_seleccionado)	
		
		
		
		borrar= new Button.with_label(t.t("Borrar"))
		borrar.clicked.connect(on_borrar)
		
		nuevo= new Button.with_label(t.t("Nuevo"))
		nuevo.clicked.connect(on_nuevo)
		
		var texto_alumno= new Label (t.t("Alumno:"))
		
		var fix= new Gtk.Fixed()
		fix.put(texto_alumno,10,50)
		fix.put(alumno,150,50)
		fix.put(borrar,150,200)
		fix.put(nuevo,250,200)
		this.add(fix)
		this.show_all()
	
	
	def on_alumno_seleccionado()
		nombre_txt=alumno.get_active_text()
		
		
	def on_borrar()
		var terminar=false
		for var i=0 to ultimo_de_lista(lista_alumnos)
			var cadena=lista_alumnos[i][4:longitud(lista_alumnos[i])]
			
			if "katamotz-" in alumno.get_active_text() 
				var msg=new MessageDialog(this, Gtk.DialogFlags.MODAL, Gtk.MessageType.WARNING, Gtk.ButtonsType.OK, t.t("No se debe borrar este alumno"))
				case msg.run()
					when Gtk.ResponseType.OK
						msg.destroy()
						terminar=true
				if terminar do break;
			else		
				if cadena==alumno.get_active_text() 
					FileUtils.remove(directorio_usuario+"/"+lista_alumnos[i])
					config.busca_alumnos()
					var msg=new MessageDialog(this, Gtk.DialogFlags.MODAL, Gtk.MessageType.WARNING, Gtk.ButtonsType.OK, t.t("Alumno borrado"))
					case msg.run()
						when Gtk.ResponseType.OK
							msg.destroy()
							this.cargar_alumno()
							terminar=true
				if terminar do break
				
	def on_nuevo()
		ventana_nuevo_nombre.inicio()
		
			
	
		
	def crear_alumno(nombre:string)
		var archivo_configuracion= new list of string
		var f = FileStream.open(directorio_usuario+"/ktm_katamotz-"+this.idioma,"r")
		var c=""
		for var i=0 to 9
			c=f.read_line()
			archivo_configuracion.add(c)	
		var f2 = FileStream.open (directorio_usuario+"/ktm_"+nombre,"w")
		for var i=0 to 9
			f2.puts(archivo_configuracion[i]+"\n")
		
		config.busca_alumnos()
		
