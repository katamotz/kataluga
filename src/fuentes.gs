class Fuentes:Gtk.Window 
	selection:Gtk.FontChooserWidget 
	box:Gtk.Box
	button:Gtk.Button
	salir:Gtk.Button
	letra:string
	fuente:Pango.FontFamily
	
	init
		letra="Andika"
		this.title = "My Gtk.FontSelection";
		this.window_position = Gtk.WindowPosition.CENTER;
		this.set_default_size (350, 70);

		// A VBox:
		box= new Gtk.Box (Gtk.Orientation.VERTICAL, 0);
		this.add (box);

		// The FontSelection:
		selection= new Gtk.FontChooserWidget ();
		box.add (selection);

		// A Button:
		button = new Gtk.Button.with_label (t.t("Seleccionar"));
		box.add (button);
		button.clicked.connect (on_clic) 
		
		salir = new Gtk.Button.with_label (t.t("Salir"));
		box.add (salir);
		salir.clicked.connect (on_salir) 
		
		this.delete_event.connect(on_salirx)
		this.hide()
		
	def on_clic()
		// Emitted when a font has been chosen:
		fuente= selection.get_font_family ();
		letra=fuente.get_name()
		print letra
		
	def on_salir()
		menu_principal.inicio()
		this.hide()

	def on_salirx():bool
		menu_principal.inicio()
		this.hide()
		return true
