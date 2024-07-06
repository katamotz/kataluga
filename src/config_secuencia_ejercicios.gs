//valac -o "config" --disable-warnings --pkg gee-0.8 --pkg gtk+-3.0 ../cadenas.gs "config.gs"     
//[falta] configurar que cuando los ejercicios sean en un idioma no aparezcan si no existen.
uses Gtk
// se debe abrir como modal
// ventana para poder elegir los ejercicios que van a concurrir en el automatico.
class Secuencia_ejercicios:Window

	
	view1: Gtk.TreeView
	view2: Gtk.TreeView
	
	lista_1:Gtk.ListStore
	lista_2:Gtk.ListStore

	iter1:Gtk.TreeIter ;
	iter2:Gtk.TreeIter ;
	
		
	archivo_configuracion: list of string
	d:GLib.Dir
	
	init
		pass
	def inicio()
		
		lista_1  = new Gtk.ListStore (1, typeof (string));
		lista_2  = new Gtk.ListStore (1, typeof (string));
			
		
		view1  = new Gtk.TreeView.with_model (lista_1);
		cell:Gtk.CellRendererText  = new Gtk.CellRendererText ();
		view1.insert_column_with_attributes (-1, t.t("Ejercicios a trabajar"), cell, "text", 0);
		view1.get_selection().set_mode(Gtk.SelectionMode.MULTIPLE)

		view2  = new Gtk.TreeView.with_model (lista_2);
		cell2:Gtk.CellRendererText  = new Gtk.CellRendererText ();
		view2.insert_column_with_attributes (-1, t.t("Ejercicios descartados"), cell2, "text", 0);
		view2.get_selection().set_mode(Gtk.SelectionMode.MULTIPLE)


		sartu: Button= new Button.with_label("-->")
		sartu.clicked.connect(on_sartu)
		
		atera: Button= new Button.with_label("<--")
		atera.clicked.connect(on_atera)
		
		gordeirten: Button= new Button.with_label (t.t("Gorde eta irten"))
		gordeirten.clicked.connect(on_gordeirten)

		gorde: Button= new Button.with_label (t.t("Gorde"))
		gorde.clicked.connect(on_gorde)
		
		irten: Button= new Button.with_label (t.t("Irten"))
		irten.clicked.connect(on_irten)
		
		

		
		var s1 = new Gtk.ScrolledWindow (null,null)
		s1.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
		s1.set_min_content_height(250)
		s1.add(view1)

		var s2 = new Gtk.ScrolledWindow (null,null)
		s2.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
		s2.set_min_content_height(250)
		s2.add(view2)
		
		nomejer=datos.crea_array_de_ejercicios_segun_idioma (config.idioma)
		tipoejer=datos.crea_array_de_tipos_segun_idioma(config.idioma)
		
		// introducimos los ejercicios
		for var i=0 to ultimo_de_lista(nomejer)
			if tipoejer[i]!="" // si el ejercicio no esta anulado
				lista_1.append (out iter1);
				lista_1.set (iter1, 0, nomejer[i]);
		
		// introducimos los ejercicios automaticos que ya existen
		
		if not lista_vacia (config.ejercicios_automaticos)
			for var i=0 to ultimo_de_lista( config.ejercicios_automaticos)
				lista_2.append (out iter1);
				lista_2.set (iter1, 0, nomejer[config.ejercicios_automaticos[i]]);
		
		var fix= new Gtk.Fixed()
		fix.put(s1,50,50)
		fix.put(s2,500,50)
		fix.put(gordeirten,300,350)
		fix.put(gorde,200,350)
		fix.put(irten,450,350)
		fix.put(sartu,350,150)
		fix.put(atera,350,200)
		this.add(fix)
		this.set_size_request(800,400)
		this.show_all()
		
		
		
	def on_irten()
		self.destroy()
		pass
		
	def on_gorde()
		config.ejercicios_automaticos.clear()
		var selection = view2.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		selection.select_all()
		// revisando que este
		if selection.count_selected_rows()>0
			var item  = selection.get_selected_rows(null).data;
			for var i=0 to (selection.count_selected_rows()-1)
				var texto_selecto=""
				// toma iterador y guarda en selection2 su contenido.
				lista_2.get_iter(out iter2, item);
				lista_2.get(iter2, 0, out texto_selecto);
				config.ejercicios_automaticos.add( nomejer.index_of(texto_selecto) )
				item.next()
		selection.unselect_all()
		
		
	def on_gordeirten()
		config.ejercicios_automaticos.clear()
		var selection = view2.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		selection.select_all()
		// revisando que este
		if selection.count_selected_rows()>0
			var item  = selection.get_selected_rows(null).data;
			for var i=0 to (selection.count_selected_rows()-1)
				var texto_selecto=""
				// toma iterador y guarda en selection2 su contenido.
				lista_2.get_iter(out iter2, item);
				lista_2.get(iter2, 0, out texto_selecto);
				config.ejercicios_automaticos.add( nomejer.index_of(texto_selecto) )
				item.next()
		selection.unselect_all()
		self.destroy()
		
	def on_letras()
		pass
		
	def on_sartu()
		var selection = view1.get_selection()
		var item  = selection.get_selected_rows(null).data;
		// revisando que este
		for var i=0 to (selection.count_selected_rows()-1)
			var texto_selecto=""
			// toma iterador y guarda en selection2 su contenido.
			lista_1.get_iter(out iter1, item);
			lista_1.get(iter1, 0, out texto_selecto);
			lista_2.append (out iter2);
			lista_2.set (iter2, 0, texto_selecto);
			item.next()
			
	def on_atera()
		var selection = view2.get_selection()
		// revisando que este
		if selection.count_selected_rows()>0
			var item  = selection.get_selected_rows(null).data;
			var iteradores= new list of Gtk.TreeIter?
			for var i=0 to (selection.count_selected_rows()-1)
				// toma iterador y guarda en selection2 su contenido.
				lista_2.get_iter(out iter2, item);
				iteradores.add(iter2)
				item.next()
			// borra los iteradores
			var i=ultimo_de_lista(iteradores)
			while i>=0
				lista_2.remove(iteradores[i])
				i--
		
		
