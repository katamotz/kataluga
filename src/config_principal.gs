//valac -o "config" --disable-warnings --pkg gee-0.8 --pkg gtk+-3.0 ../cadenas.gs "config.gs"     
uses Gtk

class Config:Window
	alumno:Gtk.ComboBoxText
	lista_alumnos:list of string
	
	view1: Gtk.TreeView
	view2: Gtk.TreeView
	view0: Gtk.TreeView
	lista_0:Gtk.ListStore
	lista_1:Gtk.ListStore
	lista_2:Gtk.ListStore
	
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
		fix.put(boton_predeterminada,400,0)
		fix.put(boton_usuarios,600,0)
		//fix.put(boton_idioma,700,0)
		fix.put(boton_ebaluatu,730,0)
		fix.put(s0,20,50)
		fix.put(s1,250,50)
		fix.put(s2,600,50)
		fix.put(haut1,420,50)
		fix.put(haut2,500,50)
		fix.put(dena1,420,80)
		fix.put(dena2,500,80)
		fix.put(zenb1,430,150)
		fix.put(zenb ,480,150)
		fix.put(zenb2,530,150)
		fix.put(letras,120,50)
		fix.put(botezab,120,80)
		fix.put(botiragaz,120,110)
		fix.put(gordeirten,300,350)
		fix.put(gorde,200,350)
		fix.put(irten,450,350)
		this.add(fix)
		this.set_size_request(800,400)
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
			print selection.count_selected_rows().to_string()
		
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
			
	
	def on_letras()
		if letras.get_text()!=""
			var selection = view0.get_selection()
			selection.set_mode(Gtk.SelectionMode.MULTIPLE)
			iter : TreeIter
			selection.select_all()
			var badago=false
			//var permitido=false
				
			if selection.count_selected_rows()>0
		
				var item  = selection.get_selected_rows(null).data;
				// revisando que este
				for var i=0 to (selection.count_selected_rows()-1)
					var selection2=""
					// toma iterador y guarda en selection2 su contenido.
					lista_0.get_iter(out iter, item);
					lista_0.get(iter, 0, out selection2);
					if selection2==letras.get_text() do badago=true
					item.next()
			if (not badago) and letras_permitidas.contains (letras.get_text()) 
				lista_0.append (out iter2);
				lista_0.set (iter2, 0, letras.get_text());
				letras.set_text("")
			selection.unselect_all()
			
	def on_iragaz()
		letrasx:list of string= new list of string
		var selection = view0.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		iter : TreeIter
		iter2 : TreeIter
		selection.select_all()
		
		if selection.count_selected_rows()>0
			var item  = selection.get_selected_rows(null).data;
			for var i=0 to (selection.count_selected_rows()-1)
				
				var selection2=""
				lista_0.get_iter(out iter, item);
				lista_0.get(iter, 0, out selection2);
				letrasx.add(selection2)
				item.next()
	
		selection = view2.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		selection.select_all()
		if selection.count_selected_rows()>0
			var item  = selection.get_selected_rows(null).data;
			var selection2="";
			var iteradores = new list of Gtk.TreeIter?
			for var i=0 to (selection.count_selected_rows()-1)
				// toma iterador y guarda en selection2 su contenido.
				lista_2.get_iter(out iter, item);
				lista_2.get(iter, 0, out selection2);
				// procedimiento que trata de eliminar las vocales para que queden solo las consonantes, si eliminando todas las consonantes
				//y también las vocales palabra queda vacía ="" es que la palabra es correcta puesto que contiene solo las letras seleccionadas.   
				var pal=selection2
				descartes : array of string = {"a","e","i","o","u","á","é","í","ó","ú","à","è","ì","ò","ù","ü","A","E","I","O","U","Á","É","Í","Ó","Ú","À","È","Ì","Ò","Ù","Ü"}
				//eliminando las vocales
				for var n=0 to (descartes.length-1)
					pal=pal.replace(descartes[n]," ") // se sustituye con un espacio para que no surja la siguiente situación "kale"-a-e "kl" y despues  
													  // se pueda confundir k y l con kl 
				
				// Eliminando las consonantes
				for var n=0 to ultimo_de_lista(letrasx)
					pal=pal.replace(letrasx[n]," ")
				// Eliminando los espacios en blanco
				pal=pal.replace(" ","")
				
				if pal!="" // es pura puesto que como se ha explicado antes se le han eliminado todas las vocales y las consonantes elegidas
					// quiere decir que ha usado todo lo que hemos exigido, por lo tanto la palabra pasa el filtro puro.
					//añade items a la lista2
					lista_1.insert (out iter2,irudiakx.index_of(selection2));
					lista_1.set (iter2, 0, selection2);
					//introduce iteradores en una lista para luego borrarlos
					iteradores.add(iter)
				item.next()
			// borra los iteradores
			for var i=0 to ultimo_de_lista(iteradores) do lista_2.remove(iteradores[i])
	
		
	def on_ezabatu()
		var selection = view0.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		iter : TreeIter
		if selection.count_selected_rows()>0
			var item  = selection.get_selected_rows(null).data;
			var selection2="";
			var iteradores = new list of Gtk.TreeIter?
			for var i=0 to (selection.count_selected_rows()-1)
				// toma iterador y guarda en selection2 su contenido.
				lista_0.get_iter(out iter, item);
				lista_0.get(iter, 0, out selection2);
				//introduce iteradores en una lista para luego borrarlos
				iteradores.add(iter)
				item.next()
			// borra los iteradores
			for var i=0 to ultimo_de_lista(iteradores) do lista_0.remove(iteradores[i])
		selection.unselect_all()
			
		
		
	def on_zenb1()
		if int.parse(zenb.get_text())!=0
			var selection = view2.get_selection()
			selection.set_mode(Gtk.SelectionMode.MULTIPLE)
			selection.select_all()
			iter : TreeIter
			if (selection.count_selected_rows()-1)>0
				item:TreePath  = selection.get_selected_rows(null).data;
				var iteradores = new list of Gtk.TreeIter?
				iteradores.clear()
				for var i=0 to (selection.count_selected_rows()-1)
					var selection2="";
					// toma iterador y guarda en selection2 su contenido.
					lista_2.get_iter(out iter, item);
					lista_2.get(iter, 0, out selection2);
					if longitud(selection2)==int.parse(zenb.get_text())
						//añade items a la lista2 ordenadamente segun la lista irudiakx
						lista_1.insert (out iter2,irudiakx.index_of(selection2));
						lista_1.set (iter2, 0, selection2);
						//introduce iteradores en una lista para luego borrarlos
						iteradores.add(iter)
					item.next()
				
				// borra los iteradores
				for var i=0 to ultimo_de_lista(iteradores) do lista_2.remove(iteradores[i])
				selection.unselect_all()
				
	def on_zenb2()
		if int.parse(zenb.get_text())!=0
			var selection = view1.get_selection()
			selection.set_mode(Gtk.SelectionMode.MULTIPLE)
			selection.select_all()
			iter : TreeIter
			iter2 : TreeIter
			if (selection.count_selected_rows()-1)>0
		
				var item  = selection.get_selected_rows(null).data;
				var selection2="";
					
				var iteradores = new list of Gtk.TreeIter?
				iteradores.clear()
				for var i=0 to (selection.count_selected_rows()-1)
					// toma iterador y guarda en selection2 su contenido.
					lista_1.get_iter(out iter, item);
					lista_1.get(iter, 0, out selection2);
					//añade items a la lista2
					if longitud(selection2)==int.parse(zenb.get_text())
						lista_2.insert (out iter2,irudiakx.index_of(selection2));
						lista_2.set (iter2, 0, selection2);
					//introduce iteradores en una lista para luego borrarlos
						iteradores.add(iter)
					item.next()
				// borra los iteradores
				for var i=0 to ultimo_de_lista(iteradores) do lista_1.remove(iteradores[i])
				selection.unselect_all()
			
	
	def on_dena2()
		var selection = view1.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		selection.select_all()
		iter : TreeIter
		iter2 : TreeIter
		if (selection.count_selected_rows()-1)>0
			var item  = selection.get_selected_rows(null).data;
			//var selection1="";
			var selection2="";
			var iteradores = new list of Gtk.TreeIter?
		
			for var i=0 to (selection.count_selected_rows()-1)
				// toma iterador y guarda en selection2 su contenido.
				lista_1.get_iter(out iter, item);
				lista_1.get(iter, 0, out selection2);
				//añade items a la lista2
				lista_2.insert (out iter2,irudiakx.index_of(selection2));
				lista_2.set (iter2, 0, selection2);
				//introduce iteradores en una lista para luego borrarlos
				iteradores.add(iter)
				item.next()
			// borra los iteradores
			for var i=0 to ultimo_de_lista(iteradores) do lista_1.remove(iteradores[i])
			selection.unselect_all()
			
	def on_dena1()
		var selection = view2.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		selection.select_all()
		iter : TreeIter
		
		if (selection.count_selected_rows()-1)>0
			item:TreePath  = selection.get_selected_rows(null).data;
			var iteradores = new list of Gtk.TreeIter?
		
			for var i=0 to (selection.count_selected_rows()-1)
				var selection2="";
				// toma iterador y guarda en selection2 su contenido.
				lista_2.get_iter(out iter, item);
				lista_2.get(iter, 0, out selection2);
				//añade items a la lista2 ordenadamente segun la lista irudiakx
				lista_1.insert (out iter2,irudiakx.index_of(selection2));
				lista_1.set (iter2, 0, selection2);
				//introduce iteradores en una lista para luego borrarlos
				iteradores.add(iter)
				item.next()
			if ultimo_de_lista(iteradores)>=0
			
				// borra los iteradores
				for var i=0 to ultimo_de_lista(iteradores) do lista_2.remove(iteradores[i])
			selection.unselect_all()
				
			
		
	def on_haut2()
		var selection = view1.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		iter : TreeIter
		iter2 : TreeIter
		if selection.count_selected_rows()>0

			var item  = selection.get_selected_rows(null).data;
				
			var iteradores = new list of Gtk.TreeIter?
			for var i=0 to (selection.count_selected_rows()-1)
				//var selection1="";
				var selection2="";
			
				// toma iterador y guarda en selection2 su contenido.
				lista_1.get_iter(out iter, item);
				lista_1.get(iter, 0, out selection2);
				//añade items a la lista2
				lista_2.insert (out iter2,irudiakx.index_of(selection2));
				lista_2.set (iter2, 0, selection2);
				//introduce iteradores en una lista para luego borrarlos
				iteradores.add(iter)
				item.next()
			// borra los iteradores
			for var i=0 to ultimo_de_lista(iteradores) do lista_1.remove(iteradores[i])
			selection.unselect_all()
			
	def on_haut1()
		var selection = view2.get_selection()
		selection.set_mode(Gtk.SelectionMode.MULTIPLE)
		iter : TreeIter
		if selection.count_selected_rows()>0
			var item = selection.get_selected_rows(null).data;
			var iteradores = new list of Gtk.TreeIter?
			for var i=0 to (selection.count_selected_rows()-1)
				var selection2="";
				// toma iterador y guarda en selection2 su contenido.
				lista_2.get_iter(out iter, item);
				lista_2.get(iter, 0, out selection2);
				//añade items a la lista2 ordenadamente segun la lista irudiakx
				lista_1.insert (out iter2,irudiakx.index_of(selection2));
				lista_1.set (iter2, 0, selection2);
				//introduce iteradores en una lista para luego borrarlos
				iteradores.add(iter)
				item.next()
			if ultimo_de_lista(iteradores)>=0
				// borra los iteradores
				for var i=0 to ultimo_de_lista(iteradores) do lista_2.remove(iteradores[i])
			selection.unselect_all()
			
	
	def on_predeterminada()
		predeterminados.inicio()
		predeterminados.set_modal(true)
		predeterminados.set_transient_for (config)
		
		
