//valac -o "config" --disable-warnings --pkg gee-0.8 --pkg gtk+-3.0 ../cadenas.gs "config.gs"     
uses Gtk
// se debe abrir como modal
// ventana para poder elegir los ejercicios que van a concurrir en el automatico.
class Predeterminados:Window

	view1: Gtk.TreeView
	view2: Gtk.TreeView
	
	lista_1:Gtk.ListStore
	lista_2:Gtk.ListStore

	iter1:Gtk.TreeIter ;
	iter2:Gtk.TreeIter ;
	
	label:Label
	lugar:int
	archivo_predeterminados: list of string
	archivo_archivo:list of string
	archivo_nombre: list of string
	archivo_descripcion:list of string
		
	d:GLib.Dir
	
	init
		archivo_predeterminados= new list of string
		archivo_archivo= new list of string
		archivo_nombre= new list of string
		archivo_descripcion= new list of string
		
		
		
	def inicio()
		
		archivo_predeterminados.clear()
		archivo_archivo.clear()
		archivo_nombre.clear()
		archivo_descripcion.clear()
		
		var f = FileStream.open(directorio_datos+"/predeterminados/predeterminados-"+config.idioma+".txt","r")
		if f!=null
			print "abierto"
			var c=""
			c=f.read_line()
			while not f.eof()
				var lista= c.split("/")
				archivo_predeterminados.add(c)
				archivo_archivo.add(lista[0])
				archivo_nombre.add(lista[1])
				archivo_descripcion.add(lista[2])
				c=f.read_line()
		
			

		
		lista_1  = new Gtk.ListStore (1, typeof (string));
		
		view1  = new Gtk.TreeView.with_model (lista_1);
		cell:Gtk.CellRendererText  = new Gtk.CellRendererText ();
		view1.insert_column_with_attributes (-1, "Mailak", cell, "text", 0);
		view1.get_selection().set_mode(Gtk.SelectionMode.SINGLE)
		view1.cursor_changed.connect (on_muestra)
		
		label=new Label ("")
		label.set_width_chars(50)
		label.set_line_wrap (true);
		
		gordeirten: Button= new Button.with_label (t.t("Aplicar y salir"))
		gordeirten.clicked.connect(on_gordeirten)

		irten: Button= new Button.with_label (t.t("Salir"))
		irten.clicked.connect(on_irten)
		
		

		
		var s1 = new Gtk.ScrolledWindow (null,null)
		s1.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
		s1.set_min_content_height(250)
		s1.add(view1)

		
		// introducimos los ejercicios
		for var i=0 to ultimo_de_lista(archivo_nombre)
			lista_1.append (out iter1);
			lista_1.set (iter1, 0, archivo_nombre[i]);
		
		
		var fix= new Gtk.Fixed()
		fix.put(s1,50,50)
		fix.put(label,200,50)
		fix.put(gordeirten,200,350)
		fix.put(irten,350,350)
		this.add(fix)
		this.set_size_request(600,400)
		this.show_all()
		
		
		
		
	def on_irten()
		self.destroy()
		pass
		
		
		
	def on_muestra()
		var selection = view1.get_selection()
		if selection.count_selected_rows()>0
			var item  = selection.get_selected_rows(null).data;
			var texto_selecto=""
			// toma iterador y guarda en selection2 su contenido.
			lista_1.get_iter(out iter2, item);
			lista_1.get(iter2, 0, out texto_selecto);
			lugar=archivo_nombre.index_of (texto_selecto)
			label.set_text( archivo_descripcion[lugar] )
			
	def on_gordeirten()
		config.ejercicios_automaticos.clear()
		config.irudiakx.clear()
		config.hautatutakoak.clear()
		config.archivo_configuracion.clear()
		config.lista_0.clear()
		config.lista_1.clear()
		config.lista_2.clear()
		print "config. nueva selección"
		//abriendo el archivo de configuración de ese usuario
		//archivo de configuración:  
		//0 las letras  //1 puntos segun letras //2 fallos segun letras	//3 puntos segun ejercicios 	//4 fallos según ejercicios
		//5 Puntuacion final   //6 puntuacion incremento	//7 palabras 	//8 ejercicios 		//9 idioma
		//
		// Buscamos el archivo del alumno
		
		
		var f = FileStream.open(directorio_datos+"/predeterminados/"+"ktp_"+archivo_archivo[lugar]+"-"+config.idioma,"r")
		print directorio_datos+"/predeterminados/"+"ktp_"+archivo_archivo[lugar]+"-"+config.idioma
		var c=""
		for var i=0 to 9
			c=f.read_line()
			config.archivo_configuracion.add(c)
		
		// configurando ejercicios automaticos
		var array_autom=config.archivo_configuracion[8].split("-")
		for var i=0 to ultimo_de_array(array_autom)
			config.ejercicios_automaticos.add(int.parse(array_autom[i]))
		
			
		// configurando las letras a trabajar
		var hizkiak = config.archivo_configuracion[0].split("-")
		for var i=0 to ultimo_de_array(hizkiak)
			config.lista_0.append (out config.iter2);
			config.lista_0.set (config.iter2, 0, hizkiak[i].replace(".png","").replace("_","") );
		
			
		
		// introducir las palabras elegidas para cada usuario en la lista que le corresponda: 1 o 2
		var l= config.archivo_configuracion[7].split("/")
		convertir_array_en_lista(l,ref config.hautatutakoak)
		for var i=0 to ultimo_de_lista(config.irudidenak)
			if config.hautatutakoak.contains(config.irudidenak[i].replace(".png",""))
				config.lista_2.append (out config.iter2);
				config.lista_2.set (config.iter2, 0, config.irudidenak[i].replace(".png","").replace("_","") );
			else
				config.lista_1.append (out config.iter1);
				config.lista_1.set (config.iter1, 0, config.irudidenak[i].replace(".png","").replace("_","") );
			config.irudiakx.add(config.irudidenak[i].replace(".png","").replace("_",""))
	
		self.destroy()

	
	
	
	
	def on_letras()
		pass
	def on_sartu()
		pass
			
	def on_atera()
		pass
		
