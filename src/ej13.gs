

// Listado de Pseudo palabras y palabras. Las pseudopalabras deben ser eliminadas.

class Ejercicio13:GLib.Object
	palabras: list of Texto
	palabras_str_cambiadas:list of string
	palabras_str:list of string
	num:int=0
	salir:Imagen
	corregir:Imagen
	init 
		palabras_str= new list of string
		palabras_str_cambiadas=new list of string
		palabras= new list of Texto
		
	def inicio()
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		
		palabras_str.clear()
		palabras.clear()
		palabras_str_cambiadas=datos.toma_palabras_alumno(11)
		palabras_str=copia_lista_str(palabras_str_cambiadas)
		for var i=0 to ultimo_de_lista(palabras_str)
			palabras_str[i]=palabras_str[i].replace("_","")
			palabras_str_cambiadas[i]=palabras_str_cambiadas[i].replace("_","")
			var azar = Random.int_range (0,10)
			case azar
				when 0,1,2
					palabras_str[i]= datos.crea_pseudopalabra_inversion(palabras_str[i])
				when 4
					palabras_str[i]= datos.crea_pseudopalabra_omision(palabras_str[i])
		var posx=300
		var posy=100
		for var i=0 to ultimo_de_lista(palabras_str)
			palabras.add (new Texto (posx,posy,Mm(palabras_str[i].replace("_","")) ))
			palabras.last().izq_pulsado.connect(on_palabra)
			palabras.last().arrastrable=false
			palabras.last().set_tamanotexto(30)
			palabras.last().valor_str=palabras_str[i].replace("_","")
			palabras.last().valor_int=-1
			posy+=58
			if i==5 
				posy=100
				posx=600
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Marca las palabras que no existen")))
		explicacion.set_tamanotexto(20)
		explicacion.set_colorletra(blanco)
		explicacion.arrastrable=false
		explicacion.set_fondovisible (false)
		
		///creando mandos
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
		corregir=new Imagen(920,100,directorio_datos+"/imagenes/corregir.png")
		corregir.set_tamano(50,50)
		corregir.arrastrable=false
		corregir.izq_pulsado.connect(on_corregir)
		
	def on_salir(c:Control)
		
		controles.clear()
		menu_principal.inicio()
		
	def on_corregir()
		var ondo=true
		for var i=0 to ultimo_de_lista(palabras_str) 
			if (palabras[i].valor_bool) 
				if (palabras_str_cambiadas.contains (palabras_str[i])) // si la palabra marcada y no es pseudo : mal
					ondo=false
					datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- El alumno/a piensa no existe que la palabra :"+palabras_str[i])
				
			else
				if not (palabras_str_cambiadas.contains (palabras_str[i])) // si la palabra no esta marcada como pseudo, y es pseudo: mal
					datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- El alumno/a piensa que si existe la palabra:"+palabras_str[i])
					ondo=false
		
		if ondo
			sonidos.play("ondo")
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- Terminado correctamente")
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		else
			sonidos.play ("gaizki")
		
	def on_palabra (c:Control)
		if c.valor_bool==false
			c.set_colorfondo(amarillo)
			c.valor_bool=true
		else
			c.set_colorfondo(blanco)
			c.valor_bool=false
			
			
	def cargar_escenario()
		controles.clear()
	
