//valac -o "config" --disable-warnings --pkg gee-0.8 --pkg gtk+-3.0 ../cadenas.gs "config.gs"     
uses Gtk

class Config:Window
	alumno:Gtk.ComboBoxText
	lista_alumnos:list of string
	
	view0: Gtk.TreeView // Letras
	view1: Gtk.TreeView // Palabras No elegidas
	view2: Gtk.TreeView // Palabras elegidas
	
	lista_0:Gtk.ListStore // lista de Letras
	lista_1:Gtk.ListStore // lista de palabras no elegidas
	lista_2:Gtk.ListStore // Lista de palabras elegidas
	
	zenb:Entry
	letras:Entry
	
	iter0:Gtk.TreeIter ;
	iter1:Gtk.TreeIter ;
	iter2:Gtk.TreeIter ;
	
	palabras:list of string= new list of string
	irudidenak: list of string
	irudiakx: list of string
	hautatutakoak:  list of string
	archivo_configuracion: list of string
	nombre:string
	letras_permitidas:list of string
	ejercicios_automaticos:list of int
	d:GLib.Dir
	idioma:string
	boton_idioma:Button
	
	
	init
		letras_permitidas= new list of string
		lista_alumnos= new list of string
		archivo_configuracion= new list of string
		irudidenak= new list of string
		irudiakx= new list of string
		hautatutakoak=new list of string
		ejercicios_automaticos= new list of int
		
		alumno= new Gtk.ComboBoxText()
		busca_alumnos()
		alumno.active=0
		
		lista_0  = new Gtk.ListStore (1, typeof (string));
		lista_1  = new Gtk.ListStore (1, typeof (string));
		lista_2  = new Gtk.ListStore (1, typeof (string));
			
		view0  = new Gtk.TreeView.with_model (lista_0);
		cell0:Gtk.CellRendererText  = new Gtk.CellRendererText ();
		view0.insert_column_with_attributes (-1, t.t("Letras"), cell0, "text", 0);
		view0.get_selection().set_mode(Gtk.SelectionMode.MULTIPLE)
	
		view1  = new Gtk.TreeView.with_model (lista_1);
		cell:Gtk.CellRendererText  = new Gtk.CellRendererText ();
		view1.insert_column_with_attributes (-1, t.t("Descartadas"), cell, "text", 0);
		view1.get_selection().set_mode(Gtk.SelectionMode.MULTIPLE)

		view2  = new Gtk.TreeView.with_model (lista_2);
		cell2:Gtk.CellRendererText  = new Gtk.CellRendererText ();
		view2.insert_column_with_attributes (-1, t.t("Palabras elegidas"), cell2, "text", 0);
		view2.get_selection().set_mode(Gtk.SelectionMode.MULTIPLE)


		alumno.changed.connect(on_alumno_seleccionado)	
		
		botezab: Button= new Button.with_label(t.t("Borrar"))
		botezab.clicked.connect (on_ezabatu)
		
		botiragaz: Button= new Button.with_label(t.t("Filtro puro"))
		botiragaz.clicked.connect (on_iragaz)
		
		var boton_secuencia_ejercicios= new Button.with_label (t.t("Secuencia automática"))
		boton_secuencia_ejercicios.clicked.connect(on_secuencia_ejercicios)
		
		var boton_usuarios= new Button.with_label (t.t("Usuarios"))
		boton_usuarios.clicked.connect(on_usuarios)
		
		var boton_predeterminada= new Button.with_label (t.t("Configuración predeterminada"))
		boton_predeterminada.clicked.connect(on_predeterminada)
		
		var boton_ebaluatu= new Button.with_label (t.t("Evaluar"))
		boton_ebaluatu.clicked.connect(on_ebaluatu)
		
		
		haut1: Button= new Button.with_label(t.t("<--selec"))
		haut1.clicked.connect (on_haut1)
		haut2: Button= new Button.with_label(t.t("selec-->"))
		haut2.clicked.connect (on_haut2)
		dena1: Button= new Button.with_label(t.t("<--todo"))
		dena1.clicked.connect (on_dena1)
		dena2: Button= new Button.with_label(t.t("todo-->"))
		dena2.clicked.connect (on_dena2)
		
		zenb1: Button= new Button.with_label("<--")
		zenb1.clicked.connect (on_zenb1)
		zenb2: Button= new Button.with_label("-->")
		zenb2.clicked.connect (on_zenb2)
		zenb= new Entry ()
		zenb.set_width_chars(3)
		letras= new Entry()
		letras.activate.connect(on_letras)
		letras.set_width_chars(3)
		letras.set_max_length(2)
		gordeirten: Button= new Button.with_label (t.t("Guardar y salir"))
		gordeirten.clicked.connect(on_gordeirten)
		
		gorde: Button= new Button.with_label (t.t("Guardar"))
		gorde.clicked.connect(on_gorde)
		
		irten: Button= new Button.with_label (t.t("Salir"))
		irten.clicked.connect(on_irten)
		
		this.delete_event.connect(on_salirx)

		var s0 = new Gtk.ScrolledWindow (null,null)
		s0.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
		s0.set_min_content_height(250)
		s0.add(view0)

		var s1 = new Gtk.ScrolledWindow (null,null)
		s1.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
		s1.set_min_content_height(250)
		s1.add(view1)

		var s2 = new Gtk.ScrolledWindow (null,null)
		s2.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
		s2.set_min_content_height(250)
		s2.add(view2)

		
		var fix= new Gtk.Fixed()
		fix.put(alumno,20,0)
		fix.put(boton_secuencia_ejercicios,200,0)
		fix.put(boton_predeterminada,450,0)
		fix.put(boton_usuarios,750,0)
		fix.put(boton_ebaluatu,900,0)
		fix.put(s0,20,50)
		fix.put(s1,265,50)
		fix.put(s2,700,50)
		fix.put(haut1,430,50)
		fix.put(haut2,550,50)
		fix.put(dena1,430,100)
		fix.put(dena2,550,100)
		fix.put(zenb1,450,150)
		fix.put(zenb ,520,150)
		fix.put(zenb2,580,150)
		fix.put(letras,120,50)
		fix.put(botezab,120,90)
		fix.put(botiragaz,120,130)
		fix.put(gordeirten,300,350)
		fix.put(gorde,200,350)
		fix.put(irten,480,350)
		this.add(fix)
		this.set_size_request(950,400)
		//destroy.connect(Gtk.main_quit)
		this.set_deletable(false)
		this.hide()
	
	
	def busca_alumnos()
		lista_alumnos.clear()
		alumno.remove_all()
		var name=""
		try
			d = Dir.open( directorio_usuario +"/")
		except
			pass
		var i=0
		while ( (name = d.read_name()) != null)
			if name[0:4]=="ktm_"
				alumno.append_text(name[4:longitud(name)])
				if name[4:longitud(name)]==datos.alumno_nombre
					alumno.set_active(i)
				lista_alumnos.add(name)
			i++
		
	def inicio()
		cargar_alumno()
		this.show_all()
		
	def fin()
		this.hide()
	
	
	def on_ebaluatu()
		if alumno.get_active_text()!=""
			nombre=alumno.get_active_text()
			ebaluatu.inicio(nombre)
			ebaluatu.set_modal(true)
			ebaluatu.set_transient_for (config)
	
		
			
	def on_alumno_seleccionado()
		cargar_alumno()
		
	def cargar_alumno()
		ejercicios_automaticos.clear()
		irudidenak.clear()
		irudiakx.clear()
		hautatutakoak.clear()
		archivo_configuracion.clear()
		lista_0.clear()
		lista_1.clear()
		lista_2.clear()
		//abriendo el archivo de configuración de ese usuario
		//archivo de configuración:  
		//0 las letras  //1 puntos segun letras //2 fallos segun letras	//3 puntos segun ejercicios 	//4 fallos según ejercicios
		//5 Puntuacion final   //6 puntuacion incremento	//7 palabras 	//8 ejercicios 		//9 idioma
		// Buscamos el archivo del alumno
		
		nombre=alumno.get_active_text()
		var posicion=-1
		for var i=0 to ultimo_de_lista(lista_alumnos)
			if lista_alumnos[i][4:longitud(lista_alumnos[i])]==nombre
				posicion=i  // guardaremos la posicion del alumno en el array en esta variable
				break
		if posicion==-1 // no encontrado error
			print "alumno no existe"
		else
			var f = FileStream.open(directorio_usuario+"/"+lista_alumnos[posicion],"r")
			var c=""
			for var i=0 to 9
				c=f.read_line()
				archivo_configuracion.add(c)
				
			// configurando el idioma
			idioma= archivo_configuracion[9]
			
			// configurando ejercicios automaticos
			var array_autom=config.archivo_configuracion[8].split("-")
			for var i=0 to ultimo_de_array(array_autom)
				this.ejercicios_automaticos.add(int.parse(array_autom[i]))
			
				
			// configurando las letras a trabajar
			var hizkiak = archivo_configuracion[0].split("-")
			for var i=0 to ultimo_de_array(hizkiak)
				lista_0.append (out iter2);
				lista_0.set (iter2, 0, hizkiak[i].replace(".png","").replace("_","") );
			// configurando fonemas posibles
			letras_permitidas.clear()
			f = FileStream.open(directorio_datos+"/palabras/fonemas-"+idioma,"r")
		
			if f!=null
				c=""
				c=f.read_line()
				while not f.eof()
					if c[0:2]=="f:" do letras_permitidas.add(toma_cadena(c,2,longitud(c)))
					c=f.read_line()
			// abriendo archivo de palabras en euskera totales
			f = FileStream.open(directorio_datos+"/palabras/imagenes-"+idioma+".dat","r")
			c=""
			c=f.read_line()
			while not f.eof()
				irudidenak.add(c)
				c=f.read_line()

			// ordenar alfabeticamente
			irudidenak.sort()
			// ordenar la lista según la longitud
			for var x=1 to ultimo_de_lista(irudidenak)
				for var y=0 to (ultimo_de_lista(irudidenak)-1)
					if ultima(irudidenak[y]) > ultima(irudidenak[y+1])
						var a= irudidenak[y]
						irudidenak[y]=irudidenak[y+1]
						irudidenak[y+1]=a
			
			
			// introducir las palabras elegidas para cada usuario en la lista que le corresponda: 1 o 2
			var l= archivo_configuracion[7].split("/")
			convertir_array_en_lista(l,ref hautatutakoak)
			for var i=0 to ultimo_de_lista(irudidenak)
				if hautatutakoak.contains(irudidenak[i].replace(".png",""))
					lista_2.append (out iter2);
					lista_2.set (iter2, 0, irudidenak[i].replace(".png","").replace("_","") );
				else
					lista_1.append (out iter1);
					lista_1.set (iter1, 0, irudidenak[i].replace(".png","").replace("_","") );
				irudiakx.add(irudidenak[i].replace(".png","").replace("_",""))
			
	def guardando():bool
		var salir=true
		palabras.clear()
		var selection = view2.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		iter : TreeIter
		selection.select_all()
		
		// toma la lista de palabras elegidas y metela en el array palabras
		if selection.count_selected_rows()>0
			var item  = selection.get_selected_rows(null).data;
			//print selection.count_selected_rows().to_string()
		
			for var i=0 to (selection.count_selected_rows()-1)
				
				var selection2=""
				lista_2.get_iter(out iter, item);
				lista_2.get(iter, 0, out selection2);
				palabras.add(selection2)
				item.next()
		selection.unselect_all()		
		
		
		
		
		// tomamos las letras y lo metemos en el array letras
		letras:list of string= new list of string
		
		var selection0 = view0.get_selection()
		selection0.set_mode(Gtk.SelectionMode.MULTIPLE)
		selection0.select_all()
		
		if selection0.count_selected_rows()>0
			var item  = selection0.get_selected_rows(null).data;
			for var i=0 to (selection0.count_selected_rows()-1)
				var selection2=""
				lista_0.get_iter(out iter, item);
				lista_0.get(iter, 0, out selection2);
				letras.add(selection2)
				item.next()
		selection0.unselect_all()

		if tamano_de_lista(palabras)<10
			var m= new MessageDialog(this,DialogFlags.MODAL,MessageType.WARNING,ButtonsType.OK,t.t("Para trabajar se necesitan como mínimo 10 palabras"))
			m.show_all()
			salir=false
			if m.run ()==Gtk.ResponseType.OK 
				m.hide()
		else
			
			if tamano_de_lista(letras)<5
				var m= new MessageDialog(this,DialogFlags.MODAL,MessageType.WARNING,ButtonsType.OK, t.t("Se necesitan 5 letras como mínimo"))
				salir=false
				m.show_all()
				if m.run ()==Gtk.ResponseType.OK 
					m.hide()
			else
				// recoge los datos de la septima linea de archivo de configuracion.
				// son las palabras.
				var linea7=""
				for var i=0 to ultimo_de_lista(palabras)
					var palabra=""
					for var n=0 to ultimo_de_lista(irudidenak)
						if irudidenak[n].replace(".png","").replace("_","")==palabras[i]
							palabra=irudidenak[n].replace(".png","")
					linea7+=palabra+"/"
				linea7=linea7[0:-1]
				
				// recoge los datos de la primera linea del archivo de configuración.
				// Son las letras  
				var linea0=""
				for var i=0 to ultimo_de_lista(letras)
					linea0+=letras[i]+"-"
				linea0=linea0[0:-1]
				
				// según el numero de letras introduce la puntuacion por letras en la linea 1 y 2
				var linea1=""
				var linea2=""
				for var i=0 to ultimo_de_lista(letras)
					linea1+="0-"
					linea2+="0-"
				linea1=linea1[0:-1]
				linea2=linea2[0:-1]
				
				// introducimos los ejercicios automaticos
				var linea8=""
				if not lista_vacia(this.ejercicios_automaticos)
					for var i=0 to ultimo_de_lista(this.ejercicios_automaticos)
						linea8+=this.ejercicios_automaticos[i].to_string()+"-"
					linea8=linea8[0:-1]
				
				var f = FileStream.open(directorio_usuario+"/ktm_"+nombre,"w")
				
				f.puts(linea0+"\n")
				f.puts(linea1+"\n")
				f.puts(linea2+"\n")
				f.puts(archivo_configuracion[3]+"\n")
				f.puts(archivo_configuracion[4]+"\n")
				f.puts(archivo_configuracion[5]+"\n")
				f.puts(archivo_configuracion[6]+"\n")
				f.puts(linea7+"\n")
				f.puts(linea8+"\n")
				f.puts(archivo_configuracion[9]+"\n")
				
		return salir
	
	def on_secuencia_ejercicios ()
		if alumno.get_active_text()!=""
			secuencia_ejercicios.inicio()
			secuencia_ejercicios.set_modal(true)
			secuencia_ejercicios.set_transient_for (config)
	
	def on_usuarios()
		usuarios.inicio()
		usuarios.set_modal(true)
		usuarios.set_transient_for (config)
		
	def on_gordeirten ()
		var salir=true
		salir = guardando()
		if salir
			// retoma la nueva configuración del alumno para el programa por si acaso.
			datos.abriendo_archivos_necesarios(datos.alumno_nombre)
			this.hide()
			
	def on_irten()
		// retoma la nueva configuración del alumno para el programa por si acaso a sido modificada.
		datos.abriendo_archivos_necesarios(datos.alumno_nombre)
		fin()
	def on_salirx():bool
		datos.abriendo_archivos_necesarios(datos.alumno_nombre)
		fin()
		return true
		
		
	def on_gorde()
		var salir=true
		salir = guardando()
		// retoma la nueva configuración del alumno para el programa por si acaso a sido modificada.
		datos.abriendo_archivos_necesarios(datos.alumno_nombre)
	
	def compare_strings (a:string, b:string) : int 
		// Comparar primero por la longitud de las cadenas
		if (longitud(a) != longitud(b)) 
			return a.length - b.length;
		return a.collate(b);
		
	def descarga_lista (lista:Gtk.ListStore) : Gee.ArrayList
		// generamos una lista gee a partir de un view para manipularla sencillamente. La manipulamos fuera y luego la cargamos de nuevo.
		iter: TreeIter;
		var milista= new list of string;
		milista.clear();
		var valor="";
		if (lista.get_iter_first (out iter))
			do
				lista.get (iter, 0, out valor)
				milista.add (valor)
			while lista.iter_next (ref iter)
		return milista
	
	def carga_lista (lista:Gtk.ListStore, listaGee:Gee.ArrayList of string)  
		// metemos nuestra listaGee en una lista.
		iter: TreeIter;
		lista.clear()
		for i in listaGee
			lista.append (out iter);
			lista.set (iter, 0, i);
	
	def descarga_seleccionados (view: Gtk.TreeView , lista:Gtk.ListStore) : Gee.ArrayList
		var selection = view.get_selection();
		model: TreeModel;
		//selected_paths : Gtk.TreePath []
		//path: TreePath
		var milista= new list of string;
		var selected_paths = selection.get_selected_rows (out model);
		
		if (model == null)
			return milista;

		// Sort the paths in reverse order to avoid invalidating the paths as we remove rows
		//selected_paths.sort((a, b) => b.compare(a));
		iter: TreeIter;

		// Remove rows from the ListStore
		for path in selected_paths
			if (lista.get_iter(out iter, path))
				value:string = "";
				lista.get(iter, 0, out value);
				//list_store.remove(ref iter);
				//print("Moved row value: %s\n", value);
				milista.add (value)
		
		return milista;
		
	
		
		
	def on_letras()
		var lista_letra= new list of string;
		if letras.get_text()!=""
			lista_letra= descarga_lista (lista_0)
			if (not lista_letra.contains (letras.get_text()) ) and letras_permitidas.contains (letras.get_text()) 
				lista_letra.add (letras.get_text())
				carga_lista (lista_0,lista_letra)
	
	
		
	def on_ezabatu()
		var lista_letras= new list of string;
		var lista_seleccionados= new list of string;
		lista_letras= descarga_lista (lista_0);
		lista_seleccionados= descarga_seleccionados (view0, lista_0)
		if (lista_seleccionados.size>0) and (lista_letras.size>0)
			for var i in lista_seleccionados
				lista_letras.remove (i)
			carga_lista (lista_0, lista_letras)
			
				
	def on_iragaz()
		// Esta función elimina de la lista 1 y añade a la 2 las que tengan letras de la lista de letras.
		var lista_letras= new list of string;
		var lista1= new list of string
		var lista2= new list of string
		var lista_seleccion= new list of string
		lista_letras= descarga_lista (lista_0);
		lista1= descarga_lista (lista_1)
		lista2= descarga_lista (lista_2)
		
		/// seleccionamos las palabras de la lista 1 que tengan las letras.
		for var i in lista1
			// procedimiento que trata de eliminar las vocales para que queden solo las consonantes, si eliminando todas las consonantes
			//y también las vocales palabra queda vacía ="" es que la palabra es correcta puesto que contiene solo las letras seleccionadas.   
			var pal=i
			descartes : array of string = {"a","e","i","o","u","á","é","í","ó","ú","à","è","ì","ò","ù","ü","A","E","I","O","U","Á","É","Í","Ó","Ú","À","È","Ì","Ò","Ù","Ü"}
			//eliminando las vocales
			for var n=0 to (descartes.length-1)
				pal=pal.replace(descartes[n]," ") // se sustituye con un espacio para que no surja la siguiente situación "kale"-a-e "kl" y despues  
												  // se pueda confundir k y l con kl 
			
			// Eliminando las consonantes
			for var n=0 to ultimo_de_lista(lista_letras)
				pal=pal.replace(lista_letras[n]," ")
			// Eliminando los espacios en blanco
			pal=pal.replace(" ","")
			
			if pal=="" // es pura puesto que como se ha explicado antes se le han eliminado todas las vocales y las consonantes elegidas
				// quiere decir que ha usado todo lo que hemos exigido, por lo tanto la palabra pasa el filtro puro.
				lista_seleccion.add (i);
		/// ahora en lista_seleccion tenemos las palabras que deseamos pasar de una lista a otra. Procedemos:
		for var i in lista_seleccion
			lista2.add(i)
			lista1.remove(i)
				
		lista2.sort (compare_strings)
		carga_lista(lista_1,lista1);
		carga_lista(lista_2,lista2);
		 
		
	
		
	def on_zenb2()
		print "pasa de la lista 1 a la lista 2 las palabras que tengan cierto número de letras."
		var lista1= new list of string
		var lista2= new list of string
		lista1= descarga_lista (lista_1)
		lista2= descarga_lista (lista_2)
		var lista_seleccion= new list of string;
		
		if int.parse(zenb.get_text())!=0
			for var i in lista1
				if longitud( i )==int.parse(zenb.get_text())
					//añade items a la lista de selección.
					lista_seleccion.add (i);
			
			for var i in lista_seleccion
				lista2.add(i)
				lista1.remove(i)
				
			lista2.sort (compare_strings)
			carga_lista(lista_1,lista1);
			carga_lista(lista_2,lista2);

	def on_zenb1()
		print " pasa de la lista 2 a la lista 1 las palabras que tengan cierto número de letras."
		var lista1= new list of string
		var lista2= new list of string
		lista1= descarga_lista (lista_1)
		lista2= descarga_lista (lista_2)
		var lista_seleccion= new list of string;
		
		if int.parse(zenb.get_text())!=0
			for var i in lista2
				if longitud( i )==int.parse(zenb.get_text())
					//añade items a la lista de selección.
					lista_seleccion.add (i);
			
			for var i in lista_seleccion
				lista1.add(i)
				lista2.remove(i)
				
			lista1.sort (compare_strings)
			carga_lista(lista_1,lista1);
			carga_lista(lista_2,lista2);

			
	
	
	def on_dena1()
		//print " pasa de la lista 2 a la lista 1 todas las palabras."
		var lista1= new list of string
		var lista2= new list of string
		lista1= descarga_lista (lista_1)
		lista2= descarga_lista (lista_2)
		
		for var i in lista2
			lista1.add (i);
		lista2.clear()
		lista1.sort (compare_strings)
		carga_lista(lista_1,lista1);
		carga_lista(lista_2,lista2);
			
	def on_dena2()
		// pasa de la lista 1 a la lista 2 todas las palabras.
		var lista1= new list of string
		var lista2= new list of string
		lista1= descarga_lista (lista_1)
		lista2= descarga_lista (lista_2)
		
		for var i in lista1
			lista2.add (i);
		
		lista1.clear()
		lista2.sort (compare_strings)
		carga_lista(lista_1,lista1);
		carga_lista(lista_2,lista2);
		
		
		
	def on_haut2()
		// pasa de la lista 1 a la lista 2 las palabras seleccionadas
		var lista1= new list of string
		var lista2= new list of string
		var lista_seleccionadas= new list of string
		lista1= descarga_lista (lista_1)
		lista2= descarga_lista (lista_2)
		lista_seleccionadas= descarga_seleccionados (view1,lista_1);
		
		for var i in lista_seleccionadas
			//añade items a la lista2
			lista2.add (i);
			lista1.remove(i);
		lista2.sort (compare_strings)
		carga_lista(lista_1,lista1);
		carga_lista(lista_2,lista2);
			
	def on_haut1()
		// pasa de la lista 2 a la lista 1 las palabras seleccionadas
		var lista1= new list of string
		var lista2= new list of string
		var lista_seleccionadas= new list of string
		lista1= descarga_lista (lista_1)
		lista2= descarga_lista (lista_2)
		lista_seleccionadas= descarga_seleccionados (view2,lista_2);
		
		for var i in lista_seleccionadas
			//añade items a la lista2
			lista1.add (i);
			lista2.remove(i);
		lista1.sort (compare_strings)
		carga_lista(lista_1,lista1);
		carga_lista(lista_2,lista2);
			
	
	def on_predeterminada()
		predeterminados.inicio()
		predeterminados.set_modal(true)
		predeterminados.set_transient_for (config)
		
		
