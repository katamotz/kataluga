class Ebaluatu : Gtk.Window 
	view:Gtk.TextView
	init
		pass
	def inicio(nombre:string)
	
		var lineas=new list of string
		
		var f = FileStream.open(directorio_usuario+"/"+"kti_"+nombre,"r")
		if f!= null
			var c=""
			c=f.read_line()
			while not f.eof()
				c=f.read_line()
				lineas.add(c)
				
		// Prepare Gtk.Window:
		this.title = t.t("Evaluar:")+nombre;
		this.window_position = Gtk.WindowPosition.CENTER;
		this.set_default_size (1000, 400);
		
		// Box:
		box:Gtk.Box = new Gtk.Box (Gtk.Orientation.VERTICAL, 1);
		this.add (box);

		// A ScrolledWindow:
		scrolled:Gtk.ScrolledWindow= new Gtk.ScrolledWindow (null, null);
		box.pack_start (scrolled, true, true, 0);

		// The TextView:
		view = new Gtk.TextView ();
		view.set_wrap_mode (Gtk.WrapMode.WORD);
		view.set_editable(false)
		//mostrar
		var i=ultimo_de_lista(lineas)
		while i>=0
			view.buffer.text +=lineas[i]+"\n";
			i-=1
		scrolled.add (view);
		
		this.show_all()
			

	
