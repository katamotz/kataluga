

// Ordena las letras para formar la palabra de la imagen

class Cambio_usuario:GLib.Object
	lista_alumnos:list of string
	lista_botones:list of Texto
	nombre_alumno:string
	salir:Imagen
	d:GLib.Dir
	init 
		lista_alumnos= new list of string
		lista_botones= new list of Texto
		
	def inicio()
		controles.clear()
		lista_alumnos.clear()
		// creando lista de alumnos
		var name=""
		try
			d = Dir.open(directorio_usuario +"/")
		except
			pass
		var i=0
		var posicion=0
		while ( (name = d.read_name()) != null)
			if name[0:4]=="ktm_"
				lista_alumnos.add(name[4:longitud(name)])
				if name[4:longitud(name)]== datos.alumno_nombre
					posicion=i
					nombre_alumno=name[4:longitud(name)]
			i++
		
		// mostrando la lista de alumnos
		var x=100
		var y=50
		for i=0 to ultimo_de_lista(lista_alumnos)
			y+=40
			lista_botones.add(new Texto (x,y,lista_alumnos[i]))
			lista_botones.last().set_tamanotexto(15)
			lista_botones.last().set_anchoborde(2)
			lista_botones.last().arrastrable=false
			lista_botones.last().izq_pulsado.connect(on_entrar)
			lista_botones.last().valor_int=i
			// columnas
			if (i+1)%10==0
				x+=200
				y=50
		///creando mandos
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
		
	def on_salir(c:Control)
		menu_principal.inicio()
		
	def on_entrar (c:Control)
		datos.abriendo_archivos_necesarios( lista_alumnos[c.valor_int] )
		nomejer=datos.crea_array_de_ejercicios_segun_idioma (datos.alumno_idioma)
		tipoejer=datos.crea_array_de_tipos_segun_idioma(datos.alumno_idioma)
		
		sonidos.play ("blub")
		menu_principal.inicio()
		
		
	
	
	
